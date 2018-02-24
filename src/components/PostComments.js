import React, { Component } from 'react';
import {  loadPostComments} from '../load'
import { connect } from 'react-redux'
import Comment from './Comment'

class PostComments extends Component{
    componentDidMount(){
        
    }
    render(){
        const {comments, postId} = this.props
        const sortedComments = comments.sort((a, b) => (b.voteScore-a.voteScore))
        return(
            <div>
                {sortedComments.map((sinhgleComment, index) => (
                    <Comment key={sinhgleComment.id} comment={sinhgleComment}/>
                ))}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadComment: (id) => {dispatch(loadPostComments(id))}

    }
  }
export default connect(null,mapDispatchToProps)(PostComments)
