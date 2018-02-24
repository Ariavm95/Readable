import React, { Component } from 'react';
import singlePost from './components/singlePost'
import './App.css';
import CategoryView from './components/CategoryView'
import { Switch, Route } from 'react-router'
import EditPost from './components/EditPost'
import AddPost from './components/AddPost'
import AddComment from './components/AddComment'
import EditComment from './components/EditComment'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={CategoryView}/>
        <Route exact path="/addpost" component={AddPost}/>
        <Route exact path="/:postId/addcomment" render={props => <AddComment {...props} />}/>
        <Route exact path="/:postId/:commentId/editcomment" component={EditComment}/>
        <Route exact path="/:category" render={props => <CategoryView {...props} />}/>
        <Route exact path="/:category/:postId" component={singlePost}/>
        <Route exact path="/:category/:postId/edit" component={EditPost}/>
        
    
        
      </Switch>


    );
  }
}


export default App
