import './search.css';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Card, CardBody, CardSubtitle, CardText, CardHeader, CardFooter, CardTitle, Container, Row, Col, Button} from 'reactstrap';

    let org = '';
export default class Search extends Component {


    constructor(props){
        super(props);
        this.state = {data: null, header: 'Choose an Organization',button: null};
    }


    componentDidMount(){
        fetch('http://localhost:9000/api')
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
                     console.log("this is org " + ctitle)
                fetch('http://localhost:9000/api/org/' + ctitle)
                    .then(resp => {
                    return resp.json()
                    })
                    .then(results => {
                    //create an html of the query
                    console.log(results)
                     var a = 0;
                    var cards = []
                for (var j = 0; j < results.length;  j += 1) {
                    cards.push(<Col key = {a++} sm={"3"} md={"3"} lg={"3"}>
                    <Card className="card">
                        <CardHeader className="text-muted">{results[j]["progress"]} </CardHeader>
                        <CardBody>
                        <CardTitle>{results[j]["title"]}</CardTitle>
                        <CardSubtitle>{"Written by: " + results[j]["name"]}</CardSubtitle>
                        <CardText>{results[j]["description"]}</CardText>
                               <Button color="warning">See Attached File(s)</Button>
                        </CardBody>
                        <CardFooter className="text-muted">{"Tags: " + results[j]["tags"]}</CardFooter>

                    </Card>
                    </Col>)
                    }
                    // console.log(results)
                    console.log(cards)
                    this.setState({data: cards, header: ctitle, button: <Button className="floatL" color="primary" href="/search">Back</Button>})
                 })

                .catch(function(error) {
                 console.log(error);
                    });
// }
}
        }
          orgs.push( <Col sm={3} md={3} lg={3} key = {output[i]}>
                    <Card body  className="card">
                        <CardTitle>{output[i]}</CardTitle>
                        <Button color="warning"  onClick={ f(output[i]).bind(this) }>See Posts</Button>
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
        <h1>{this.state.button}{this.state.header}<Button className="float" color="primary" href='/'>Home</Button></h1>
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
