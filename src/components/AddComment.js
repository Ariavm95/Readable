import React, { Component } from 'react';
import { sendComment} from '../load'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false
        }
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.add = this.add.bind(this);
    
    }
    
    handleCommentChange= function(e) {
        this.setState({comment: e.target.value});
     }
     handleAuthorChange= function(e) {
        this.setState({author: e.target.value});
     }
     add = function(e) {
        e.preventDefault()
       const uuid = require('uuid/v1');
       
         const post={
             id: uuid(),
           
           body: this.state.comment,
           timestamp: Date.now(),
           author: this.state.author,
           parentId: this.props.match.params.postId,
           voteScore: 0
           

         }
         this.props.addAComment(post)
         const url = window.location.host
         //console.log("URL "+url)
         this.setState({ fireRedirect: true })

     }

    render(){
        
        const { fireRedirect } = this.state
        return(
            <div>
                <form className="add-edit-form" onSubmit={this.add}>
                   
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label">Comment:</label>
                        <div className="col-sm-10">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.comment} onChange={this.handleCommentChange} required></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label">Author:</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputEmail3" value={this.state.author} onChange={this.handleAuthorChange} required/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary" >Submit</button>
                </form>
                {fireRedirect && (
                <Redirect to={`/${this.props.currentCategory}/${this.props.match.params.postId}`}/>
            )}
            </div>
        );
    }

}
const mapStateToProp = (state) => {
    return {
        currentCategory: state.listState.category
    }
}
const mapDispatchToProp = (dispatch) => {
    return {
      
      addAComment: (comment) => dispatch(sendComment(comment))
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(AddComment)