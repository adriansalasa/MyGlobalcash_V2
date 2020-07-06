import {
  GET_PINJAMAN_BEGIN,
  GET_PINJAMAN_SUCCESS,
  GET_PINJAMAN_FAIL,
} from '../action/PinjamanAction';

const initialState = {
  pinjaman: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PINJAMAN_BEGIN:
      return {
        ...state,
        loading: true,
        pinjaman: null,
        error: null,
      };
    case GET_PINJAMAN_SUCCESS:
      return {
        ...state,
        loading: false,
        pinjaman: action.payload.data.datas,
      };
    case GET_PINJAMAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};
