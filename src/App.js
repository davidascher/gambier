import React, { Component } from 'react';
import './App.css';
import 'classnames';
import './bulma.css';
import {authenticatedComponent, startFlow, signOut } from './firebaseUtils.js'
import { bindToItem } from "firebase-3-react";
import {Router, Route, browserHistory} from "react-router";

class Post extends React.Component {
  render () {
    return (
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src="//placehold.it/128x128" alt="placeholder" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p><strong>
            {this.props.poster}
            </strong></p>
          </div>
          <div className="content">
            {this.props.body}
            <br /> 
            <small>11:09 PM - 1 Jan 2016</small>
          </div>
          <nav className="level">
            <div className="level-left">
                <a className="level-item is-primary is-inverted button">
                  <span className="icon">
                    <i className="fa fa-reply"></i>
                  </span>
                  <span className="is-hidden-mobile" >reply</span>
                </a>
                <a className="level-item is-primary is-inverted button">
                  <span className="icon">
                    <i className="fa fa-heart"></i>
                  </span>
                  <span className="is-hidden-mobile" >like</span>
                </a>
                <a className="level-item is-danger is-inverted button">
                  <span className="icon">
                    <i className="fa fa-flag"></i>
                  </span>
                  <span className="is-hidden-mobile" >flag</span>
                </a>
            </div>
          </nav>
        </div>
        <div className="media-right">
          <a className="button is-light">
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
            <span className="is-hidden-mobile" >Ignore</span>
          </a>
        </div>
      </article>
    )
  }
}

Post.propTypes = {
  poster: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
};

class Category extends React.Component {
   render () {
     const posts = this.props.Items;
     let items = Object.keys(posts).map((id: string) => {
       const post = posts[id];
       return <Post key={id} poster={post.poster} body={post.body} />
     });

     return (
       <div>
         <div className="subtitle is-5">{this.props.Label}</div>
         <div className="box">
          {items}
         </div>
       </div>
     )
  }
}

Category.propTypes = {
  Label: React.PropTypes.string.isRequired,
  Items: React.PropTypes.array.isRequired
};

// const BoundCategory = bindToItem(Category);

const Categories = class extends React.Component {
  render() {
    return <div>{this.renderCategories()}</div>;
  }

  renderCategories() {
    const categories = this.props.data;
    return Object.keys(categories).map((id) => {
      const category = categories[id];

      return <Category key={id} Label={category.Label} Items={category.Items}></Category>;
    });
  }
};

Categories.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
};

const BoundCategories = bindToItem(Categories);


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
    if (this.props.user) {
      return (<div />);
    }
    else {
      return (
        <a id="sign-in" className="button is-primary" href="#" onClick={this.signin.bind(this)}>
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
        <a id="sign-out" className="button is-primary" href="#" onClick={this.signout.bind(this)}>
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
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-item title is-3 is-brand is-primary" href="#">
            Gambier Club
          </a>
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

let AuthNavbar = authenticatedComponent(Navbar);

class Home extends Component {
  render() {
    return (
      <div>
      <AuthNavbar />
        <section className="section is-medium">
          <div className="container is-fluid">
            <BoundCategories firebaseRef="Categories" />
            <a className="button" href="/add">
              <i className="fa fa-check"></i>
              +
            </a>
          </div>
        </section>
      </div>
    );
  }
}


class Add extends Component {
  constructor () {
    super()
    this.state = {
      'section': '',
      'subject': '',
      'body': ''
    }
  }
  cancel () {
    window.history.back();
  }

  submit () {
    console.log(this.state.section)
  }

  handleSectionChange (event) {
    this.setState({section: event.target.value});
  }

  render() {
    return (
      <div>
        <AuthNavbar />
        <div className="section">
        <div className="container is-fluid">
            <section className="hero is-medium is-danger is-bold">
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
            </section>
          <section className="section">
            <label className="label">Section</label>
            <p className="control">
              <span className="select">
                <select value={this.state.section}
                  onChange={this.handleSectionChange.bind(this)}>
                  <option value="">Select Dropdown</option>
                  <option value="news">Announcements</option>
                  <option value="free">Free Stuff</option>
                  <option value="forsale">For Sale</option>
                  <option value="forbuy">Looking for…</option>
                </select>
              </span>
            </p>
            <label className="label">Post Title</label>
            <p className="control">
              <input className="input" type="text" placeholder="Make it relevant" />
            </p>
            <label className="label">Post Content</label>
            <p className="control">
              <textarea className="textarea" placeholder="Make it interesting"></textarea>
            </p>
            <p className="control">
              <button className="button is-primary" onClick={this.submit.bind(this)}>Submit</button>
              <button className="button is-link" onClick={this.cancel.bind(this)}>Cancel</button>
            </p>
          </section>
        </div>
      </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/add" component={Add} />
      </Router>
    );
  }
}

export default App;
