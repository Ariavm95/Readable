import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {GET_CATEGORIES, SET_CATEGORY} from '../Actions/Category'
import {GET_CATEGORY_POSTS, GET_ALL_POSTS, GET_POST_DETAILS, ADD_POST, VOTE_POST,UPDATE_POST,SET_SORT, SET_SORT_Direct,ADD_COMMENT,
  DELETE_COMMENT, GET_POST_COMMENTS, UPDATE_COMMENT, DELETE_POST_COMMENTS, VOTE_COMMENT, INCREMENT_COMMENTS,
  DECREMENT_COMMENTS} from '../load'


function listState (state = { category: 'All', sortType: 'recent', sortDirec:'Up', error: {} } , action) {

    switch (action.type) {
  
      case SET_CATEGORY:
        return { ...state, category:action.category }
  
       case SET_SORT_Direct:
        return  { ...state, sortDirec:action.sortDirect } 
        case SET_SORT:
        return  { ...state, sortType:action.sortType }
      default:
        return state
    } 
    
  }
  function posts(state = [], action) {
    switch (action.type) {
      case GET_CATEGORY_POSTS:
        return action.posts
      case GET_POST_DETAILS:
        return [action.posts]
      case GET_ALL_POSTS:
        return action.posts
      case ADD_POST:
      return [
        ...state,
        action.post
      ]
      case UPDATE_POST:
      return state.map((post) => post.id === action.postId
        ? {...post, title: action.title, body:action.body}
        : post)
      case VOTE_POST:
      return state.map(
         (post) => post.id === action.post.id ? action.post : post )

         case DECREMENT_COMMENTS:
         return state.map((post) => post.id === action.postId
           ?  {...post, commentCount: post.commentCount - 1}
           : post)
   
       case INCREMENT_COMMENTS:
         return state.map((post) => post.id === action.postId
           ?  {...post, commentCount: post.commentCount + 1}
           : post)
      default:
        return state
    } 
    
  }
function categories(state = [], action) {

    switch (action.type) {
  
      case GET_CATEGORIES:
        return [{name: 'All', path:'All'}].concat(action.categories.categories)
  
      default:
        return state
    } 
    
  }

  function comments(state = {}, action) {

    switch (action.type) {
  
      case ADD_COMMENT:
        const comment = action.comment
        const parentId = comment.parentId
        return {
          ...state,
          [parentId]: [
            ...state[parentId],
            comment
          ]
        }
  
      case DELETE_COMMENT:
        return {
          ...state,
          [action.parentId]: state[action.parentId].filter((comment) => comment.id !== action.commentId)
        }
  
      case GET_POST_COMMENTS:
        return {
          ...state,
          [action.postId]: action.comments
        }
  
      case UPDATE_COMMENT:
        return {
          ...state,
          [action.parentId]: state[action.parentId].map((comment) => comment.id === action.commentId
            ? {...comment,
              body:action.comment.body,
              timestamp: action.comment.timestamp}
            : comment)
        }
  
      case DELETE_POST_COMMENTS:
        const newState = Object.assign( {}, state)
        delete newState[action.postId]
        return newState
  
      case VOTE_COMMENT:
        return {
          ...state,
          [action.comment.parentId]: state[action.comment.parentId].map((comment) => comment.id === action.comment.id
            ? action.comment
            : comment)
        }
  
      default:
        return state
    }
  }



  export default combineReducers({posts,
    comments,
    categories,
    listState,
    })