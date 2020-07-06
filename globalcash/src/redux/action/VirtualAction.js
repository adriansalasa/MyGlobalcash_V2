import serverCall from '../../constants/APIcall';

export const getVirtualAccount = bankID => {
  return dispatch => {
    dispatch(serviceActionPending());
    serverCall({
      method: 'GET',
      url: `/virtualaccount/${bankID}`,
    })
      .then(res => {
        dispatch(serviceActionSuccess(res));
      })
      .catch(error => {
        dispatch(serviceActionError(error));
      });
  };
};

export const serviceActionPending = () => ({
  type: GET_VirtualAccount_BEGIN,
});

export const serviceActionSuccess = data => ({
  type: GET_VirtualAccount_SUCCESS,
  payload: data,
});

export const serviceActionError = error => ({
  type: GET_VirtualAccount_FAIL,
  payload: error,
});

export const setLoading = p => ({
  type: SET_VirtualAccount_LOADING,
  payload: p,
});

export const GET_VirtualAccount_BEGIN = 'GET_VirtualAccount_BEGIN';
export const GET_VirtualAccount_SUCCESS = 'GET_VirtualAccount_SUCCESS';
export const GET_VirtualAccount_FAIL = 'GET_VirtualAccount_FAIL';
export const SET_VirtualAccount_LOADING = 'SET_VirtualAccount_LOADING';
