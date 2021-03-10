import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentPageNumber: 1,
  isLoading : true
};

const blogs = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    blogs: action.blogs,
  });
};

const blog = (state, action) => {
    return updateObject(state, {
      isLoading: false,
      blog: action.blog,
    });
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PAGE:
      return {
        currentPageNumber: action.currentPageNumber,
      };
    case actionTypes.BLOG_LIST:
      return blogs(state, action);
    case actionTypes.BLOG_BY_ID:
        return blog(state, action);
    default:
      return state;
  }
};

export default reducer;
