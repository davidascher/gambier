import React, { Component } from 'react';
import {AuthNavbar} from './authbar'
import {authenticatedComponent } from './firebaseUtils.js'
import firebase from 'firebase'
import smartcrop from 'smartcrop'
import moment from 'moment'

// XXX Add an optional location on the island
// XXX Add an optional emoji/fa-icon

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

class UnauthedAdd extends Component {
  constructor () {
    super()
    this.state = {
      'section': '',
      'subject': '',
      'body': '',
      imageURLs: []
      // user: this.state.user
    }
  }

  onImageChange (e) {
    let file = e.target.files[0];

    if (file) {
      if (/^image\//i.test(file.type)) {
        this.readFile(file);
      } else {
        alert('Not a valid image!');
      }
    }
  }

  readFile (file) {
    var reader = new FileReader();
    let comp = this

    reader.onloadend = function () {
      comp.processFile(reader.result, file.type, file.name);
    }

    reader.onerror = function () {
      console.log('There was an error reading the file!');
    }

    reader.readAsDataURL(file);
  }

  processFile (dataURL, fileType, fileName) {
    var maxWidth = 960;
    var maxHeight = 720;
    let comp = this;
    let canvas;

    var image = new Image();
    image.src = dataURL;

    image.onload = function () {

      smartcrop.crop(image, {width: maxWidth, height: maxHeight}).then(function(result){
        let crop = result.topCrop;
        canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        var context = canvas.getContext("2d");
        let ratio = (1.0*maxWidth) / crop.width
        context.scale(ratio, ratio)
        context.drawImage(image, 0,0, crop.width, crop.height);
        let smallImage = canvas.getContext("2d").getImageData(0, 0, maxWidth, maxHeight)
        canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        context = canvas.getContext("2d");
        context.putImageData(smallImage, 0, 0)
        canvas.toBlob(function(blob) {
          comp.sendFile(blob, fileName);
        }, 'image/jpeg', .5)
      });
    };

    image.onerror = function () {
      alert('There was an error processing your file!');
    };
  }

  sendFile (file, fileName) {
    let comp = this
    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('uploadsByUser/' + this.props.user.uid + '/' + moment().format()).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        comp.setState({progressState: progress})
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            comp.setState({loading: true})
            // console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            comp.setState({loading: true})
            // console.log('Upload is running');
            break;
          default:
            console.log("unhandled case");
        }
      }, function(error) {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          console.log("unhandled case");
      }
    }, function () {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      let imageURLs = comp.state['imageURLs']
      imageURLs.push(downloadURL)
      comp.setState({loading: false, imageURLs: imageURLs})
    });

  }
  
  cancel () {
    window.history.back();
  }

  submit () {
    console.log('doing submit')
    // eslint-disable-next-line
    var database = firebase.database();
    let postData = {
      poster: this.props.user.displayName,
      tag: this.state.section,
      body: this.state.body,
      uid: this.props.user.uid,
      imageURLs: this.state.imageURLs,
      timestamp: moment().valueOf(),
      subject: this.state.subject
    }
    console.log('postData', postData)
    try {
      console.log("WRiting a post")
      let key = database.ref().child('posts').child('general').push().key;
      console.log('key', key)
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates[`/posts/general/${key}`] = postData;
      // eslint-disable-next-line
      return firebase.database().ref().update(updates);
    } catch (e) {
      console.log(e)
    }
  }

  handleSectionChange (event) {
    this.setState({section: event.target.value});
  }
  handleSubjectChange (event) {
    this.setState({subject: event.target.value});
  }
  handleBodyChange (event) {
    this.setState({body: event.target.value});
  }

  render() {
    let progress;
    if (this.state.loading) {
      let progressState = this.state.progressState
      progress = (<progress className="progress is-primary" value={progressState} max="100">{progressState}%</progress>) 
    } else {
      progress = (<span />)
    } 
    let figures = this.state.imageURLs.map(function (url, index) {
      return (<figure key={index} className="image is-4x3">
        <img src={url} alt="upload" />
      </figure>
      )
    })

    let imagelist = (<div>
      {figures}
    </div>)

    return (
      <div>
        <div className="hero is-medium is-danger is-bold">
          <div className="hero-head">
            <AuthNavbar />
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Add your two bits
              </h1>
              <h2 className="subtitle">
                Be kind, rewind
              </h2>
            </div>
          </div>
        </div>
        <section className="section">
          <label className="label">Label</label>
          <p className="control">
            <span className="select">
              <select value={this.state.section}
                onChange={this.handleSectionChange.bind(this)}>
                <option value="">Select Dropdown</option>
                <option value="news">Announcements</option>
                <option value="freestuff">Free Stuff</option>
                <option value="forsale">For Sale</option>
                <option value="forbuy">Looking for…</option>
              </select>
            </span>
          </p>
          <label className="label">Post Title</label>
          <p className="control">
            <input className="input" type="text" placeholder="Make it relevant" onChange={this.handleSubjectChange.bind(this)} />
          </p>
          <label className="label">Post Content</label>
          <p className="control">
            <textarea className="textarea" placeholder="Make it interesting" onChange={this.handleBodyChange.bind(this)} />
          </p>
          <label className="label">Add images</label>
          {imagelist}
          <p className="control">
            <span className="icon">
              <i className="fa fa-camera"></i>&nbsp;
            </span>&nbsp;
            <input id="file" type="file" accept="image/*" onChange={this.onImageChange.bind(this)}/>
            {progress}
          </p>
          <p className="control">
            <button className="button is-primary" onClick={this.submit.bind(this)}>Submit</button>
            <button className="button is-link" onClick={this.cancel.bind(this)}>Cancel</button>
          </p>
        </section>
      </div>
    );
  }
}
export let Add = authenticatedComponent(UnauthedAdd)

