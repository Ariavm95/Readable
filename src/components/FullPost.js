import React, { Component } from 'react';
import VoteBar from '../components/VoteBar'
import { Link } from 'react-router-dom'
import {  loadPostComments, removePost} from '../load'
import { connect } from 'react-redux'
import formatDate from '../Helper/dateFormat'
import PostComments from './PostComments'
import { Redirect } from 'react-router'

class FullPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            fireRedirect: false

          }

    }
    componentDidMount(){
        this.props.loadComment(this.props.post.id)
    }
     componentWillReceiveProps(next){
        if(this.props.post.id !== next.post.id){
            this.props.loadComment(next.post.id)
        }
    }
    removePost = (e)=>{
        e.preventDefault()
        this.props.deletePost(this.props.post.id)
        this.setState({ fireRedirect: true })
    }

    render() {
        const po = this.props.post
        const {allComments} = this.props
        const comments = allComments[po.id] || []
        const { fireRedirect } = this.state
  
        return(
            <div>
            {fireRedirect && (
                <Redirect to={`/${po.category}`}/>
            )}
                <Link to={`/${po.id}/addcomment`} className="btn btn-secondary btn-block add-post"> Add Comment</Link>
                <section className="posts-display">
                    <article className="post">
                        <VoteBar post={po}/>
                        <div className="post-main" >
                                 <div  className="post-link ">
                                    <div className="category">{`Category: ${po.category}`}</div>
                                        <h3 className="post-title">{po.title} </h3>
                                        <div className="post-body">{po.body}</div>
                                        <div className="post-meta">
                                            <div className="author">{`Author: ${po.author}`}</div>
                                            <div className="timestamp">{formatDate(po.timestamp)}</div>
                                            <div className="comments-short">{`Comments: ${po.commentCount}`}</div>
                                            <div className="edit-delete">
                                                <button className="ico  edit-delete-button" onClick={this.removePost} ><i className="fa fa-trash"></i></button>
                                                <Link to={`/${po.category}/${po.id}/edit`} className="ico  edit-delete-button" ><i className="fa fa-pencil"></i>  </Link>
                                            </div>
                                        </div>
                                </div> 
                        </div> 
                    </article>
                    <div className="comments-list" >
                        <PostComments postId={po.id} comments={comments} />
                    </div>
                </section>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        allComments: state.comments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadComment: (id) => {dispatch(loadPostComments(id))},
        deletePost: (postId) => {dispatch(removePost(postId))}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(FullPost)