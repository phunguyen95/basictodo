import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  GET_PROJECT,
  SEARCH_PROJECTS
} from '../actions/types';

const initialState = {
  projects: [],
  project: {},
  loading: false,
  searchProjects: []
};
const projectReducer = (state = initialState, action) => {
  //received action
  switch (action.type) {
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };

    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case SEARCH_PROJECTS:
      return {
        ...state,
        searchProjects: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default projectReducer;
