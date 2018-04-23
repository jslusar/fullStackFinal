import './search.css';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Card, CardText, CardTitle, CardSubtitle, CardHeader, CardFooter, Container, Row, Col, Button} from 'reactstrap';

    let org = '';
export default class Search extends Component {


    constructor(props){
        super(props);
        this.state = {data: null};
        // this.getOrganization = this.getOrganization.bind(this)
    }

    // getOrganization(e,id){
    //     e.preventDefault();
    //     console.log("this is the id" + id)
    //     let org = id;
    // }

    componentDidMount(){
        fetch('http://localhost:2000/api')
        .then(resp => {
          return resp.json()
        })
        .then(results => {

        var orgs = []
        var title = ''
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

                var title = org

                return function(e){
                    e.preventDefault();
                    console.log("title "+ title)
                }
            }
          orgs.push( <Col key = {output[i]} auto>
                    <Card body  className="card">
                        <CardTitle>{output[i]}</CardTitle>
                        <Button bsStyle="warning"  onClick={f(output[i])} href = "/newsfeed">See Posts</Button>
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
        <h1>Search Page <Button className="float" bsStyle="primary" href='/'>Home</Button></h1>
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
