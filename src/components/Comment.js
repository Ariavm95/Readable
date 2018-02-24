import React, { Component } from 'react';
import { loadPostComments, destroyComment} from '../load'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import VoteBar from './VoteBar';
import formatDate from '../Helper/dateFormat'



class Comment extends Component{
    deletePost = () => {
        this.props.removeComment(this.props.comment)
    }
render(){
 const {comment} = this.props
 
    return(
        <article className="post">
                <VoteBar post={comment}/>
                <div className="post-main" >
                    <div  className="post-link">

                            <div className="post-body">{comment.body}</div>
                            <div className="post-meta">
                                <div className="author">{`Author: ${comment.author}`}</div>
                                <div className="timestamp">{formatDate(comment.timestamp)}</div>
                                <div className="edit-delete">
                                     <button className="ico edit-delete-button" onClick={this.deletePost} ><i className="fa fa-trash"></i></button>
                                    <Link to={`/${comment.parentId}/${comment.id}/editcomment`} className="ico edit-delete-button" ><i className="fa fa-pencil"></i>  </Link>

                                </div>
                            </div>
                    </div>
                </div>
        </article>
    );
}
}
const mapDispatchToProps = (dispatch) => {
    return {
        getComment: (id) => {dispatch(loadPostComments(id))},
        removeComment: (commment) => {dispatch(destroyComment(commment))}
    }
}
export default connect(null, mapDispatchToProps)(Comment)