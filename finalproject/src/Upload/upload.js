import './upload.css';
import React, { Component } from 'react';
import {Link } from 'react-router-dom'

export default class Upload extends Component {
  render() {
    return(
      <div>
        <h1>Upload Page</h1>
        <Link to ='/'>Home</Link>
      </div>
    );
  }
}
