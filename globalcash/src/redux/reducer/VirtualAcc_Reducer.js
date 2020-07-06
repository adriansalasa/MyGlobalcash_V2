import {
  GET_VirtualAcc_BEGIN,
  GET_VirtualAcc_SUCCESS,
  GET_VirtualAcc_FAIL,
} from '../action/VirtualAcc_Action';

const initialState = {
  virtualaccount: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VirtualAcc_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_VirtualAcc_SUCCESS:
      return {
        ...state,
        loading: false,
        virtualaccount: action.payload.data.virtualaccount,
      };
    case GET_VirtualAcc_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
        virtualaccount: null,
      };
    default:
      return state;
  }
};
