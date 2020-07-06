import {
    GET_About_BEGIN,
    GET_About_SUCCESS,
    GET_About_FAIL,
  } from '../action/AboutAction';
  
  const initialState = {
    about: null,
    loading: false,
    error: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_About_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_About_SUCCESS:
        return {
          ...state,
          loading: false,
          about: action.payload.data.datas,
        };
      case GET_About_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.response.data,
          about: null,
        };
      default:
        return state;
    }
  };
  