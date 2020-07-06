import {
  GET_VirtualAccount_BEGIN,
  GET_VirtualAccount_SUCCESS,
  GET_VirtualAccount_FAIL,
} from '../action/VirtualAction';

const initialState = {
  virtual: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VirtualAccount_BEGIN:
      return {
        ...state,
        loading: true,
        virtual: null,
        error: null,
      };
    case GET_VirtualAccount_SUCCESS:
      return {
        ...state,
        loading: false,
        virtual: action.payload.data.datas,
      };
    case GET_VirtualAccount_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};
