import React, { Component } from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import './App.css';


class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="title">Answers on Bucknell Clubs</h1>
          <br/>
          <br/>
          <p className="App-intro"> Here you can upload helpful information on your organization. <br/> OR <br/> Have a question? Search through all our helpful posts.</p>
          <br/>
          <ButtonGroup>
            <Link to='/upload'>
              <Button color="secondary"className="button">Upload</Button>
            </Link>
            <img src={require("./arrows.png") } alt="Bucknell B" className="App-logo" />
            <Link to='/search'>
              <Button color="secondary" className="button">Search</Button>
            </Link>
          </ButtonGroup>
        </div>
      <br/>
      <p className="intro">
          To get started, select Upload or Search above.
      </p>
    </div>

    );
  }
}

export default App;
