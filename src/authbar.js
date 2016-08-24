import React, { Component } from 'react';
import {Link} from 'react-router'
import {authenticatedComponent, startFlow, signOut } from './firebaseUtils.js'

class Navbar extends Component {
  constructor () {
    super()
    this.state = {'showWidget' : false, user: null}
  }

  signin () {
    // console.log("signing in", this.state, "this.user", this.user)
    this.setState({'showWidget': true})
    // console.log(this.state)
    window.requestAnimationFrame(function() {
      startFlow('#widget')
    });

    // removeClass(document.getElementById("widget"), "hidden");
  }

  signout () {
    signOut();
    // this.onChange(false);
  }

  renderSignIn () { 
    if (this.props.user || this.state.showWidget) {
      return (<div />);
    }
    else {
      return (
        <a id="sign-in" className="button is-light is-outlined" href="#" onClick={this.signin.bind(this)}>
          <span className="icon">
            <i className="fa fa-sign-in"></i>
          </span>
          <span>Sign in</span>
        </a>
      )
    }
  }


  renderSignOut () { 
    if (this.props.user) {
      let displayName = this.props.user.displayName;
      return (
        <a id="sign-out" className="button is-light" href="#" onClick={this.signout.bind(this)}>
          <span id="sign-out-label"><span className="is-hidden-mobile">{displayName}: </span>Sign out</span>
          <span className="icon">
            <i className="fa fa-sign-out"></i>
          </span>
        </a>
      )
    }
    else {
      return (<div />);
    }
  }

  renderWidget () {
    // The start method will wait until the DOM is loaded.
    if (this.state.showWidget) { 
      return (<div id="widget" />)
    } else {
      return (<div />)
    }
  }

  render () { 
    let signin = this.renderSignIn()
    let signout = this.renderSignOut()
    let widget = this.renderWidget()
    return (
          <nav className="nav has-shadow">
            <div className="nav-left">
              <Link to="/" className="nav-item title is-3 is-brand is-hidden-touch">
                Gambier Island Trader
              </Link>
              <Link to="/" className="nav-item title is-5 is-brand is-hidden-desktop">
                Gambier Island Trader
              </Link>
            </div>

            <div className="nav-right">
              <span className="nav-item">
                {signin}{signout}{widget}
              </span>
            </div>
          </nav>
    )
  }
}

export let AuthNavbar = authenticatedComponent(Navbar);
