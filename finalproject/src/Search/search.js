import './search.css';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Card, CardBody, CardSubtitle, CardText, CardFooter, CardTitle, Container, Row, Col, Button} from 'reactstrap';

    let org = '';
export default class Search extends Component {


    constructor(props){
        super(props);
        this.state = {data: null, header: 'Search Page'};
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts(club){
        // e.preventDefault();
        console.log("this is org " + club)
        fetch('http://localhost:2000/api/' + club)
        .then(resp => {
          return resp.json()
        })
        .then(results => {
        //create an html of the query
        var a = 0;
        var cards = []
        for (var j = 0; j < results.length;  j += 1) {
          cards.push(<Col key = {a++} sm={"3"} md={"3"} lg={"3"}>
                    <Card className="card">
                        <CardBody>
                        <CardTitle>{results[j]["title"]}</CardTitle>
                        <CardSubtitle>{results[j]["name"]}</CardSubtitle>
                        <CardText>{results[j]["description"]}</CardText>
                               <Button color="warning">See Attached File(s)</Button>
                        </CardBody>
                        <CardFooter className="text-muted">{results[j]["progress"] + " -- Tags: " + results[j]["tags"]}</CardFooter>

                    </Card>
                    </Col>)
        }
        // console.log(results)
        // console.log(cards)
        this.setState({data: cards, header: club})
        })

      .catch(function(error) {
        console.log(error);
        });
    }


    componentDidMount(){
        fetch('http://localhost:2000/api')
        .then(resp => {
          return resp.json()
        })
        .then(results => {

        var orgs = []
        var output = []
        // get rid of duplicates
        results.forEach(function(item) {
    if (output.indexOf(item["organization"]) === -1) {
      output.push(item["organization"]);
            }
        });
        console.log(output)
         //create an html of the query
        for (var i = 0; i < output.length;  i += 1) {

            var f= function(org){
                var ctitle = org;
                // this.getPosts(ctitle);
                return function(e){
                    // e.preventDefault();
                    console.log("title "+ ctitle)
//                      console.log("this is org " + ctitle)
//                 fetch('http://localhost:2000/api/' + ctitle)
//                     .then(resp => {
//                     return resp.json()
//                     })
//                     .then(results => {
//                     //create an html of the query
//                     console.log(results)
//                      var a = 0;
//                     var cards = []
//                 for (var j = 0; j < results.length;  j += 1) {
//                     cards.push(<Col key = {a++} sm={"3"} md={"3"} lg={"3"}>
//                     <Card className="card">
//                         <CardBody>
//                         <CardTitle>{results[j]["title"]}</CardTitle>
//                         <CardSubtitle>{results[j]["name"]}</CardSubtitle>
//                         <CardText>{results[j]["description"]}</CardText>
//                                <Button color="warning">See Attached File(s)</Button>
//                         </CardBody>
//                         <CardFooter className="text-muted">{results[j]["progress"] + " -- Tags: " + results[j]["tags"]}</CardFooter>

//                     </Card>
//                     </Col>)
//                     }
//                     // console.log(results)
//                     console.log(cards)
//                     this.setState({data: cards, header: ctitle})
//                  })

//                 .catch(function(error) {
//                  console.log(error);
//                     });
// }
}
        }
          orgs.push( <Col sm={3} md={3} lg={3} key = {output[i]}>
                    <Card body  className="card">
                        <CardTitle>{output[i]}</CardTitle>
                        <Button color="warning"  onClick={ f(output[i]) }>See Posts</Button>
                    </Card>
                    </Col>
                    )

  }
        console.log(results)
        this.setState({data: orgs})
        })

      .catch(function(error) {
        console.log(error);
        });
    }

  render() {
    return(
      <div>
        <h1>{this.state.header}<Button className="float" color="primary" href='/'>Home</Button></h1>
        <Container>
        <Row>

        {this.state.data}

        </Row>
        </Container>
      </div>

    );
  }
}
export {org};
