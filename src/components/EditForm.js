import React, { Component } from 'react';
import { connect } from 'react-redux'
import { editPost} from '../load'
import { Redirect } from 'react-router'

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            title: this.props.post.title,
            body: this.props.post.body
          }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        
    }
    handleTitleChange= function(e) {
        this.setState({title: e.target.value});
     }
     handleBodyChange= function(e) {
        this.setState({body: e.target.value});
     }
     submitForm = (e) => {
        e.preventDefault()
        const po = this.props.post;
        const post = {...po, title : this.state.title, body: this.state.body, timestamp: Date.now()}
        this.props.edit(post)

        this.setState({ fireRedirect: true })
      }
      
  
  render() {
    const po = this.props.post;
    const { fireRedirect } = this.state

   
    
    //this.props.match.params.category ? this.props.setCat(this.props.match.params.category) : this.props.setCat('All')
    
    return (
    <div>
    
        <form onSubmit={this.submitForm}>
            <div className="form-group row" >
                <label  className="col-sm-2 col-form-label">Title:</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail3"  value={this.state.title } onChange={this.handleTitleChange} required/>
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Body:</label>
                <div className="col-sm-10">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"  value={this.state.body } onChange={this.handleBodyChange} required></textarea>
                </div>
            </div>
            <button type="submit" className="btn btn-secondary" >Submit</button>

        </form>
        {fireRedirect && (
          <Redirect to={`/${this.props.currentCategory}/${po.id}`}/>
        )}
    </div>


    );
  }
}
const mapStateToProps = (state) => {
    return {
        currentCategory: state.listState.category
    }
  }
const mapDispatchToProps = (dispatch) => {
  return {
    edit: (post) => {dispatch(editPost(post))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)