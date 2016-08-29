import React from 'react'
import { bindToItem } from "firebase-3-react"
import { Post } from './Post'
import { AuthNavbar } from './authbar'
import { authenticatedComponent } from './firebaseUtils.js'
import { Add } from './add'
import Footer from './Footer'

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

export class News extends React.Component {
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
        <Footer />
      </div>
    )
  }
}

class _Posts extends React.Component {
  showForm () {
    this.setState({showForm: true})
  }

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
                General Posts
              </h1>
              <h2 className="subtitle">
                keep the reader in mind, make their day.
              </h2>
            </div>
          </div>
        </div>
        <BoundPostList label='General Posts' firebaseRef='posts/general' />
        <Add />
        <Footer />
      </div>
    )
  }
}

export let Posts = authenticatedComponent(_Posts)
