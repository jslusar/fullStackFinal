import './newsfeed.css';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Card, CardText, CardTitle, CardSubtitle, CardFooter, CardBody, Button, Container, Row, Col} from 'reactstrap';
import {org} from './../Search/search.js'


export default class Newsfeed extends Component {


    constructor(props){
        super(props);
        this.state = {data: null};
    }

    componentDidMount(){
        console.log("this is org" + org)
        fetch('http://localhost:2000/api')
        .then(resp => {
          return resp.json()
        })
        .then(results => {
        //create an html of the query
        var cards = []
        for (var j = 0; j < results.length;  j += 1) {
          cards.push(<Col key = {results[j]} sm={"3"} md={"3"} lg={"3"}>
                    <Card className="card">
                        <CardBody>
                        <CardTitle>{results[j]["title"]}</CardTitle>
                        <CardSubtitle>{results[j]["name"]}</CardSubtitle>
                        <CardText>{results[j]["description"]}</CardText>
                               <Button bsStyle="warning">See Attached File(s)</Button>
                        </CardBody>
                        <CardFooter className="text-muted">{results[j]["progress"] + " -- Tags: " + results[j]["tags"]}</CardFooter>

                    </Card>
                    </Col>)
        }
        // console.log(results)
        // console.log(cards)
        this.setState({data: cards})
        })

      .catch(function(error) {
        console.log(error);
        });
    }

  render() {
    return(
      <div>
        <h1><Button className="float2" color="primary" href='/search'>Back</Button>Search Page <Button className="float" color="primary" href='/'>Home</Button></h1>
        <Container>
        <Row>
        {this.state.data}
        </Row>
        </Container>
      </div>

    );
  }
}
