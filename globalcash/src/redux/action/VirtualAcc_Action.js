import serverCall from '../../constants/APIcall';

export const getVirtualAcc = bankname => {
  return dispatch => {
    dispatch(serviceActionPending());
    serverCall({
      method: 'GET',
      url: `/virtualaccount/${bankname}`,
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
  type: GET_VirtualAcc_BEGIN,
});

export const serviceActionSuccess = data => ({
  type: GET_VirtualAcc_SUCCESS,
  payload: data,
});

export const serviceActionError = error => ({
  type: GET_VirtualAcc_FAIL,
  payload: error,
});

export const setLoading = p => ({
  type: SET_VirtualAcc_LOADING,
  payload: p,
});

export const GET_VirtualAcc_BEGIN = 'GET_VirtualAcc_BEGIN';
export const GET_VirtualAcc_SUCCESS = 'GET_VirtualAcc_SUCCESS';
export const GET_VirtualAcc_FAIL = 'GET_VirtualAcc_FAIL';
export const SET_VirtualAcc_LOADING = 'SET_VirtualAcc_LOADING';
