import React, { Component } from 'react';
import PropTypes from 'prop-types'
import EditPostContent from './EditPostContent'
import { connect } from 'react-redux'

import { reset } from 'redux-form'
import Modal from 'react-modal'
import {editPost} from '../load'

class EditPostModal extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }
  componentWillMount() {
    Modal.setAppElement('body');
 }

  state = {
    modalOpen: false
  }

    openModal = () => this.setState(() => ({ modalOpen: true }))
  closeModal = () => this.setState(() => ({ modalOpen: false }))

  editPost = (post) => {
    const updatedPost = {
      id: post.id,
      timestamp: Date.now(), //update with edit time
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      commentCount: post.commentCount
    }

    this.props.updatePost(updatedPost)
    this.props.resetPostForm()
    this.closeModal()
  }

  //deletePost =(postId) => this.props.destroyPost(postId)

  render() {
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    const {post} = this.props
    const { modalOpen } = this.state
    console.log(modalOpen)

    return (
      <div className="post-changes"> 
        <Modal
          
          
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <div className="close-click" onClick={this.closeModal}>X</div>
          {modalOpen && <EditPostContent
            initialValues={post}
            onSubmit={this.editPost} />}
        </Modal>
        
        <div  onClick={this.openModal}>Edit</div>
        
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(editPost(post)),
    resetPostForm: () => dispatch(reset('postForm')),
    
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EditPostModal)
