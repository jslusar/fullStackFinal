const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fetch = require('node-fetch')
const cors = require('cors')

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

//host the server on localhost:2000
app.listen(2000, () => console.log('Example app listening on port 2000!'))
