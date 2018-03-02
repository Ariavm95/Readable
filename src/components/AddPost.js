import React, { Component } from 'react';
import {loadCategories, addPostData} from '../load'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class AddPost extends Component {
    constructor(props) {
        super(props);
        if(!this.props.categories[0]){
            this.props.loadCats()
        }
        this.state = {
            fireRedirect: false,
            //category: this.props.categories[1].name
          }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        this.props.loadCats();
        
      }

    handleTitleChange= function(e) {
        this.setState({title: e.target.value});
     }
     handleBodyChange= function(e) {
        this.setState({body: e.target.value});
     }
     handleAuthorChange= function(e) {
        this.setState({author: e.target.value});
     }
     handleCatChange= function(e) {
        this.setState({category: e.target.value});
     }
     add = function(e) {
         e.preventDefault()
        const uuid = require('uuid/v1');
          const post={
              id: uuid(),
            title: this.state.title,
            body: this.state.body,
            timestamp: Date.now(),
            author: this.state.author,
            category: this.state.category,
            voteScore: 0,
            commentCount: 0,

          }
          this.props.addAPost(post)
          const url = window.location.host
          
         this.setState({ fireRedirect: true })

      }
    render() {
        const { fireRedirect } = this.state
        if((this.props.categories[1] !== undefined) && !(this.state.first)){
            this.setState({ category: this.props.categories[1].name, first: true })
        }
      
      return (
         <div>
            {(this.props.categories[1] !== undefined) &&
            <form className="add-edit-form needs-validation" onSubmit={this.add}>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Title:</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control"  id="inputEmail3" value={this.state.title} onChange={this.handleTitleChange} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Body:</label>
                    <div className="col-sm-10">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.body} onChange={this.handleBodyChange} required></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Author:</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" value={this.state.author} onChange={this.handleAuthorChange} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Category:</label>
                    <div className="col-sm-3">
                    <select className="custom-select lg-2" id="inputGroupSelect01" value={this.state.category} onChange={this.handleCatChange} required>
                        
                        {this.props.categories.map((cat,index) => ((index !== 0) && (<option key={`1${cat.name}`} value={cat.name}>{cat.name}</option>)))}
                       
                    </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-secondary">Submit</button>

            </form>}
            {fireRedirect && (
                <Redirect to={'/'}/>
            )}
        </div>
      );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      loadCats: () => dispatch(loadCategories()),
      addAPost: (post) => dispatch(addPostData(post))
    }
  }
  const mapStateToProps = (state) => {
    return {
      categories: state.categories,
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(AddPost)
