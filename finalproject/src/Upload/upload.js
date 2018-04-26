import './upload.css';
import React, { Component } from 'react';
import {Button, Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default class Upload extends Component {

    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this)
      this.toggle = this.toggle.bind(this)

      this.state = {
        modal: false
      };
    }

    static defaultProps = {organizations: ["No Specific Organization", "'Nell Party", "Accounting Club", "Active Minds", "Activities and Campus Events",
                        "Alpha Chi Omega", "Alpha Delta Pi", "Alpha Lambda Delta Honor Society", "Alpha Phi Omega",
                        "Alpha Psi Omega", "Alpha Xi Delta", "AmpSoul", "Anime Society", "Arabic Club", "Art Collective",
                        "Asian Pacific American Student Association", "Athletics", "BE Magazine", "Beyond Unison",
                        "Biology Club", "Biomedical Engineering Society", "Bison Beatz Tap Club", "Bison Bikes", "Bison Firsts",
                        "Bison Girls Dance Team", "Bison Investment Club", "Bison Pals", "Bison Running Club", "Bisonettes",
                        "Black Student Union", "BLINC", "Bucks's Orchestra", "Bucknell Brigade", "Bucknell Buddies",
                        "Bucknell Business Leaders", "Bucknell Club Badminton", "Bucknell Consulting Group", "Bucknell Photography Club",
                        "Bucknell Student Government", "Bucknell's Africa Student Association", "Bucknellian", "BuckWild",
                        "Burmese Cultural Organization", "Business Review", "C.A.L.V.I.N. & H.O.B.B.E.S.", "Campus Activities and Programs",
                        "Campus Vinyl", "Cap and Dagger", "Caribbean Students Association", "Chess Club", "Chi Epsilon", "Chi Omega",
                         "Chi Phi", "Chinese Students and Scholars Association", "Civic Engagement", "Classics Club", "CLIMBucknell",
                         "Club Cycling", "Club Field Hockey", "Club Ice Hockey", "Club Sailing", "Club Spike Ball", "Club Swim Team",
                         "Club Tennis", "College Democrats", "College Dropout", "College Republicans at Bucknell", "Colleges Against Cancer",
                         "Common Ground", "Concert Committee", "Conservatives Club",  "Delta Gamma", "Delta Sigma Theta",
                         "Diversity Outreach Team", "Do Random Acts of Kindness", "DRAGON", "Eidos", "EMpwr", "Entreprenurial Club",
                         "Environmental Club", "Equestrian Team", "ESports Club", "Fashion Club", "FIJI Delta Chapter",
                         "Film Club", "French Club", "Gender & Sexuality Alliance", "German Club", "Habitat for Humanity",
                         "Headstart", "Her Campus Bucknell", "History Club", "Interfraternity Council", "International Student Services",
                         "InterVarsity Christian Fellowship", "Irish Dance Club", "Italian Club", "Japan Society", "Jewish Life/Hillel",
                         "Kappa Alpha Theta", "Kappa Delta Pi", "Kappa Delta Rho", "Kappa Kappa Gamma", "Kappa Sigma",
                         "Korean Cultural Association", "L'Agenda Yearbook", "Lambda Chi Alpha", "LACOS", "LGBT Awareness",
                         "Love Your Melon Campus Crew", "Magic Club", "Makers and Robotics Club", "Men's Club Water Polo",
                         "Men's Rugby Football Club", "Mock Trial", "Model United Nations", "Mortar Board", "Mu Sigma Upsilon",
                         "Multicultural Student Services", "Muslim Student Association at Bucknell University", "Net Impact",
                         "Nutrition Initiative Program", "Omicron Delta Kappa", "Operation Smile", "Order of Omega", "OEL",
                         "Outing Club", "Panhellenic Council", "Pep Band", "Philosophy Club", "Pre-Health Society", "Psi Chi",
                         "Real Estate Club", "Religious Life", "Roots and Shoots", "Rotaract Club", "Russian Club", "Shotokan Karate Club",
                         "Sigma Chi", "Sigma Iota Rho", "Sigma Phi Epsilon", "Silhouettes", "South Asian Student Association",
                         "Student Art Association", "Student Emergency Response Volunteers", "Student Transfer Association",
                         "Students for Nepal", "Students for Sustainable Development", "Students Helping Animals",
                         "Tau Kappa Epsilon", "Tea Enjoyment & Aprreciation", "The Brigade", "The Humanities Review",
                         "The Offbeats", "Theater and Dance", "Tibet Culture Association", "Two Past Midnight", "Ubuntu Club",
                         "Uptown", "Venture Capital Club", "Vietnamese Student Association", "Voices of Praise",
                         "We Brake For Nobody", "Women's Club Lacrosse", "Women's Club Soccer", "Women's Club Ultimate Frisbee",
                         "Women's Resource Center", "Women's Volleyball Club", "Writers of Rohan", "Writing Center", "WVBU-FM"] ,
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
    let Organization = this.props.organizations.map(category => {
       return <option key={category} value={category}>{category}</option>
   })
    return(
      <div>
        <img src={require("./../homepage.jpg") } alt=""/>
        <Navbar>
          <NavbarBrand href="/" className="big-text">Answers On Bucknell Clubs</NavbarBrand>
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href='/'> <Button color="primary" href='/'>Home</Button> </NavLink>
          </NavItem>
          </Nav>
        </Navbar>
      <div id="body" className="body border">
        <h1>Post Submission</h1>
        <h5> Let us know what you are doing!</h5>
        <Container>

        <form id="myForm" name="myForm" onSubmit={this.handleSubmit}>
        <Row>
        <Col xs="4" md="4" lg="4">
            <h5>STEP ONE</h5>
            <label htmlFor="name">
                First and Last Name: <br/>
                <input type="text" ref="name" required/>
            </label>
        </Col>
            <br/>
        <Col xs="4" md="4" lg="4">
            <h5>STEP TWO</h5>
            <label> What organization are you posting for? </label><br/>
               <select ref="organization" required>
                    {Organization}
                </select>
        </Col>
            <br/>
        <Col xs="4" md="4" lg="4">
            <h5>STEP THREE</h5>
            <label htmlFor="title">
                Title of your post: <br/>
                <input type="text" ref="title" required/>
            </label>
        </Col>
        </Row>
            <br/>
        <Row>
        <Col xs="4" md="4" lg="4">
            <h5>STEP FOUR</h5>
            <label htmlFor="description">
                What is your idea? <br/>
                <p>You will also have the option to upload a file below.</p>
                <input type="text" ref="description" required/>
            </label>
        </Col>
            <br/>
        <Col xs="4" md="4" lg="4">
            <h5>STEP FIVE</h5>
            <label htmlFor="tags">
                Describe your post: <br/>
                <p>These will be used as search TAGS for this document. (ex. voting, elections, hiring, auditions, etc.) </p>
                <input type="text" ref="tags" required/>
            </label>
        </Col>
            <br/>
        <Col xs="4" md="4" lg="4">
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
        <Col xs="6" md="6" lg="6">
            <h5>STEP SEVEN</h5>
            <label htmlFor="file">
                Upload a file: <br/>
                <p>PDFs only please </p>
                <input type="file" ref="file" accept="application/pdf" multiple/>
            </label>
        </Col>
        <Col xs="6" md="6" lg="6">
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
      </div>
    );
  }
}


