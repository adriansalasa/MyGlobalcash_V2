import {
  GET_OPINJAM_BEGIN,
  GET_OPINJAM_SUCCESS,
  GET_OPINJAM_FAIL,
  GET_PROVINCES_BEGIN,
  GET_PROVINCES_SUCCESS,
  GET_PROVINCES_FAIL,
  GET_PROVINCES_DEL,
  GET_REGENCIES_DEL,
  GET_DISTRICTS_DEL,
  GET_VILLAGES_DEL,
  GET_REGENCIES_BEGIN,
  GET_REGENCIES_SUCCESS,
  GET_REGENCIES_FAIL,
  GET_DISTRICTS_BEGIN,
  GET_DISTRICTS_SUCCESS,
  GET_DISTRICTS_FAIL,
  GET_VILLAGES_BEGIN,
  GET_VILLAGES_SUCCESS,
  GET_VILLAGES_FAIL,
} from '../action/OpsiAction';

const initialState = {
  opinjam: null,
  provinces: null,
  regencies: null,
  districts: null,
  villages: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OPINJAM_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_OPINJAM_SUCCESS:
      return {
        ...state,
        loading: false,
        opinjam: action.payload.data.datas,
      };
    case GET_OPINJAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_PROVINCES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PROVINCES_SUCCESS:
      return {
        ...state,
        loading: false,
        provinces: action.payload.data.datas,
      };
    case GET_PROVINCES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_PROVINCES_DEL:
      return {
        ...state,
        loading: false,
        provinces: null,
      };
    case GET_REGENCIES_DEL:
      return {
        ...state,
        loading: false,
        regencies: null,
      };
    case GET_DISTRICTS_DEL:
      return {
        ...state,
        loading: false,
        districts: null,
      };
    case GET_VILLAGES_DEL:
      return {
        ...state,
        loading: false,
        villages: null,
      };
    case GET_REGENCIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_REGENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        regencies: action.payload.data.datas,
      };
    case GET_REGENCIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    case GET_DISTRICTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_DISTRICTS_SUCCESS:
      return {
        ...state,
        loading: false,
        districts: action.payload.data.datas,
      };
    case GET_DISTRICTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };

    case GET_VILLAGES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_VILLAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        villages: action.payload.data.datas,
      };
    case GET_VILLAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};
