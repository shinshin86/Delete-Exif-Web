import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { deleteExif } from '../actions';
import { circularLoading } from '@yami_beta/react-circular-loading';

const styles = {
  loadingCircle: {
    position: 'fixed',
    top: 100,
    left: 300
  },
  body: {
    maxWidth: '80%',
    marginLeft: '100px'
  },
  fileButton: {
    marginTop: 8
  },
  dropzoneStyle: {
    width: '100%',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
    padding: '8px'
  }
};
const CircularLoading = circularLoading({
  num: 12,
  distance: 5,
  dotSize: 2,
  speed: 1200
});

class FileUploadForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      acceptedFiles: [],
      rejectedFiles: []
    };
  }

  handleDrop(accepted, rejected) {
    this.setState({ acceptedFiles: accepted, rejectedFiles: rejected });
  }

  handleChangeFile(e) {
    const target = e.target;
    const file = target.files.item(0);
    this.updateFile(new Array(file));
  }
  updateFile(f) {
    this.setState({ acceptedFiles: f });
  }
  processingResult(data) {
    if (data.result) {
      let filenames = '';
      data.map(file => {
        filenames += file.name;
        filenames += ',';
      });
      return `Delete Exif File : ${filenames}`;
    } else if (data.result === false) {
      return `Failure Delete Exif`;
    } else {
      return `Select Delete Exif File...`;
    }
  }
  handleClearFile() {
    this.setState({
      acceptedFiles: [],
      rejectedFiles: []
    });
  }

  render() {
    const { data, deleteExif, isProcessing } = this.props;

    return (
      <div>
        <h2>{this.processingResult(data)}</h2>
        {isProcessing && <CircularLoading style={styles.loadingCircle} />}
        <Dropzone
          ref={node => (this.dropzone = node)}
          accept="image/jpeg,image/jpg"
          onDrop={(accepted, rejected) => this.handleDrop(accepted, rejected)}
          style={styles.dropzoneStyle}
        >
          Delete Exif File is Here...
        </Dropzone>
        <div style={styles.fileButton}>
          <input type="file" onChange={e => this.handleChangeFile(e)} />
        </div>
        <div>
          {!!this.state.acceptedFiles.length && (
            <React.Fragment>
              <h3>Accepted files</h3>
              <ul>
                {this.state.acceptedFiles.map(f => (
                  <li key={f.name}>
                    File name : <b>{f.name}</b>
                    <br />
                    File size : <b>{f.size}</b>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
          {!!this.state.rejectedFiles.length && (
            <React.Fragment>
              <h3>Rejected files</h3>
              <ul>
                {this.state.rejectedFiles.map(f => (
                  <li key={f.name}>
                    File name : <b>{f.name}</b>
                    <br />
                    File size : <b>{f.size}</b>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
        </div>
        <button
          style={styles.fileButton}
          onClick={() => deleteExif(this.state.acceptedFiles)}
        >
          Upload
        </button>
        <button
          style={styles.fileButton}
          onClick={() => this.handleClearFile()}
        >
          Clear
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { exif } = state;
  const { isProcessing, data } = exif || {
    isProcessing: false,
    data: {}
  };

  return {
    isProcessing,
    data
  };
}

export default connect(mapStateToProps, { deleteExif })(FileUploadForm);
