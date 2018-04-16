/*THIS CONNECTS DATABASE AND CREATES SCHEMA, DO we put this here? copy path from github?*/

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fetch = require('node-fetch')

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
  file: [String]
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
app.use(bodyParser.json())


app.get('/', function(res, req){
    getPosts(function(err,posts){
        if (err){
            throw err;
        }
        res.json(posts);
    });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))
