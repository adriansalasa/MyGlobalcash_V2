import {
  GET_REGISTER_BEGIN,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAIL,
  GET_PINJAMAN_BEGIN,
  GET_PINJAMAN_SUCCESS,
  GET_PINJAMAN_FAIL,
  GET_SAVE_MOBILE,
} from '../action/RegisterAction';

const initialState = {
  nasabah: null,
  pinjam: null,
  redMobile: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        nasabah: action.payload.data.nasabah,
      };
    case GET_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_PINJAMAN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        pinjam: null,
      };
    case GET_PINJAMAN_SUCCESS:
      return {
        ...state,
        loading: false,
        pinjam: action.payload.data.pinjam,
      };
    case GET_PINJAMAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_SAVE_MOBILE:
      return {
        ...state,
        redMobile: action.payload,
      };
    default:
      return state;
  }
};
