import serverCall from '../../constants/APIcall';

export const getNasabah = mobile => {
  return dispatch => {
    dispatch(serviceActionPending());
    serverCall({
      method: 'GET',
      url: `/nasabah/${mobile}`,
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
  type: GET_NASABAH_BEGIN,
});

export const serviceActionSuccess = data => ({
  type: GET_NASABAH_SUCCESS,
  payload: data,
});

export const serviceActionError = error => ({
  type: GET_NASABAH_FAIL,
  payload: error,
});

export const setLoading = p => ({
  type: SET_NASABAH_LOADING,
  payload: p,
});

export const GET_NASABAH_BEGIN = 'GET_NASABAH_BEGIN';
export const GET_NASABAH_SUCCESS = 'GET_NASABAH_SUCCESS';
export const GET_NASABAH_FAIL = 'GET_NASABAH_FAIL';
export const SET_NASABAH_LOADING = 'SET_NASABAH_LOADING';
