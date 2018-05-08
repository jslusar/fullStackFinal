const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fetch = require('node-fetch')
const cors = require('cors')

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
//const middleware = require('./middleware.js').middleware;
// import {org} from "./../src/Search/search.js"

//setting up middleware
//app.use(middleware);

// app.all('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//
//   next();
// })

////////////////////////////////////////////////////////////////////
// From Marchiori
// Create connection to S3
var credentials = new AWS.SharedIniFileCredentials({profile: 'abc'})
AWS.config.credentials = credentials
const s3 = new AWS.S3()

// specifying bucket name
const bucket = 'abc-uploads'

// this generates the key (filename) from the originalname
// keys have to be unique, so in the future pass in username and
// use path-like names like username+'/'+originalname
// upload of a duplicate keys will overwrite the old contents
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    key: (req,file,cb) => {
      cb(null, file.originalname)
    }
  })
 })

 // returns a list of all objects in the bucket
 app.get('/', (req, res) => {
   console.log("getting list of objects")

   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

   s3.listObjectsV2({Bucket: bucket}, (err,data)=>{
     if(err) {
       console.log(err)
       res.json(err)
     } else{
       res.json(data)
     }
   })
 })

 app.post('/remove/:key', (req,res)=>{
   // remove the specified file from s3

   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

   console.log("deleting:", req.params.key)
   var params = {
     Bucket: bucket,
     Key: req.params.key
   }
   s3.deleteObject(params, (err,data)=>{
     if(err) {
       console.log(err)
       res.json(err)
     } else{
       res.json({result:"ok"})
     }
   })
 })

 app.get('/:key', (req, res) => {
   // downloads the contents of the given file from S3 to the user
   // since the user doesn't have permission to access S3 directly (the server
   // holds the credentials), we have to stream it through our server
   // https://stackoverflow.com/questions/35782434/streaming-file-from-s3-with-express-including-information-on-length-and-filetype

   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

   console.log("getting:", req.params.key)
   var params = {
     Bucket: bucket,
     Key: req.params.key
   }
   // have to head it to get the metadata then we can create a stream to
   // pass contents to client
   s3.headObject(params, (err,data)=>{
     if(err) {
       console.log(err)
       res.json(err)
     } else{
       var stream = s3.getObject(params).createReadStream()

       //res.set('Content-Type', mime.lookup(key));
       res.set('Content-Length', data.ContentLength);
       res.set('Last-Modified', data.LastModified);
       res.set('ETag', data.ETag);

       res.attachment(req.params.key)

       // data is piped through our server to the client
       stream.pipe(res)
     }
   })
 })


 app.post('/upload', upload.array('files'), (req,res) => {
   // multer-s3 does the magic of uploading to s3 given the configuration
   // at the top of this program.
   // https://www.npmjs.com/package/multer-s3

   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

   console.log('uploaded', req.files.length, 'files to s3')

   res.json({result: "ok"})
 })

////////////////////////////////////////////////////////////////////

/*THIS CONNECTS DATABASE AND CREATES SCHEMA*/
// create db connection
const mongoose = require('mongoose')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./../config.json', 'UTF-8'))
mongoose.connect(config.dburl)
var db = mongoose.connection

// define the order schema
var postSchema = mongoose.Schema({
  name: {type: String,
    required: true},
  organization: {type: String,
    required: true},
  title: {type: String,
    required: true},
  description: {type: String,
    required: true},
  tags: {type: String,
    required: true},
  progress: {type: String,
    required: true},
  file: String
})
// bind schema to the mongodb collection 'club-posts'
var  clubPost = mongoose.model('club-posts', postSchema)
//get all the posts in the database posts
 getPosts = function(callback, limit){
    clubPost.find(callback).limit(limit);
 }

// .use binds to all http methods
// no route, means apply to ALL routes
// so all req's will be passed through
// the bodyParser.json() function
app.use(cors());
app.use(bodyParser.json())

//get all of the posts in the database
app.get('/api', function(req, res){
    getPosts(function(err,posts){
        if (err){
            throw err;
        }
        res.json(posts);
    });
});

//get all the posts in the database that have the organization name given as :orgs in the link
app.get('/api/org/:orgs', function(req,res){
    var organization = req.params.orgs;
    clubPost.find({ 'organization': organization }, function (err, docs) {
  if (err){
      res.send(err)
    }
   res.json(docs)
  });
});

//insert a post to the database
app.post('/api/insert', function(req, res){
  var item = new clubPost(req.body)
  item.save(function(err, callback){
    if (err){
      res.send(err)
    }
   res.json(callback)
  });
});

app.listen(2000, () => console.log('Example app listening on port 2000!'))
