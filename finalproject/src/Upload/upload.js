import './upload.css';
import React, { Component } from 'react';
import {Link } from 'react-router-dom'
// import ReactDOM from 'react-dom';


export default class Upload extends Component {

    constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(stringifyFormData(data))}

// this.setState({
//       res: stringifyFormData(data),
//     });
// }

/*} fetch('/api/form-submit-url', {  this link will go to our database
      method: 'POST',
      body: data,
    });
  }*/

  render() {
    return(
      <div className="body">
        <h1>Post Submission</h1>
        <h5> Let us know what you are doing!</h5>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">
                First and Last Name: <br/>
                <input type="text" name="name" required/>
            </label>
            <br/>
            <label htmlFor="organization">
                What organization are you posting for? <br/>
                <input type="text" name="organization" required/>
            </label>
            <br/>
            <label htmlFor="title">
                Title of your post: <br/>
                <input type="text" name="title" required/>
            </label>
            <br/>
            <label htmlFor="description">
                What is your idea? <br/>
                <input type="text" name="description" required/>
            </label>
            <br/>
            <label htmlFor="tags">
                Describe your post: These will be used as search TAGS for this document. (ex. voting, elections, hiring, auditions, etc.) <br/>
                <input type="text" name="tags" required/>
            </label>
            <br/>
           <label htmlFor="progress">
                How is it going? <br/>
                <select name="progress">
                    <option value="Just an Idea" name="progress">Just an Idea</option>
                    <option value="In Progress" name="progress">In Progress</option>
                    <option value="Finished" name="progress">Finished</option>
                </select>
            </label>
            <br/>
            <label htmlFor="file">
                Upload a file: PDFs only please <br/>
                <input type="file" id="input" name="file" accept="application/pdf" multiple onchange="handleFiles(this.files)"/>
            </label>
            <br/>

                <button>Submit</button>
        </form>

        <Link to ='/'>Home</Link>


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

//     var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//   var fileList = this.files; /* now you can work with the file list */
// }
// {this.state.res && (
//             <div className="res-block">
//             <h3>Data to be sent:</h3>
//             <pre>FormData {this.state.res}</pre>
//             </div>
//         )}
