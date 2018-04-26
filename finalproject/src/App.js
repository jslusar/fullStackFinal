import React, { Component } from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <body className="App-header">
          <h1 className="title">Answers on Bucknell Clubs</h1>
          <br/>
          <br/>
          <p className="App-intro"> Here you can upload helpful information on your organization. <br/> OR <br/> Have a question? Search through all our helpful posts.</p>
          <br/>
          <ButtonGroup>
            <Button color="secondary" href='/upload' className="button">Upload</Button>
            <img src={require("./arrows.png") } alt="Bucknell B" className="App-logo" />
            <Button color="secondary" href='/search' className="button">Search</Button>
          </ButtonGroup>
        </body>
      <br/>
      <p className="intro">
          To get started, select Upload or Search above.
      </p>
    </div>

    );
  }
}

export default App;
