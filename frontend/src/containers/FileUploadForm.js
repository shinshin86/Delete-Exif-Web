import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { deleteExif } from '../actions'
import { Button, Panel } from 'react-bootstrap'
import { circularLoading }  from '@yami_beta/react-circular-loading'

const styles = {
  loadingCircle: {
    position: "fixed",
    top: 100,
    left: 300
  },
  body: {
    maxWidth: '80%',
    marginLeft: '100px'
  },
  fileList: {
    margin: 10,
    listStyleType: 'none'
  },
  fileButton: {
    margin: 5
  },
  dropzoneStyle: {
    width: '100%',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
  },
}
const CircularLoading = circularLoading({
  num: 12,
  distance: 5,
  dotSize: 2,
  speed: 1200,
});

class FileUploadForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
    };
  }

  handleDrop(accepted, rejected) {
    this.setState({ acceptedFiles: accepted, rejectedFiles: rejected })
  }

  handleChangeFile(e) {
    const target = e.target;
    const file = target.files.item(0);
    this.updateFile(new Array(file));
  }
  updateFile(f) {
    this.setState({ acceptedFiles: f })
  }
  processingResult(data) {
    if(data.result) {
      let filenames = ''
      data.map(file => {
        filenames += file.name
        filenames += ','
      })
      return `Delete Exif File : ${filenames}`
    } else if (data.result === false) {
      return `Failure Delete Exif`
    } else {
      return `Select Delete Exif File...`
    }
  }
  handleClearFile() {
    this.setState({
      acceptedFiles: [],
      rejectedFiles: []
    })
  }

  render() {
    const { data, deleteExif, isProcessing }  = this.props
    console.log(data)
    return (
      <div style={styles.body}>
        <div>
          <h3>{this.processingResult(data)}</h3>
          { isProcessing && <CircularLoading style={styles.loadingCircle} /> }
          <Dropzone
            ref={(node) => this.dropzone = node}
            accept="image/jpeg,image/jpg"
            onDrop={(accepted, rejected)=> this.handleDrop(accepted, rejected)}
            style={styles.dropzoneStyle}
          >
            Delete Exif File is Here...
          </Dropzone>
          <div style={styles.fileButton}>
            <input type="file" onChange={(e) => this.handleChangeFile(e)} />
          </div>

          <div className="uploadFile">
            <Panel>
              <Panel.Heading>Accepted files</Panel.Heading>
              <Panel.Body>
                <ul>
                  {this.state.acceptedFiles.map(f => <li key={f.name} style={styles.fileList}>File name : {f.name}<br />File size : {f.size}</li>)}
                </ul>
              </Panel.Body>
              <Panel.Heading>Rejected files</Panel.Heading>
              <Panel.Body>
                <ul>
                  {this.state.rejectedFiles.map(f => <li key={f.name}>File name : {f.name}<br />File size : {f.size}</li>)}
                </ul>
              </Panel.Body>
            </Panel>
          </div>

          <Button bsStyle="primary" style={styles.fileButton} onClick={() => deleteExif(this.state.acceptedFiles)}>
            Upload
          </Button>
          <Button bsStyle="primary" style={styles.fileButton} onClick={() => this.handleClearFile()}>
            Clear
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { exif } = state
  const { isProcessing, data } = exif || {
    isProcessing: false,
    data: {}
  }

  return {
    isProcessing,
    data
  }
}

export default connect(mapStateToProps, { deleteExif } )(FileUploadForm)
