import React from 'react';
import firebase from 'firebase'
import moment from 'moment'
import {authenticatedComponent} from './firebaseUtils.js'

class _Post extends React.Component {
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

_Post.propTypes = {
  post: React.PropTypes.object.isRequired,
  firebaseref: React.PropTypes.string.isRequired,
};

export let Post = authenticatedComponent(_Post)
