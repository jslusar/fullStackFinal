import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';
import {Modal, ModalBody, ModalFooter,ModalHeader} from 'reactstrap';
import Dropzone from 'react-dropzone'

const Icons = require('react-icons/lib/md')


export default class FileList extends Component{
  constructor(props){
    super(props)
    this.state = {
      files: [],
      error: null,
      showUploadModal: false,
      dropActive: false,
      accept: "" // this seems to accept ALL file types.
      //accept: "text/*. image/*, application/*"
    }
    // this.refreshFiles = this.refreshFiles.bind(this)
    this.toggleFileUploadDialog = this.toggleFileUploadDialog.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDropEnter = this.handleDropEnter.bind(this)
    this.handleDropLeave = this.handleDropLeave.bind(this)
  }
  handleDrop(accepted, rejected){
    // when a file drop is complete, this does the work
    // accepted and rejected are two lists.
    console.log('got drop for', accepted, 'rejected', rejected)

    let fd = new FormData()

    accepted.forEach((f,idx)=>{
      console.log(idx, f)
      // append to the same key so the server knows how to find them.
      fd.append('files', f)
    })
    console.log(fd)

    fetch(this.props.host+'/upload',{
      method: 'POST',
      body: fd,
    })
      .then(resp=>resp.json())
      .then(resp=>{
        console.log("upload finished with", resp)
        this.refreshFiles(true)
        // free memory allocated by browser for preview
        accepted.map(f=>window.URL.revokeObjectURL(f.preview))
        rejected.map(f=>window.URL.revokeObjectURL(f.preview))
      })
      .catch(err=>{
        console.log("upload failed with", err)
      })

    this.setState({dropActive:false, showUploadModal:false})
  }
  handleDropEnter(){
    this.setState({dropActive:true})
  }
  handleDropLeave(){
    this.setState({dropActive:false})
  }
  toggleFileUploadDialog(){
    this.setState({showUploadModal: !this.state.showUploadModal})
  }
  render(){

    // modal dialog for uploads.
    var uploadModal = (
      <Modal isOpen={this.state.showUploadModal}
        toggle={this.toggleFileUploadDialog}>
        <ModalHeader toggle={this.toggleFileUploadDialog}>Upload file</ModalHeader>
        <Dropzone
        style={{borderWidth: "2px",
                  borderColor: "rgb(102, 102, 102)",
                  borderStyle: "dashed",
                  borderRadius: "5px"}}
          accept={this.state.accept}
          onDrop={this.handleDrop}
          onDragEnter={this.handleDropEnter}
          onDragLeave={this.handleDropLeave}>
          <ModalBody>
            {this.state.dropActive ? <p>Drop files here...</p> :
              <p>Click to browse or drag your files here to upload.</p>}
          </ModalBody>
        </Dropzone>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )

    // this the main card shown to the user with the modal
    var fileListCard = (
      <Card>
        {uploadModal}
        <CardBody>
          <CardText></CardText>
            <div>
              <div>
                <Button color="success"
                  onClick={this.toggleFileUploadDialog}>
                  <Icons.MdAddCircle/>
                  Add File
                </Button>
              </div>
            </div>

        </CardBody>
      </Card>
    )

    // if there is an error, switch to an error message card.
    return this.state.error === null ? fileListCard : (<Card>
            <CardBody>
              <CardTitle className="text-danger">Error</CardTitle>
              <CardText>{this.state.error.toString()}</CardText>
            </CardBody>
          </Card>)

  }
}
