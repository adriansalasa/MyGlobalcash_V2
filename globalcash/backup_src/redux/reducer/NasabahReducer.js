import {
  GET_NASABAH_BEGIN,
  GET_NASABAH_SUCCESS,
  GET_NASABAH_FAIL,
} from '../action/NasabahAction';

const initialState = {
  nasabah: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NASABAH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_NASABAH_SUCCESS:
      return {
        ...state,
        loading: false,
        nasabah: action.payload.data.nasabah,
      };
    case GET_NASABAH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
        nasabah: null,
      };
    default:
      return state;
  }
};
