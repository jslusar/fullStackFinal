import './search.css';
import React, { Component } from 'react';
import { ButtonGroup, Card, CardBody, CardSubtitle, CardHeader, CardFooter, CardTitle, Container, Row, Col, Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';


export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {data: null, header: 'Choose an Organization',button: null, popoverOpen: false};
        this.getPosts = this.getPosts.bind(this)
        this.toggle = this.toggle(this)
    }

    //used to toggle the popover to show the description of each post
    toggle(){
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
        console.log(this.state.popoverOpen)
    }

    //fetch from the database all of the posts
    getPosts(){
        fetch('http://localhost:2000/api')
            .then(resp => {
                return resp.json()
            })
            .then(results => {
                //create an html of the query of all the organization's posts
                console.log(results)
                var a = 0;
                var cards = []
                for (var j = 0; j < results.length;  j += 1) {
                    cards.push(<Col key = {a++} sm={"3"} md={"3"} lg={"3"}>
                    <Card outline color="primary" className="card">
                        <CardHeader className="text-muted">{results[j]["organization"] + ' ('+results[j]["progress"]+')'} </CardHeader>
                        <CardBody>
                            <CardTitle>{results[j]["title"]}</CardTitle>
                            <CardSubtitle>{"Written by: " + results[j]["name"]}</CardSubtitle>
                            <br/>
                            <ButtonGroup>
                                <Button color="secondary" id="Popover1" onClick={this.toggle}>See Description</Button>
                                <Button color="warning">See Attached File(s)</Button>
                            </ButtonGroup>
                        </CardBody>
                        <CardFooter className="text-muted">{"Tags: " + results[j]["tags"]}</CardFooter>
                    </Card>
                     <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                        <PopoverHeader>Description</PopoverHeader>
                        <PopoverBody>{results[j]["description"]}</PopoverBody>
                     </Popover>
                    </Col>)
                }
                console.log(cards)
                //update the page with the new cards of all the posts, a new header, and add a back button on top left
                this.setState({data: cards, header: 'All Organizations', button: <Button className="floatL" color="primary" href="/search">Back</Button>})
            })

            .catch(function(error) {
                console.log(error);
            });
    }

    //render everything fetched as soon as the page opens
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
                }});
                //put the organizations in alphabetical order
                output.sort();
                //create an html of the query of all the posts in the database to use the organization names
                //add an all option to the organizations
                orgs.push(<Col sm={4} md={4} lg={4} key = {"all"}>
                    <Card body  outline color="secondary" className="cardO">
                        <Button className="club" color="link"  onClick={ this.getPosts }>All</Button>
                    </Card>
                    </Col>)
                for (var i = 0; i < output.length;  i += 1) {
                    var f= function(org){
                        var ctitle = org;
                        return function(e){
                            fetch('http://localhost:2000/api/org/' + ctitle)
                                .then(resp => {
                                    return resp.json()
                                })
                                .then(results => {
                                //create an html of the query of all the posts made for the specific org
                                    var a = 0;
                                    var cards = []
                                    for (var j = 0; j < results.length;  j += 1) {
                                        cards.push(<Col key = {a++} sm={"3"} md={"3"} lg={"3"}>
                                            <Card outline color="primary" className="card">
                                                <CardHeader className="text-muted">{results[j]["progress"]} </CardHeader>
                                                <CardBody>
                                                    <CardTitle>{results[j]["title"]}</CardTitle>
                                                    <CardSubtitle>{"Written by: " + results[j]["name"]}</CardSubtitle>
                                                    <br/>
                                                    <ButtonGroup >
                                                        <Button color="secondary" id="Popover1" onClick={this.toggle}>See Description</Button>
                                                        <Button color="warning">See Attached File(s)</Button>
                                                    </ButtonGroup>
                                                </CardBody>
                                                <CardFooter className="text-muted">{"Tags: " + results[j]["tags"]}</CardFooter>
                                            </Card>
                                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                                <PopoverHeader>Description</PopoverHeader>
                                                <PopoverBody>{results[j]["description"]}</PopoverBody>
                                            </Popover>
                                        </Col>)
                                    }
                                    //update screen to show the new cards for the specific org
                                    this.setState({data: cards, header: ctitle, button: <Button className="floatL" color="primary" href="/search">Back</Button>})
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });

                        }
                    }
                    //create the cards with just the name of the org
                    orgs.push( <Col sm={4} md={4} lg={4} key = {output[i]}>
                        <Card body  outline color="secondary" className="cardO">
                            <Button className="club" color="link"  onClick={ f(output[i]).bind(this) }>{output[i]}</Button>
                        </Card>
                    </Col>
                    )

                }
                //update the screen to just show the names of the orgs in the database
                this.setState({data: orgs})
            })

            .catch(function(error) {
                console.log(error);
            });
    }


    render() {
        return(
            <div>
                <h5>{this.state.button}<Button className="float" color="primary" href='/'>Home</Button></h5>
                <div className="pic">
                    {this.state.header}
                </div>
                <Container>
                    <Row>

                    {this.state.data}

                    </Row>
                </Container>
            </div>

            );
        }
    }

