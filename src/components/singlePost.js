import React, { Component } from 'react';
import CategorySidebar from './CategorySidebar'
import { connect } from 'react-redux'
import {getPost} from '../load'
import FullPost from './FullPost'


class singlePost extends Component {
  constructor(props) {
    super(props);
    
    const testPost = props.posts.filter((post) => post.id === props.match.params.postId)
   
    if(testPost.length === 0){
      this.props.getpost(this.props.match.params.postId)
    }
    else{
      this.state = {
          post: testPost[0]}

      }
    }
  componentDidMount(){
    
  }
  render() {
    //this.props.match.params.category ? this.props.setCat(this.props.match.params.category) : this.props.setCat('All')
    const { posts } = this.props
    var tempPost = {}
    if(this.state){
      tempPost = Object.assign({}, this.state.post)
      
    }
    else{
      tempPost = posts[0] || {}
    }
    
    return (
    <div>
      <div className="sidebar">
          <CategorySidebar/>
      </div>
      {((tempPost) && (tempPost.id === this.props.match.params.postId)) && <FullPost post={tempPost}/>}

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