const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fetch = require('node-fetch')
const cors = require('cors')
// import {org} from "./../src/Search/search.js"

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
//get posts
 getPosts = function(callback, limit){
    clubPost.find(callback).limit(limit);
 }


// set to remove all docs in database, if there is anything leftover
var cleanDb = false

if (cleanDb === true){
  clubPost.remove({}, err=>{
    if(err) console.log("failed to remove all docs")
  })
}
// .use binds to all http methods
// no route, means apply to ALL routes
// so all req's will be passed through
// the bodyParser.json() function
app.use(cors());
app.use(bodyParser.json())

app.get('/api', function(req, res){
    getPosts(function(err,posts){
        if (err){
            throw err;
        }
        res.json(posts);
    });
});
var org = 'full'
app.get('/api/' + org, function(req,res){
    clubPost.find({ 'organization': org }, function (err, docs) {
  if (err){
      res.send(err)
    }
   res.json(docs)
  });
});


app.post('/api/insert', function(req, res){

// console.log('post', req.body)

  var item = new clubPost(req.body)
  item.save(function(err, callback){
    if (err){
      res.send(err)
    }
   res.json(callback)
  });
});
app.listen(2000, () => console.log('Example app listening on port 2000!'))
