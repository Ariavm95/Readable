import React, { Component } from 'react';
import VoteBar from '../components/VoteBar'
import { Link } from 'react-router-dom'
import { loadCategories, setCategory, removePost} from '../load'
import { connect } from 'react-redux'
import {loadPosts} from '../load'
import formatDate from '../Helper/dateFormat'


class ShortPost extends Component {

state = {}
constructor(props){
    super(props)
    this.removePost = this.removePost.bind(this)
}
componentDidMount() {
   
    this.props.loadCats();
    this.props.loadPo(this.props.currentCategory)   

}
componentWillReceiveProps() {
    const newCat = window.location.pathname !== '/'? window.location.pathname.slice(1) : 'All'
    const oldCat = this.props.currentCategory
    if(newCat !== oldCat) {
      this.props.set_cat(newCat)
      this.props.loadPo(newCat)
    }
  }
  removePost = (id,e)=>{
    e.preventDefault()
    this.props.deletePost(id)
    this.props.loadPo(this.state.currentCategory)
}

render() {
    
    const { sort, posts } = this.props

    const sortPosts = () => {
        switch (sort) {
          case "votesUp" :
              return posts.sort((a, b) => (b.voteScore-a.voteScore))

          case "votesDown" :
              return posts.sort((a, b) => (a.voteScore-b.voteScore))

          case "recentUp" :
              return posts.sort((a, b) => (b.timestamp-a.timestamp))

          case "recentDown" :
              return posts.sort((a, b) => (a.timestamp-b.timestamp))

            case "titleUp" :
            posts.sort((a, b) => {
                const aTitle=a.title.toLowerCase(), bTitle=b.title.toLowerCase()
                if (aTitle < bTitle)
                    return -1
                if (aTitle > bTitle)
                    return 1
                return 0
            })
            return posts

          case "titleDown" :
            posts.sort((a, b) => {
             const aTitle=a.title.toLowerCase(), bTitle=b.title.toLowerCase()
             if (aTitle < bTitle)
                 return 1
             if (aTitle > bTitle)
                 return -1
             return 0
            })
            return posts

          default :
            return posts

        }
      }


    return (
    <div>
    {posts.length > 0 ?
        sortPosts().map((po,index)=> (
            <article className="post" key={po+index}>
                <VoteBar post={po}/>
                <div className="post-main" >
                
                    <Link to={`${po.category}/${po.id}`} className="post-link">
                        <div className="category">{`Category: ${po.category}`}</div>
                        <h3 className="post-title">{po.title} </h3>
                        <div className="post-summary-meta">
                            <div className="author">{`Author: ${po.author}`}</div>
                            <div className="timestamp">{formatDate(po.timestamp)}</div>
                            <div className="comments-short">{`Comments: ${po.commentCount}`}</div>
                            <div className="edit-delete">
                                    <button className="ico  edit-delete-button" onClick={(e) => { this.removePost(po.id,e); return false}} ><i className="fa fa-trash"></i></button>
                                    <Link to={`/${po.category}/${po.id}/edit`} className="ico  edit-delete-button" ><i className="fa fa-pencil"></i>  </Link>
                            </div>
                        </div>
                    </Link>
                  
            </div> </article>))
              : <div> <h3>No post to show in this Category </h3></div>
    }

    </div>
    );
  }

}
const mapDispatchToProps = (dispatch) => {
    return {
      loadCats: () => dispatch(loadCategories()),
      loadPo: (category) => dispatch (loadPosts(category)),
      set_cat: (current) => dispatch(setCategory(current)),
      deletePost: (postId) => {dispatch(removePost(postId))}
    }
}
const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      currentCategory: state.listState.category,
      posts: state.posts,
      sort: state.listState.sortType+state.listState.sortDirec
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(ShortPost)