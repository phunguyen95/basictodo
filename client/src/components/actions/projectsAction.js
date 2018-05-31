import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  GET_PROJECT,
  SEARCH_PROJECTS
} from './types';
import { userDetails } from '../config/keys';
import axios from 'axios';
export const getProjects = () => {
  return dispatch => {
        //Set loading to true when we send the request to the api from action, then if the request succeed, the loading will be set to false in auth reducer

    dispatch(setLoading());
    axios
      .get(
        `https://api.proworkflow.net/projects/?apikey=${userDetails.apikey}`,
        {
          auth: {
            username: `${userDetails.username}`,
            password: `${userDetails.password}`
          }
        }
      )
      .then(result => {
        //send the response result to the reducer 
        dispatch({
          type: GET_PROJECTS,
          payload: result.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_PROJECTS,
          payload: null
        });
      });
  };
};
export const searchProjects = search => {
  return dispatch => {
    dispatch(setLoading());
    axios
      .get(
        `https://api.proworkflow.net/projects/?apikey=${userDetails.apikey}`,
        {
          auth: {
            username: `${userDetails.username}`,
            password: `${userDetails.password}`
          }
        }
      )
      .then(result => {
        if (result.data.projects) {
            
          let newArray = result.data.projects;
          //filter the array, check whether the array include the search query by id 
          let newArrayById = newArray.filter(list =>
            list.id.toString().includes(search)
          );
          //filter the array, check whether the array includes the search query by name
          let newArrayByName = newArray.filter(list =>
            list.title.toString().includes(search)
          );
          //if newArrayById exists
          if (newArrayById.length > 0) {
          dispatch({
            type: SEARCH_PROJECTS,
            payload: newArrayById
          });
         }
         //if newArrayById doesnt have any result, then we keep checking on newArrayByName
         else if (newArrayByName.length > 0) {
            dispatch({
              type: SEARCH_PROJECTS,
              payload: newArrayByName
            });
          }
          //this mean theare are no results matched
          else {
            dispatch({
              type: SEARCH_PROJECTS,
              payload: []
            });
          }
        }
      })
      
      .catch(err => {
        dispatch({
          type: SEARCH_PROJECTS,
          payload: null
        });
      });
  };
};
export const setLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};
export const getProject = id => {
  return dispatch => {
    //set the loading to true when we send the request then will set it back to false if it succcedded
    dispatch(setLoading());
    axios
      .get(
        `https://api.proworkflow.net/projects/${id}?apikey=${
          userDetails.apikey
        }`,
        {
          auth: {
            username: `${userDetails.username}`,
            password: `${userDetails.password}`
          }
        }
      )
      .then(res => {
        //send to the reducer
        dispatch({
          type: GET_PROJECT,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_PROJECT,
          payload: null
        });
      });
  };
};
