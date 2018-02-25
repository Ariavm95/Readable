import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendPostVote, sendCommentVote} from '../load'

class VoteBar extends Component {
  constructor(props){
    super(props)
    
  }

 

  render() {
    const {post} = this.props
  
    const voteup= () => {(post.parentId) ? this.props.commentVoting(post, "upVote")  :  this.props.postVoting(id, "upVote")}
    const votedown= () => {(post.parentId) ? this.props.commentVoting(post, "downVote") : this.props.postVoting(id, "downVote")}
    const id = post.id

    return (
     <div className="post-sidebar">
      <div className="voting">
        <div className="up icon" onClick={voteup}>
        </div>
        <div className="vote icon">{post.voteScore}</div>
        <div className="down icon" onClick={votedown}>

        </div>
      </div>
    </div>


    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postVoting: (postId, vote) => dispatch(sendPostVote(postId, vote)),
    commentVoting: (postId, vote) => dispatch(sendCommentVote(postId, vote))

  }
}


export default connect(
  null,
  mapDispatchToProps
)(VoteBar)
