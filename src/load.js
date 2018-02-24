export const GET_CATEGORIES = 'GET_CATEGORIES'
export const DELETE_POST = 'DELETE_POST'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_POST_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_POST_COMMENTS = 'DELETE_POST_COMMENTS'
export const VOTE_POST = 'VOTE_POST'
export const SET_SORT = 'SET_SORT'
export const SET_SORT_Direct = 'SET_SORT_Direct'
export const SET_CATEGORY = 'SET_CATEGORY'
export const VOTE_COMMENT = "VOTE_COMMENT"
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const INCREMENT_COMMENTS = 'INCREMENT_COMMENTS'
export const DECREMENT_COMMENTS = 'DECREMENT_COMMENTS'

// API params
const api = "http://localhost:3003/"
const headers = {
  'Authorization': "myToken000",
  'Content-Type': 'application/json'
}

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category
  }
}
export const loadPostComments = (postId) => {
    return dispatch => {
        fetch(`${api}posts/${postId}/comments`, {headers})
        .then(res => {
          if (!res.ok) {
            throw res
          } else  return res.json()
        })
        .then(comments => dispatch(getPostComments(postId, comments)))
        .catch( error => showError(error));
    }
  }

  export const loadCategories = () =>  {
    return dispatch =>{
      fetch(`${ api }categories`, {headers})
        .then(res => {
          if (!res.ok) {
            throw res
          } else  return res.json()
        })
      .then(categories => {dispatch(getCategories(categories)); console.log(categories)})
      .catch( error => showError(error));

    }
   }
   const getCategoryPosts = (posts) => {
    return {
      type: GET_CATEGORY_POSTS,
      posts
    }
  }

   export const loadPosts = (category) => {
    if (!category || category === 'All') {
      return dispatch => {
        fetch(`${ api }posts`, {headers})
          .then(res => {
            if (!res.ok) {
              throw res
            } else  return res.json()
          })
          .then(posts => dispatch(getAllPosts(posts)))
          .catch( error => showError(error));
      }
    } else {
    return dispatch => {
      fetch(`${ api }${ category}/posts`, {headers})
        .then(res => {
          if (!res.ok) {
            throw res
          } else  return res.json()
        })
        .then(posts => dispatch(getCategoryPosts(posts)))
        .catch( error => showError(error));
    }
  }}

  export const loadAllPosts = () => {
    return dispatch => {
      fetch(`${ api }posts`, {headers})
        .then(res => {
          if (!res.ok) {
            throw res
          } else  return res.json()
        })
        .then(posts => dispatch(getAllPosts(posts)))
        .catch( error => showError(error));
    }
  }
  export const getPost = (postId) => {
    return dispatch => {
      fetch(`${api}posts/${postId}`, {headers})
        .then(res => {
          if (!res.ok) {
            throw res
          } else  return res.json()
        })
      .then(post => dispatch(getPostDetails(post)))
      .catch( error => showError(error));
    }
  }

  export const editComment = (comment) => {
    const parentId = comment.parentId
    const commentId = comment.id
    return dispatch => {
    fetch(`${api}comments/${commentId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        body: comment.body,
        timestamp: comment.timestamp,
       }),
    })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(comment => dispatch(updateComment(comment, commentId, parentId )))
    .catch( error => showError(error));
    }
  }

  export const editPost = (post) => {
    const postId = post.id
    return dispatch => {
    fetch(`${api}posts/${post.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        title: post.title,
        timestamp: post.timestamp,
        body: post.body
       }),
    })
    .then(res => {
      if (!res.ok) {
        throw res
      } else {
        return res.json()
      }
    })
    .then(post => dispatch(updatePost(post.body, post.title, postId)))
    .catch( error => showError(error));
    }
  }
  const getCategories = (categories) => {
    return {
      type: GET_CATEGORIES,
      categories
    }
  }
  const getPostComments = (postId, comments)  => {
    return {
      type: GET_POST_COMMENTS,
      postId,
      comments
    }
  }
  const showError = (error) =>
  console.log('fetch failed: ' , error.statusText);

  const getAllPosts = (posts) => {
    return {
      type: GET_ALL_POSTS,
      posts
    }
  }
  // load post details
