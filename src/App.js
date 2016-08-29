import React, { Component } from 'react';
import './App.css';
import 'classnames';
import './bulma.css';
import {Router, Route, browserHistory, IndexRoute, Link } from "react-router";
import {Ferry, NB2Vancouver, Vancouver2NB} from "./Ferry";
import {AuthNavbar} from './authbar'
import Footer from './Footer'
import {News, Posts} from './Posts'

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js');
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

class ToS extends Component {
  render () {
    return (
      <div>
        <nav className="nav">
          <div className="nav-left">
            <Link to="/" className="nav-item title is-3 is-brand is-hidden-touch">
              Gambier Island Trader
            </Link>
            <Link to="/" className="nav-item title is-5 is-brand is-hidden-desktop">
              Gambier Island Trader
            </Link>
          </div>
        </nav>
        <section className="section">
          <h1 className="title">
            Terms of Service
          </h1>
          <p>Be nice to each other please.</p>
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
        <Footer />
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
          <Route path="tos" component={ToS} />
        </Route>
      </Router>
    );
  }
}

export default App;
