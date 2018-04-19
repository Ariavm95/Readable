import React, { Component } from 'react';
import CategorySidebar from './CategorySidebar'
import { connect } from 'react-redux'
import {setCategory} from '../load'
import { Link } from 'react-router-dom'
import ShortPost from './ShortPost'

class CategoryView extends Component {
  
  render() {
    this.props.match.params.category ? this.props.setCat(this.props.match.params.category) : this.props.setCat('All')
    return (
    <div>
      <div>
          <CategorySidebar/>
      </div>
      <Link to="/addpost" className="btn btn-secondary btn-block add-post"> Compose Post</Link>
      <div class="container-fluid">
        <section className="posts-display">
          <ShortPost/>
        </section>
      </div>
    </div>

    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCat: (selected) => dispatch(setCategory(selected))
  }
}

export default connect(null, mapDispatchToProps)(CategoryView)