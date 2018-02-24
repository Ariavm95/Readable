import React, { Component } from 'react';
import CategorySidebar from './CategorySidebar'
import { connect } from 'react-redux'
import {getPost} from '../load'
import FullPost from './FullPost'


class singlePost extends Component {
  componentDidMount(){
    this.props.getpost(this.props.match.params.postId)
  }
  render() {
    //this.props.match.params.category ? this.props.setCat(this.props.match.params.category) : this.props.setCat('All')
    const { posts } = this.props
    const post = posts[0] || {}
    
    return (
    <div>
      <div className="sidebar">
          <CategorySidebar/>
      </div>
          <FullPost post={post}/>

    </div>


    );
  }
}
const mapStateToProps = (state) => {
    return {
      posts: state.posts
    }
  }
const mapDispatchToProps = (dispatch) => {
  return {
    getpost: (id) => dispatch(getPost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singlePost)