const getPostDetails = (posts) => {
    return {
      type: GET_POST_DETAILS,
      posts
    }
  }
  // used for editing posts
const updatePost = (body, title, postId) => {
    return {
      type: UPDATE_POST,
      body, title, postId
    }
  }

  const updateComment = (comment, commentId, parentId) => {
    return {
      type: UPDATE_COMMENT,
      comment,
      commentId,
      parentId
    }
  }

  export const addPostData = (post) => {
    return dispatch => {
    fetch(`${api}posts`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        commentCount: post.commentCount
       }),
    })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(post => dispatch(addPost(post)))
    .catch( error => showError(error));
    }
  }
  const addPost = (post) => {
    return {
      type: ADD_POST,
      post
    }
  }
  

  


  export const sendPostVote = (postId, vote) => {
    return dispatch => {
     fetch(`${ api}posts/${postId}`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            option: vote
          })
        })
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(post => dispatch(votePost(post)))
      .catch( error => showError(error));
    }
  }
  const votePost = (post) => {
    return {
      type: VOTE_POST,
      post
    }
  }
  export const setSort = (sortType) => {
    return {
      type: SET_SORT,
      sortType
    }
  }
  export const setSort_Direct = (sortDirect) => {
    return {
      type: SET_SORT_Direct,
      sortDirect
    }
  }
  
  const voteComment = (comment) => {
    return {
      type: VOTE_COMMENT,
      comment
    }
  }
  
  export const sendCommentVote = (comment, vote) => {
    return dispatch => {
     fetch(`${ api}comments/${comment.id}`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            option: vote
          })
        })
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(comment => dispatch(voteComment(comment)))
      .catch( error => showError(error));
    }
  }

  export const sendComment = (comment) => {
    return dispatch => {
    fetch(`${api}comments`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
       }),
    })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(comment => dispatch(addComment(comment)))
    .then(() => dispatch(incrementComments(comment.parentId)))
    .catch( error => showError(error));
    }
  }
  const addComment =(comment) =>{
    return {
      type: ADD_COMMENT,
      comment
    }
  }
  
  const incrementComments =(postId) =>{
    return {
      type: INCREMENT_COMMENTS,
      postId
    }
  }
  //delete stuff
  const deletePost = (postId) => {
    return {
      type: DELETE_POST,
      postId
    }
  }
  
  const deletePostComments = (postId) => {
    return {
      type: DELETE_POST_COMMENTS,
      postId
    }
  }
  export const removePost = (postId) => {

    return dispatch => {
      fetch(`${api}posts/${postId}`, {
        method: 'DELETE',
        headers: headers
      })
    .then(res => {
      if (!res.ok) {
        throw res
      } else return
    })
    .then(() => dispatch(deletePost(postId)))
    .then(() => dispatch(deletePostComments(postId)))
    .catch( error => showError(error));
    }
  }
  export const destroyPost = (postId) => {
  
    return dispatch => {
      fetch(`${api}posts/${postId}`, {
        method: 'DELETE',
        headers: headers
      })
    .then(res => {
      if (!res.ok) {
        throw res
      } else return
    })
    .then(() => dispatch(deletePost(postId)))
    .then(() => dispatch(deletePostComments(postId)))
    .catch( error => showError(error));
    }
  }
  
  const deleteComment = (commentId, parentId) => {
    return {
      type: DELETE_COMMENT,
      commentId,
      parentId
    }
  }
  
  const decrementComments =(postId) =>{
    return {
      type: DECREMENT_COMMENTS,
      postId
    }
  }
  
  export const destroyComment = (comment) => {
    return dispatch => {
      fetch(`${api}comments/${comment.id}`, {
        method: 'DELETE',
        headers: headers
    })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return
    })
    .then(() => dispatch(deleteComment(comment.id, comment.parentId)))
    .then(() => dispatch(decrementComments(comment.parentId)))
    .catch( error => showError(error));
    }
  }
