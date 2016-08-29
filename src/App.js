import React, { Component } from 'react';
import './App.css';
import 'classnames';
import './bulma.css';
import firebase from 'firebase'
import { bindToItem } from "firebase-3-react";
import {Router, Route, browserHistory, IndexRoute, Link } from "react-router";
import {Ferry, NB2Vancouver, Vancouver2NB} from "./Ferry";
import {AuthNavbar} from './authbar'
import {authenticatedComponent} from './firebaseUtils.js'
import {Add} from './add'
import moment from 'moment';

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js');
}

class unAuthedPost extends React.Component {
  constructor () {
    super()
    this.state = {'showModal': false}
  }

  editPost () {

  }

  deletePost () {
    this.setState({'showModal': true})
  }
  hideModal () {
    this.setState({'showModal': false})
  }
  doDelete () {
    console.log(this.props.firebaseref)
    var database = firebase.database();
    var updates = {};
    let key = this.props.firebaseref
    let newpost = this.props.post
    newpost['hidden'] = 'deleted by user'
    updates[`/posts/general/${key}`] = newpost;
    database.ref().update(updates)
    this.setState({'showModal': false})
    //
  }


  render () {
    let images = (<span />);
    if (this.props.post.imageURLs) {
      images = this.props.post.imageURLs.map(function(imageURL, index) {
        return (
          <figure key={index} className="image is-4x3">
            <img src={imageURL} alt="placeholder" />
          </figure>
        )
      })
    }
    let time = this.props.post.timestamp ? moment(this.props.post.timestamp).fromNow() : ''
    let tag
    if (this.props.post.tag) {
      let taglabel = this.props.post.tag
      tag = (
        <span className="level-item tag">
          {taglabel}
        </span>
      )
    } else {
      tag = (<span />)
    }
    let editdeleteButtons
    if (this.props.user && this.props.post.uid === this.props.user.uid) {
      editdeleteButtons = (
        <span>
          <a className="level-item is-small is-info is-inverted button" onClick={this.editPost.bind(this)}>
            <span className="icon">
              <i className="fa fa-pencil"></i>
            </span>
            <span className="is-hidden-mobile" >edit</span>
          </a>
          <a className="level-item is-small is-info is-inverted button" onClick={this.deletePost.bind(this)}>
            <span className="icon">
              <i className="fa fa-trash"></i>
            </span>
            <span className="is-hidden-mobile" >delete</span>
          </a>
        </span>
      )
    } else {
      editdeleteButtons = (<span />)
    }

    let post = (
        <div className="media-content">
          <div className="content">
            <nav className="level is-mobile">
              <div className="level-left">
                <p className="level-item">
                  <strong>{this.props.post.subject}</strong>
                </p> 
              </div>
              <div className="level-right">
                {tag}
                {editdeleteButtons}
              </div>
            </nav>
          </div>
          <div className="content">
            {this.props.post.body}
            <br /> 
            {images}
            <div className="level is-mobile">
              <span className="level-item">{this.props.post.poster}</span>
              <span className="level-right right-align level-item">{time}</span>
            </div>
          </div>
        </div>
    )
    let embedPost = (
        <div className="media-content">
          <div className="content">
            <nav className="level is-mobile">
              <div className="level-left">
                <p className="level-item">
                  <strong>{this.props.post.subject}</strong>
                </p> 
              </div>
              <div className="level-right">
                {tag}
              </div>
            </nav>
          </div>
          <div className="content">
            {this.props.post.body}
            <br /> 
            {images}
            <div className="level is-mobile">
              <span className="level-item">{this.props.post.poster}</span>
              <span className="level-right right-align level-item">{time}</span>
            </div>
          </div>
        </div>
    )

    let deleteConfirm
    if (this.state.showModal) {
      deleteConfirm = (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Are you sure you want to remove this post?</p>
              <button onClick={this.hideModal.bind(this)} className="delete"></button>
            </header>
            <section className="modal-card-body">
              {embedPost}
            </section>
            <footer className="modal-card-foot">
              <a onClick={this.doDelete.bind(this)} className="button is-primary">Delete post</a>
              <a onClick={this.hideModal.bind(this)} className="button">Cancel</a>
            </footer>
          </div>
        </div>
      )
    } else {
      deleteConfirm = (<span />)
    }



    return (
      <article className="media">
        {post}
        {deleteConfirm}
      </article>
    )
  }
}

