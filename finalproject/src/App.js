import React, { Component } from 'react';
import {Button, ButtonGroup} from 'reactstrap';
  // import { Switch, Route, Link } from 'react-router-dom'
  // import Upload from './Upload/upload.js'
  // import Search from './Search/search.js'
// import logo from './logo.svg';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require("./B.png") } alt="Bucknell B" className="App-logo" />
          <h1 className="App-title">Answers on Bucknell Clubs</h1>
        </header>
        <p className="App-intro">
          To get started, select Upload or Search below.
        </p>
        <ButtonGroup justified>
          <Button color="primary" href='/upload'>Upload</Button>
          <Button color="primary" href='/search'>Search</Button>
        </ButtonGroup>
      </div>

    );
  }
}

export default App;
