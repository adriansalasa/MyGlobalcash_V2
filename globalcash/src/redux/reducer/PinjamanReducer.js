import {
  GET_PINJAMAN_BEGIN,
  GET_PINJAMAN_SUCCESS,
  GET_PINJAMAN_FAIL,
  GET_PINJAMAN_BEGIN2,
  GET_PINJAMAN_SUCCESS2,
  GET_PINJAMAN_FAIL2,
  GET_PINJAMAN_BEGIN3,
  GET_PINJAMAN_SUCCESS3,
  GET_PINJAMAN_FAIL3,
  GET_HIS_PINJAMAN_BEGIN,
  GET_HIS_PINJAMAN_SUCCESS,
  GET_HIS_PINJAMAN_FAIL,
  DEL_PINJAMAN_BEGIN,
  DEL_PINJAMAN_SUCCESS,
  DEL_PINJAMAN_FAIL,
  DEL_PINSTATNULL_BEGIN,
  DEL_PINSTATNULL_SUCCESS,
  DEL_PINSTATNULL_FAIL,
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
    case GET_PINJAMAN_BEGIN2:
      return {
        ...state,
        loading: true,
        pinjaman: null,
        error: null,
      };
    case GET_PINJAMAN_SUCCESS2:
      return {
        ...state,
        loading: false,
        pinjaman: action.payload.data.datas,
      };
    case GET_PINJAMAN_FAIL2:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_PINJAMAN_BEGIN3:
      return {
        ...state,
        loading: true,
        pinjaman: null,
        error: null,
      };
    case GET_PINJAMAN_SUCCESS3:
      return {
        ...state,
        loading: false,
        pinjaman: action.payload.data.datas,
      };
    case GET_PINJAMAN_FAIL3:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_HIS_PINJAMAN_BEGIN:
      return {
        ...state,
        loading: true,
        pinjaman: null,
        error: null,
      };
    case GET_HIS_PINJAMAN_SUCCESS:
      return {
        ...state,
        loading: false,
        pinjaman: action.payload.data.datas,
      };
    case GET_HIS_PINJAMAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case DEL_PINJAMAN_BEGIN:
      return {
        ...state,
        loading: true,
        pinjaman: null,
        error: null,
      };
    case DEL_PINJAMAN_SUCCESS:
      return {
        ...state,
        loading: false,
        pinjaman: action.payload.data.datas,
      };
    case DEL_PINJAMAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
      case DEL_PINSTATNULL_BEGIN:
      return {
        ...state,
        loading: true,
        pinjaman: null,
        error: null,
      };
    case DEL_PINSTATNULL_SUCCESS:
      return {
        ...state,
        loading: false,
        pinjaman: action.payload.data.datas,
      };
    case DEL_PINSTATNULL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};
