import {GET_INSERT_TEMP} from '../action/TempAction';

const initialState = {
  name: '',
  gelar: '',
  location: '',
  address: 'kampus',
  lstay: '',
  momname: '',
  comname: '',
  comfield: '',
  comaddress: '',
  opinjam: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INSERT_TEMP:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};
