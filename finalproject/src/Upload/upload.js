import './upload.css';
import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';
// import ReactDOM from 'react-dom';


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




/*} fetch('/api/form-submit-url', {  this link will go to our database
      method: 'POST',
      body: data,
    });
  }*/

  render() {
    return(
      <div className="body border container">
        <h1>Post Submission <Button bsStyle="primary" href='/'>Home</Button> </h1>
        <h5> Let us know what you are doing!</h5>
        <form  className="row" id="myForm" name="myForm" onSubmit={this.handleSubmit}>
        <section className="col-4">
            <h5>STEP ONE</h5>
            <label htmlFor="name">
                First and Last Name: <br/>
                <input type="text" name="name" required/>
            </label>
        </section>
            <br/>
        <section className="col-4">
            <h5>STEP TWO</h5>
            <label htmlFor="organization">
                What organization are you posting for? <br/>
                <input type="text" name="organization" required/>
            </label>
        </section>
            <br/>
        <section className="col-4">
            <h5>STEP THREE</h5>
            <label htmlFor="title">
                Title of your post: <br/>
                <input type="text" name="title" required/>
            </label>
        </section>
            <br/>
        <section className="col-4">
            <h5>STEP FOUR</h5>
            <label htmlFor="description">
                What is your idea? <br/>
                <p>You will also have the option to upload a file below.</p>
                <input type="text" name="description" required/>
            </label>
        </section>
            <br/>
        <section className="col-4">
            <h5>STEP FIVE</h5>
            <label htmlFor="tags">
                Describe your post: <br/>
                <p>These will be used as search TAGS for this document. (ex. voting, elections, hiring, auditions, etc.) </p>
                <input type="text" name="tags" required/>
            </label>
        </section>
            <br/>
        <section className="col-4">
            <h5>STEP SIX</h5>
           <label htmlFor="progress">
                How is it going? <br/>
                <select name="progress">
                    <option value="Just an Idea" name="progress">Just an Idea</option>
                    <option value="In Progress" name="progress">In Progress</option>
                    <option value="Finished" name="progress">Finished</option>
                </select>
            </label>
        </section>
            <br/>
        <section className="col-12">
            <h5>STEP SEVEN</h5>
            <label htmlFor="file">
                Upload a file: <br/>
                <p>PDFs only please </p>
                <input type="file" name="file" accept="application/pdf" multiple/>
            </label>
        </section>
            <br/>

                <button>Submit</button>
        </form>


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


