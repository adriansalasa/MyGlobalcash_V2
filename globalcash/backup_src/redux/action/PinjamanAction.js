import serverCall from '../../constants/APIcall';

export const getPinjaman = mobile => {
  return dispatch => {
    dispatch(serviceActionPending());
    serverCall({
      method: 'GET',
      url: `/pinjam/${mobile}`,
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
  type: GET_PINJAMAN_BEGIN,
});

export const serviceActionSuccess = data => ({
  type: GET_PINJAMAN_SUCCESS,
  payload: data,
});

export const serviceActionError = error => ({
  type: GET_PINJAMAN_FAIL,
  payload: error,
});

export const GET_PINJAMAN_BEGIN = 'GET_PINJAMAN_BEGIN';
export const GET_PINJAMAN_SUCCESS = 'GET_PINJAMAN_SUCCESS';
export const GET_PINJAMAN_FAIL = 'GET_PINJAMAN_FAIL';
