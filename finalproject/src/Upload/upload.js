import './upload.css';
import React, { Component } from 'react';
import {Button, Container, Row, Col, Modal,  ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default class Upload extends Component {

    constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    this.toggle = this.toggle.bind(this)

    this.state = {
      modal: false
    };
  }

static defaultProps = {organizations: ["The Silhouettes", "The Offbeats", "Beyond Unison",
                        "Two Past Midnight", "The Bucknellian", "Chi Phi", "Delta Gamma"] ,
                }

toggle() {
    this.setState({
      modal: !this.state.modal
    });
console.log("modal state: " + this.state.modal)
}

   handleSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.refs.name.value,
      organization: this.refs.organization.value,
      title: this.refs.title.value,
      description: this.refs.description.value,
      tags: this.refs.tags.value,
      progress: this.refs.progress.value,
      file: this.refs.file.value
    };
     fetch('http://localhost:2000/api/insert', {  //this link will go to our database
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(resp => {
        if(resp.status === 200){
            this.toggle();
        }
        })

    console.log(JSON.stringify(data))
}



  render() {
    return(
      <div className="body border">
        <h1>Post Submission <Button className="float" color="primary" href='/'>Home</Button> </h1>
        <h5> Let us know what you are doing!</h5>
        <Container>

        <form id="myForm" name="myForm" onSubmit={this.handleSubmit}>
        <Row>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP ONE</h5>
            <label htmlFor="name">
                First and Last Name: <br/>
                <input type="text" ref="name" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP TWO</h5>
            <label htmlFor="organization">
                What organization are you posting for? <br/>
                <input type="text" ref="organization" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP THREE</h5>
            <label htmlFor="title">
                Title of your post: <br/>
                <input type="text" ref="title" required/>
            </label>
        </Col>
        </Row>
            <br/>
        <Row>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP FOUR</h5>
            <label htmlFor="description">
                What is your idea? <br/>
                <p>You will also have the option to upload a file below.</p>
                <input type="text" ref="description" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP FIVE</h5>
            <label htmlFor="tags">
                Describe your post: <br/>
                <p>These will be used as search TAGS for this document. (ex. voting, elections, hiring, auditions, etc.) </p>
                <input type="text" ref="tags" required/>
            </label>
        </Col>
            <br/>
        <Col xs={4} md={4} lg={4}>
            <h5>STEP SIX</h5>
           <label htmlFor="progress">
                How is it going? <br/>
                <select ref="progress">
                    <option value="Just an Idea">Just an Idea</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Finished">Finished</option>
                </select>
            </label>
        </Col>
        </Row>
            <br/>
        <Row>
        <Col xs={6} md={6} lg={6}>
            <h5>STEP SEVEN</h5>
            <label htmlFor="file">
                Upload a file: <br/>
                <p>PDFs only please </p>
                <input type="file" ref="file" accept="application/pdf" multiple/>
            </label>
        </Col>
        <Col xs={6} md={6} lg={6}>
                <button>Submit</button>
        </Col>
        </Row>


        </form>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Submission Post Succesful
          </ModalHeader>
          <ModalBody>
                <p>Thank you for submitting information on your organization!</p>
                <p>If you would like to sumbit another post click the Again button below.</p>
                <p>Or you can find your post and others by clicking the Search button.</p>
          </ModalBody>
          <ModalFooter>
            <Button color= "primary" href='/upload'> Again </Button>
            <Button color = "secondary" onClick={this.toggle} href='/search'>Search</Button>
          </ModalFooter>
        </Modal>
        </Container>




      </div>
    );
  }
}


