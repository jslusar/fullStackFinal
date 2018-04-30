<form id="myForm" name="myForm" onSubmit={this.handleSubmit}>
  <Row>
  <Col xs="4" md="4" lg="4">
    <Card>
      <CardBody>
      <CardTitle>STEP ONE</CardTitle>
      <label htmlFor="name">
          First and Last Name: <br/>
          <input type="text" ref="name" required/>
      </label>
      </CardBody>
    </Card>
  </Col>
      <br/>
  <Col xs="4" md="4" lg="4">
    <Card>
      <CardBody>
      <CardTitle>STEP TWO</CardTitle>
      <label> What organization are you posting for? </label><br/>
         <select ref="organization" required>
              {Organization}
          </select>
      </CardBody>
    </Card>
  </Col>
      <br/>
  <Col xs="4" md="4" lg="4">
    <Card>
      <CardBody>
      <CardTitle>STEP THREE</CardTitle>
      <label htmlFor="title">
          Title of your post: <br/>
          <input type="text" ref="title" required/>
      </label>
      </CardBody>
    </Card>
  </Col>
  </Row>
      <br/>
  <Row>
  <Col xs="4" md="4" lg="4">
    <Card>
      <CardBody>
      <CardTitle>STEP FOUR</CardTitle>
      <label htmlFor="description">
          What is your idea?: <br/>
          <p>You will also have the option to upload a file below.</p>
          <input type="text" ref="description" required/>
      </label>
      </CardBody>
    </Card>
  </Col>
      <br/>
  <Col xs="4" md="4" lg="4">
    <Card>
      <CardBody>
      <CardTitle>STEP FOUR</CardTitle>
      <label htmlFor="tags">
          Describe your post: <br/>
          <p>These will be used as search TAGS for this document. (ex. voting, elections, hiring, auditions, etc.) </p>
          <input type="text" ref="tags" required/>
      </label>
      </CardBody>
    </Card>
  </Col>
      <br/>
  <Col xs="4" md="4" lg="4">
    <Card>
      <CardBody>
      <CardTitle>STEP SIX</CardTitle>
      <label htmlFor="progress">
          How is it going? <br/>
          <select ref="progress">
              <option value="Just an Idea">Just an Idea</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
          </select>
      </label>
      </CardBody>
    </Card>
  </Col>
  </Row>
      <br/>
  <Row>
  <Col xs="6" md="6" lg="6">
      <h5>STEP SEVEN</h5>
      <label htmlFor="file">
          Upload a file: <br/>
          <p>PDFs only please </p>
          <FileList
            host="http://127.0.0.1:9000"
            bucket="abc-uploads" />
          //<input type="file" ref="file" accept="application/pdf" multiple/>
      </label>
  </Col>
  <Col xs="6" md="6" lg="6">
          <button>Submit</button>
  </Col>
  </Row>
</form>
