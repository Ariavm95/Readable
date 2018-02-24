export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

function categories(state = [], action) {

    switch (action.type) {
  
      case GET_CATEGORIES:
        return [{name: 'all', path:'all'}].concat(action.categories.categories)
    
      default:
        return state
    }
  }

  export default categories