import React, { Component } from 'react';
import './App.css';
import 'classnames';
import './bulma.css';
import { bindToItem } from "firebase-3-react";
import {Router, Route, browserHistory, IndexRoute, Link } from "react-router";
import {Ferry, NB2Vancouver, Vancouver2NB} from "./Ferry";
import {AuthNavbar} from './authbar'
import {Add} from './add'

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
     if (! posts) {
      return (<div />)
     }  
     let items = Object.keys(posts).map((id: string) => {
       const post = posts[id];
       return <Post key={id} poster={post.poster} subject={post.subject} body={post.body} />
     });

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
      // return <Category key={id} label={category.label} items={category.items}></Category>;
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

class ForSale extends Component {
  render () {
    return (
      <div>
        <div className="hero is-medium is-primary is-bold">
          <div className="hero-head">
            <AuthNavbar />
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Stuff for sale
              </h1>
              <h2 className="subtitle">
                only the best
              </h2>
            </div>
          </div>
        </div>
        <BoundPostList label='For Sale' firebaseRef='posts/forsale' />
        <div className="level">
          <Link className="level-item has-text-centered button is-large is-primary" to="/add">
            <span className="icon">
              <i className="fa fa-plus"></i>
            </span>
            <span>Post new entry</span>
          </Link>
        </div>
      </div>
    )
  }
}


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
                Free, for sale or for trade, &amp; the <em>best</em> ferry schedule
              </h1>
              <h2 className="subtitle  home-subtitle">
                <i>Gambierites helping each other out</i>
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
                <Link to="/forsale">
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

            // <BoundCategories firebaseRef="sectionsMeta" />
            // <div className="control is-grouped">
            // <p className="control">
            //   <a className="button" href="/add">
            //     <span className="icon">
            //       <i className="fa fa-plus"></i>
            //     </span>
            //     <span> add post</span>
            //   </a>
            //   </p>
            // </div>

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
          <Route path="forsale" component={ForSale} />
          <Route path="links" component={Links} />
          <Route path="add" component={Add} />
        </Route>
      </Router>
    );
  }
}

export default App;
