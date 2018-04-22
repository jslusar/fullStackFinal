import './newsfeed.css';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Card, CardText, CardTitle, CardSubtitle, CardHeader, CardFooter, CardBody} from 'reactstrap';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {org} from './../Search/search.js'


export default class Search extends Component {


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
          cards.push(<Col xs={4} md={4} lg={4}>
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
        <h1><Button className="float2" bsStyle="primary" href='/search'>Back</Button>Search Page <Button className="float" bsStyle="primary" href='/'>Home</Button></h1>
        <Grid>
        <Row>
        {this.state.data}
        </Row>
        </Grid>
      </div>

    );
  }
}
