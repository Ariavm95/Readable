import React, { Component } from 'react';
import { connect } from 'react-redux'
import {editComment} from '../load'
import { Redirect } from 'react-router'


class EditComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false
          }
        const parentId = this.props.match.params.postId
        const commentId = this.props.match.params.commentId
        const {allComments} = this.props
        const comment = allComments[parentId].filter((comment) => comment.id === commentId)
        this.state.body  = comment[0].body;
          this.handleBodyChange = this.handleBodyChange.bind(this);
          this.submitForm = this.submitForm.bind(this);
    }
    handleBodyChange= function(e) {
        console.log("helloooo")
        this.setState({body: e.target.value});
     }

     submitForm = (e) => {
        e.preventDefault()
        const parentId = this.props.match.params.postId
        const commentId = this.props.match.params.commentId
        const {allComments} = this.props
        const comments = allComments[parentId].filter((comment) => comment.id === commentId)
        const comment = {...comments[0], body: this.state.body}
        this.props.updateComment(comment)
        this.setState({ fireRedirect: true })
      }

    render() {
        const parentId = this.props.match.params.postId
        const commentId = this.props.match.params.commentId
        const {allComments} = this.props
        const comment = allComments[parentId].filter((comment) => comment.id === commentId)
        const { fireRedirect } = this.state
        return(
            <div>
                <form className="add-edit-form needs-validation" onSubmit={this.submitForm}>                 
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label">Comment:</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"  
                            value={this.state.body } onChange={this.handleBodyChange} required></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary" >Submit</button>
                </form>
                {fireRedirect && (
                <Redirect to={`/${this.props.currentCategory}/${parentId}`}/>
                )}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      allComments: state.comments,
      currentCategory: state.listState.category
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        updateComment: (comment) => {dispatch(editComment(comment))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)