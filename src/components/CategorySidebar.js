import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {loadCategories, setSort, setSort_Direct} from '../load'
import { connect } from 'react-redux'


class CategorySidebar extends Component {
  constructor(props){
      super(props)
      this.handleOptionChange = this.handleOptionChange.bind(this)
      this.handleOptionChange_direct = this.handleOptionChange_direct.bind(this)
  }
 
  /* state = {
    categories: [],
   
  

  } */
  componentDidMount() {
    if(this.props.categories[0] === undefined){
      this.props.loadCats();
    }
  }
  
  handleOptionChange= function (changeEvent) {
    
    this.props.set_sort(changeEvent.target.value) 
   
  }

  handleOptionChange_direct = function(changeEvent){
    
    this.props.set_sort_direct(changeEvent.target.value) 

  }
  render() {

    const { categories, currentCategory } = this.props

    return (
     <div class="sidebar">
 

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/All">Category</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {categories.map((cat, index) =>  (<li key={cat.name} className={cat.name === this.props.currentCategory ? "nav-item active" :"nav-item" }> <Link to={`/${cat.path}`} className="nav-link" >{cat.name}</Link>
              </li>))}
              </ul>
            <form>
            <div className="btn-group btn-group-toggle my-2 my-lg-0"  >
            <label className="btn  btn-secondary disabled" id="label-btn">
              Order by:
              </label>
              <label className={(this.props.sorttype === 'votes') ? `btn btn-secondary active` :`btn btn-secondary`}>
                <input type="radio" name="options" id="option1" value='votes'  checked={this.props.sorttype === 'votes'} 
                      onChange={this.handleOptionChange} /> Rate
              </label>
              <label className={(this.props.sorttype === 'recent') ? `btn btn-secondary active` :`btn btn-secondary`}>
                <input type="radio" name="options" id="option2"  value='recent' checked={this.props.sorttype === 'recent'} 
                      onChange={this.handleOptionChange}  /> Recent
              </label>
              <label className={(this.props.sorttype === 'title') ? `btn btn-secondary active` :`btn btn-secondary`}>
                <input type="radio" name="options" id="option3" value='title' checked={this.props.sorttype === 'title'} 
                      onChange={this.handleOptionChange} /> Title
              </label>
            </div>
            </form>
            <form className="arrow">
              <div className="btn-group btn-group-toggle my-2 my-lg-0"  >
              <label className={(this.props.sortDirection === 'Up') ? `btn btn-secondary active arrowup` :`btn btn-secondary arrowup`}>
                <input type="radio" name="options" id="option3" value='Up' checked={this.props.sortDirection === 'Up'} 
                      onChange={this.handleOptionChange_direct} />⬆︎
              </label>

              <label className={(this.props.sortDirection === 'Down') ? `btn btn-secondary active arrowdown` :`btn btn-secondary arrowdown`}>
                <input type="radio" name="options" id="option3" value='Down' checked={this.props.sortDirection === 'Down'} 
                      onChange={this.handleOptionChange_direct} />⬇︎
              </label>
              </div>
            </form>

          </div>
        </nav>
    </div>


    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadCats: () => dispatch(loadCategories()),
    set_sort: (sort) => dispatch(setSort(sort)),
    set_sort_direct: (sort) => dispatch(setSort_Direct(sort))
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    currentCategory: state.listState.category,
    sorttype: state.listState.sortType,
    sortDirection: state.listState.sortDirec
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CategorySidebar)