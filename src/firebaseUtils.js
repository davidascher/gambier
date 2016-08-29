import React from 'react'
import { init } from "firebase-3-react";

init({
    apiKey: "AIzaSyCkKd8YNg1AC-cvLVneHS0ZeshP-e9UFpo",
    authDomain: "gambier-630d6.firebaseapp.com",
    databaseURL: "https://gambier-630d6.firebaseio.com",
    storageBucket: "gambier-630d6.appspot.com",
})

import firebase from 'firebase';

import { Component } from "react";

export var authenticatedComponent = ComposedComponent => class extends Component {
  constructor() {
    super()
    this.state = { user: null };
  }
  componentWillMount() {
    let cb =  this.gotAuthStateChanged.bind(this);
    firebase.auth().onAuthStateChanged(cb, this.gotError.bind(this));
  }
  gotError (error) {
    console.log(error);
  }
  gotAuthStateChanged (user) {
    let comp = this;
    if (user) {
      // console.log("in gotAuthStateChaned", user, comp)

        var displayName = user.displayName;
        var email = user.email;
        // var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var providerData = user.providerData;
      user.getToken().then(function(accessToken) {
        comp.setState({user: {
          displayName: displayName,
          accessToken: accessToken,
          email: email,
          uid: uid,
          providerData: providerData,
          photoURL: photoURL
        }})
      });
    } else {
      comp.setState({user: null})
    }
  }
  render() {
    return (<ComposedComponent {...this.props} user={this.state.user} />);
  }
};


// eslint-disable-next-line 
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  'signInSuccessUrl': '/',
  'signInOptions': [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  'tosUrl': '/tos',
};

export var startFlow = function(widgetId) {
  ui.start(widgetId, uiConfig);
}

export var signOut = function() {
  firebase.auth().signOut();
}
