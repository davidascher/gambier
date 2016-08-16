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
            <p>
              <strong>{this.props.subject}</strong> <i>(by {this.props.poster})</i>
            </p> 
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
  subject: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
};

class PostList extends React.Component {
   render () {
     const posts = this.props.data;
     console.log("posts", posts)  
     if (! posts) {
      return (<div />)
     }  
    //  const posts = this.props.items;
     let items = Object.keys(posts).map((id: string) => {
       const post = posts[id];
       console.log("POST", post)
       return <Post key={id} poster={post.poster} subject={post.subject} body={post.body} />
     });

     return (
       <div>
         <hr />
         <div className="title is-3">{this.props.label}</div>
         <div className="title is-5">{this.props.subtitle}</div>
         <div className="box">
          {items}
         </div>
       </div>
     )
  }
}

PostList.propTypes = {
  label: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
};

const BoundPostList = bindToItem(PostList);


const Categories = class extends React.Component {
  render() {
    return <div>{this.renderCategories()}</div>;
  }

  renderCategories() {
    const categories = this.props.data;
    return Object.keys(categories).map((id) => {
      const category = categories[id];
      const categoryRef = 'posts/'+id

      return <BoundPostList key={id} label={category.label} firebaseRef={categoryRef} />
      // return <Category key={id} label={category.label} items={category.items}></Category>;
    });
  }
};

Categories.propTypes = {
  data: React.PropTypes.object,
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
      <div className="hero is-light">
        <div className="hero-head">
          <nav className="nav has-shadow">
            <div className="nav-left">
              <a className="nav-item title is-2 is-brand" href="#">
                Gambier Island Club
              </a>
            </div>

            <div className="nav-right">
              <span className="nav-item">
                {signin}{signout}{widget}
              </span>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

let AuthNavbar = authenticatedComponent(Navbar);

class Home extends Component {
  render() {
    return (
      <div>
        <AuthNavbar />
        <section className="hero is-medium is-dark is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Sell, buy, trade, give
              </h1>
              <h2 className="subtitle">
                <i>lean on me, when you're not strong</i>
              </h2>
            </div>
          </div>
        </section>
        <section className="section is-medium">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column">
                <a href="#">
                  <p className="notification is-danger">
                    Ferry Updates
                  </p>
                </a>
              </div>
              <div className="column">
                <p className="notification is-info">
                Free Stuff
                </p>
              </div>
              <div className="column">
                <p className="notification is-primary">
                For Sale
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <p className="notification is-dark">
                News
                </p>
              </div>
              <div className="column">
                <p className="notification is-warning">
                Looking for…
                </p>
              </div>
              <div className="column">
                <p className="notification is-light">
                Useful Links
                </p>
              </div>
            </div>



            <BoundCategories firebaseRef="sectionsMeta" />
            <div className="control is-grouped">
            <p className="control">
              <a className="button" href="/add">
                <span className="icon">
                  <i className="fa fa-plus"></i>
                </span>
                <span> add post</span>
              </a>
              </p>
            </div>
          </div>

        </section>
      </div>
    );
  }
}


// XXX Add an optional picture
// XXX Add an optional location on the island
// XXX Add an optional emoji/fa-icon

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
    // eslint-disable-next-line
    var database = firebase.database();
    let postData = {
      poster: this.props.user.displayName,
      body: this.state.body,
      uid: this.props.user.uid,
      subject: this.state.subject
    }
    try {
      let key = database.ref().child('posts').child(this.state.section).push().key;
      console.log("KEY", key)
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates[`/posts/${this.state.section}/${key}`] = postData;
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
let AuthenticatedAdd = authenticatedComponent(Add)

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/add" component={AuthenticatedAdd} />
      </Router>
    );
  }
}

export default App;
