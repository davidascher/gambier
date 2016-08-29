import React, { Component } from 'react';
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
      'subject': '',
      'body': '',
      'tag': '',
      'email': '',
      'phone': '',
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
    // eslint-disable-next-line
    var database = firebase.database();
    let displayName = 'Unlogged in user'
    let uid = '0'
    if (this.props.user) {
      displayName = this.props.user.displayName
      uid = this.props.user.uid
    }
    let postData = {
      poster: displayName,
      uid: uid,
      email: this.state.email,
      phone: this.state.phone,
      tag: this.state.tag,
      body: this.state.body,
      imageURLs: this.state.imageURLs,
      timestamp: moment().valueOf(),
      subject: this.state.subject
    }
    try {
      let key = database.ref().child('posts').child('general').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates[`/posts/general/${key}`] = postData;
      // eslint-disable-next-line
      return firebase.database().ref().update(updates);
    } catch (e) {
      console.log(e)
    }
  }

  handleTagChange (event) {
    this.setState({tag: event.target.value});
  }
  handleSubjectChange (event) {
    this.setState({subject: event.target.value});
  }
  handleBodyChange (event) {
    this.setState({body: event.target.value});
  }
  validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
  }
  handleEmailChange (event) {
    let email = event.target.value
    this.setState({email: email, emailValid: this.validateEmail(email)})
  }
  handlePhoneChange (event) {
    this.setState({phone: event.target.value});
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

    let emailHelpSpan
    if (this.state.email) {
      if (this.state.emailValid) {
        emailHelpSpan = (<span className="help notsmall is-success">Email address OK</span>) 
      } else {
        emailHelpSpan = (<span className="help notsmall is-danger">Not an email address</span>)
      } 
    } else {
      emailHelpSpan = (<span />)
    }

    return (
        <section className="section">
          <label className="label">Label</label>
          <p className="control">
            <span className="select">
              <select value={this.state.tag}
                onChange={this.handleTagChange.bind(this)}>
                <option value="">Select Dropdown</option>
                <option value="news">Announcements</option>
                <option value="free stuff">Free Stuff</option>
                <option value="for sale">For Sale</option>
                <option value="looking for">Looking for…</option>
                <option value="misc.">Miscellaneous</option>
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
          <div className="notification">
            <label className="label">Contact Info</label>
            <p className="bottom-padding">If you want to be reachable (e.g. if you're selling something), enter email and/or phone.  We will only show these to users who are logged in.</p>
            <label className="label">Your email address</label>
            <p className="control">
              <input className="input" type="text" placeholder="email address" onChange={this.handleEmailChange.bind(this)} />
              {emailHelpSpan}
            </p>
            <label className="label">Your phone number</label>
            <p className="control">
              <input className="input" type="text" placeholder="phone number" onChange={this.handlePhoneChange.bind(this)} />
            </p>
          </div>
          <div className="control is-grouped">
            <p className="control">
              <button className="button is-primary" onClick={this.submit.bind(this)}>Submit</button>
            </p>
            <p className="control">
              <button className="button is-link" onClick={this.cancel.bind(this)}>Cancel</button>
            </p>
          </div>
        </section>
    );
  }
}
export let Add = authenticatedComponent(UnauthedAdd)

