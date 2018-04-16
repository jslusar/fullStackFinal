import './upload.css';
import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import {Button, Grid, Row, Col} from 'react-bootstrap';
// import ReactDOM from 'react-dom';

/*THIS CONNECTS DATABASE AND CREATES SCHEMA, DO we put this here? copy path from github?*/

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const fetch = require('node-fetch')

// // create db connection
// const mongoose = require('mongoose')
// const fs = require('fs')
// const config = JSON.parse(fs.readFileSync('fullStackFinal/finalproject/config.json', 'UTF-8'))
// mongoose.connect(config.dburl)
// var db = mongoose.connection

// // define the order schema
// var postSchema = mongoose.Schema({
//   name: String,
//   organization: String,
//   title: String,
//   description: String,
//   tags: String,
//   progress: String,
//   file: [String] ????
// })
// // bind schema to the mongodb collection 'club-posts'
// var  clubPost = mongoose.model('club-posts', postSchema)

// // set to remove all docs in database, if there is anything leftover
// var cleanDb = false

// if (cleanDb === true){
//   clubPost.remove({}, err=>{
//     if(err) console.log("failed to remove all docs")
//   })
// }


export default class Upload extends Component {

    constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state= {fileList: null}
  }


   handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.files)
    var myForm = document.getElementById('myForm');
    const data = new FormData(myForm);
    console.log(stringifyFormData(data))}




/* fetch('http://localhost:3000/', {  this link will go to our database
      method: 'POST',
      body: data,
    });
  */

  render() {
    return(
      <div className="body border">
        <h1>Post Submission <Button className="float" bsStyle="primary" href='/'>Home</Button> </h1>
        <h5> Let us know what you are doing!</h5>
        <Grid>

        <form id="myForm" name="myForm" onSubmit={this.handleSubmit}>
        <Row>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP ONE</h5>
            <label htmlFor="name">
                First and Last Name: <br/>
                <input type="text" name="name" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP TWO</h5>
            <label htmlFor="organization">
                What organization are you posting for? <br/>
                <input type="text" name="organization" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP THREE</h5>
            <label htmlFor="title">
                Title of your post: <br/>
                <input type="text" name="title" required/>
            </label>
        </Col>
        </Row>
            <br/>
        <Row>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP FOUR</h5>
            <label htmlFor="description">
                What is your idea? <br/>
                <p>You will also have the option to upload a file below.</p>
                <input type="text" name="description" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP FIVE</h5>
            <label htmlFor="tags">
                Describe your post: <br/>
                <p>These will be used as search TAGS for this document. (ex. voting, elections, hiring, auditions, etc.) </p>
                <input type="text" name="tags" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP SIX</h5>
           <label htmlFor="progress">
                How is it going? <br/>
                <select name="progress">
                    <option value="Just an Idea" name="progress">Just an Idea</option>
                    <option value="In Progress" name="progress">In Progress</option>
                    <option value="Finished" name="progress">Finished</option>
                </select>
            </label>
        </Col>
        </Row>
            <br/>
        <Row>
        <Col xs={6} md={6} lg={6}>
            <h5>STEP SEVEN</h5>
            <label htmlFor="file">
                Upload a file: <br/>
                <p>PDFs only please </p>
                <input type="file" name="file" accept="application/pdf" multiple/>
            </label>
        </Col>
        <Col xs={6} md={6} lg={6}>
                <button>Submit</button>
        </Col>
        </Row>


        </form>
        </Grid>


      </div>
    );
  }
}


function stringifyFormData(fd) {
  const data = {};
    for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}


