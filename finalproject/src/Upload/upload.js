import './upload.css';
import React, { Component } from 'react';
import {Button, Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
/*import FileList from './fileList.jsx';*/

import config from "./../config.json";

var url=config.testserver;

export default class Upload extends Component {

    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this)
      this.toggle = this.toggle.bind(this)
      this.toggleDropDown = this.toggleDropDown.bind(this);

      this.state = {
        modal: false,
        dropdownOpen: false
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
      fetch(url + '/api/insert', {  //this link will go to our database
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

    toggleDropDown() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }



  render() {
    let Organization = this.props.organizations.map(category => {
       return <option key={category} value={category}>{category}</option>
   })
    return(
      <div>
        <Navbar>
          <NavbarBrand href="/" className="big-text">Answers On Bucknell Clubs</NavbarBrand>
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href='/'> <Button color="primary" href='/'>Home</Button> </NavLink>
          </NavItem>
          </Nav>
        </Navbar>
      <div>
        <h1>Post Submission</h1>
        <h5> Let us know what you are doing!</h5>
        <br></br>
        <Container>

        <form className='body border' onSubmit={this.handleSubmit}>
          <h5>STEP ONE</h5>
          <p>First and Last Name</p>
          <label htmlFor="name">
            <input className="input" ref="name"/>
          </label>
          <br></br>
          <h5>STEP TWO</h5>
          <p>What Organization are you Posting for?</p>
          <select ref="organization" required>
               {Organization}
           </select>
           <br></br>
          <br></br>
          <h5>STEP THREE</h5>
          <p>Title of your Post</p>
          <label htmlFor="title">
            <input ref="title"/>
          </label>
          <br></br>
          <h5>STEP FOUR</h5>
          <p>What is your Idea?</p>
          <label htmlFor="description">
            <input ref="description"/>
          </label>
          <br></br>
          <h5>STEP FIVE</h5>
          <p>Describe your Post with Tags (ex. voting, auditions, hiring, etc.)</p>
          <label htmlFor="tags">
            <input ref="tags"/>
          </label>
          <br></br>
          <h5>STEP SIX</h5>
          <p>How is it Going?</p>
          <select ref="progress">
              <option value="Just an Idea">Just an Idea</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
          </select>
          <br></br>
          <br></br>
          <h5>STEP SEVEN</h5>
          <label htmlFor="file">
              Upload a file: (PDFs only)<br/>
              <input type="file" ref="file" accept="application/pdf" multiple/>
          </label>
          <br></br>
          <button>Submit</button>
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