unAuthedPost.propTypes = {
  post: React.PropTypes.object.isRequired,
  firebaseref: React.PropTypes.string.isRequired,
};

let Post = authenticatedComponent(unAuthedPost)

class PostList extends React.Component {
   render () {
     const posts = this.props.data;
     if (! posts) {
      return (<div />)
     }  
    // this will hide any posts that are marked as 'hidden' (whether by user, admin, etc.)
     let unhiddenkeys = Object.keys(posts).filter((id) => {
       return ! posts[id].hidden
     })

     let items = unhiddenkeys.map((id) => {
       const post = posts[id];
       console.log("id", id)
       return <Post key={id} firebaseref={id} post={post}/>
     });

     items = items.reverse()
     return (
        <div className="section">
          <div className="container box">
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
    });
  }
};

Categories.propTypes = {
  data: React.PropTypes.object,
};

// const BoundCategories = bindToItem(Categories);

class News extends Component {
  render () {
    return (
      <div>
        <div className="hero is-medium is-success is-bold">
          <div className="hero-head">
            <AuthNavbar />
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Island News
              </h1>
              <h2 className="subtitle">
                what's happening?
              </h2>
            </div>
          </div>
        </div>
        <BoundPostList label='News' firebaseRef='posts/news' />      
      </div>
    )
  }
}

class UnauthedPosts extends Component {
  constructor () {
    super()
    this.state = {
      'showForm': false
    }
  }

  showForm () {
    this.setState({showForm: true})
  }

  render () {
    let buttonOrForm
    if (this.state.showForm) {
      if (this.props.user) {
        buttonOrForm = (<Add/>)
      } else {
        buttonOrForm = (<div> you must log in </div>)
      }
    } else {
      buttonOrForm = (
        <button className="button is-large is-primary" style={{width: "100%"}} onClick={this.showForm.bind(this)}>
          <span className="icon">
            <i className="fa fa-plus"></i>
          </span>
          <span>add new entry</span>
        </button>
      )
    }

    return (
      <div>
        <div className="hero is-medium is-primary is-bold">
          <div className="hero-head">
            <AuthNavbar />
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                General Posts
              </h1>
              <h2 className="subtitle">
                keep the reader in mind, make their day.
              </h2>
            </div>
          </div>
        </div>
        <BoundPostList label='General Posts' firebaseRef='posts/general' />
        {buttonOrForm}
      </div>
    )
  }
}

export let Posts = authenticatedComponent(UnauthedPosts)

class Links extends Component {
  render () {
    return (
      <div>
        <div className="hero is-medium is-danger is-bold">
          <div className="hero-head">
            <AuthNavbar />
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Useful links
              </h1>
              <h2 className="subtitle">
                like Yahoo! used to be
              </h2>
            </div>
          </div>
        </div>
        <section className="section">
          <h1 className="title">
            Ferry Websites
          </h1>
          <h1 className="title">
            Tides Tables
          </h1>
          <h1 className="title">
            Community Websites
          </h1>
        </section>
      </div>
    )
  }
}


class Layout extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <div className="hero is-medium welcome-image">
          <div className="hero-head dark-background">
            <AuthNavbar />
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title home-title">
                Free, for sale or for trade, &amp; the <b style={{fontWeight: 700}}>best</b> ferry schedule
              </h1>
              <h2 className="subtitle  home-subtitle">
                Gambierites helping each other out
              </h2>
            </div>
          </div>
        </div>
        <section className="section is-medium">
          <div className="container">
            <div className="columns">
              <div className="column">
                <Link to="/ferry">
                  <div className="notification is-primary is-heavy">
                  <div className="title">
                    Ferry Schedules
                  </div>
                  </div>
                </Link>
              </div>
              <div className="column">
                <Link to="/posts">
                  <div className="notification is-info is-heavy">
                  <div className="title">
                  Postings
                  </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <Link to="/news">
                  <div className="notification is-success is-heavy">
                  <div className="title">
                    News
                  </div>
                  </div>
                </Link>
              </div>
              <div className="column">
                <Link to="/links">
                  <div className="notification is-danger is-heavy">
                  <div className="title">
                  Useful Links
                  </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="ferry" component={Ferry} />
          <Route path="nb-van" component={NB2Vancouver} />
          <Route path="van-nb" component={Vancouver2NB} />
          <Route path="news" component={News} />
          <Route path="posts" component={Posts} />
          <Route path="links" component={Links} />
          <Route path="add" component={Add} />
        </Route>
      </Router>
    );
  }
}

export default App;
