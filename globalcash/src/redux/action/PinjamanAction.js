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
        // alert('sukses' + mobile )
      })
      .catch(error => {
        dispatch(serviceActionError(error));
        //  alert('gagal' + mobile )
      });
  };
};

export const getPinjaman2 = mobile => {
  return dispatch => {
    dispatch(serviceActionPending2());
    serverCall({
      method: 'GET',
      url: `/pinjamk2/${mobile}`,
    })
      .then(res => {
        dispatch(serviceActionSuccess2(res));
      })
      .catch(error => {
        dispatch(serviceActionError2(error));
      });
  };
};

export const getPinjaman3 = mobile => {
  return dispatch => {
    dispatch(serviceActionPending3());
    serverCall({
      method: 'GET',
      url: `/pinjamk3/${mobile}`,
    })
      .then(res => {
        dispatch(serviceActionSuccess3(res));
      })
      .catch(error => {
        dispatch(serviceActionError3(error));
      });
  };
};

export const delPinjaman = mobile => {
  return dispatch => {
    dispatch(serviceActionPending4());
    serverCall({
      method: 'DELETE',
      url: `/pinjamDel/${mobile}`,
    })
      .then(res => {
        dispatch(serviceActionSuccess4(res));
      })
      .catch(error => {
        dispatch(serviceActionError4(error));
      });
  };
};

export const delPstatNull = mobile => {
  return dispatch => {
    dispatch(serviceActionPending5());
    serverCall({
      method: 'DELETE',
      url: `/pinjamDelNull/${mobile}`,
    })
      .then(res => {
        dispatch(serviceActionSuccess5(res));
      })
      .catch(error => {
        dispatch(serviceActionError5(error));
      });
  };
};

export const getHisPinjaman = mobile => {
  return dispatch => {
    dispatch(serviceActionPending6());
    serverCall({
      method: 'GET',
      url: `/pinjamhis/${mobile}`,
    })
      .then(res => {
        dispatch(serviceActionSuccess6(res));
      })
      .catch(error => {
        dispatch(serviceActionError6(error));
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

export const serviceActionPending2 = () => ({
  type: GET_PINJAMAN_BEGIN2,
});

export const serviceActionSuccess2 = data => ({
  type: GET_PINJAMAN_SUCCESS2,
  payload: data,
});

export const serviceActionError2 = error => ({
  type: GET_PINJAMAN_FAIL2,
  payload: error,
});

export const serviceActionPending3 = () => ({
  type: GET_PINJAMAN_BEGIN3,
});

export const serviceActionSuccess3 = data => ({
  type: GET_PINJAMAN_SUCCESS3,
  payload: data,
});

export const serviceActionError3 = error => ({
  type: GET_PINJAMAN_FAIL3,
  payload: error,
});

export const serviceActionPending4 = () => ({
  type: DEL_PINJAMAN_BEGIN,
});

export const serviceActionSuccess4 = data => ({
  type: DEL_PINJAMAN_SUCCESS,
  payload: data,
});

export const serviceActionError4 = error => ({
  type: DEL_PINJAMAN_FAIL,
  payload: error,
});

export const serviceActionPending5 = () => ({
  type: DEL_PINSTATNULL_BEGIN,
});

export const serviceActionSuccess5 = data => ({
  type: DEL_PINSTATNULL_SUCCESS,
  payload: data,
});

export const serviceActionError5 = error => ({
  type: DEL_PINSTATNULL_FAIL,
  payload: error,
});

export const serviceActionPending6 = () => ({
  type: GET_HIS_PINJAMAN_BEGIN,
});

export const serviceActionSuccess6 = data => ({
  type: GET_HIS_PINJAMAN_SUCCESS,
  payload: data,
});

export const serviceActionError6 = error => ({
  type: GET_HIS_PINJAMAN_FAIL,
  payload: error,
});

export const GET_PINJAMAN_BEGIN = 'GET_PINJAMAN_BEGIN';
export const GET_PINJAMAN_SUCCESS = 'GET_PINJAMAN_SUCCESS';
export const GET_PINJAMAN_FAIL = 'GET_PINJAMAN_FAIL';

export const GET_PINJAMAN_BEGIN2 = 'GET_PINJAMAN_BEGIN2';
export const GET_PINJAMAN_SUCCESS2 = 'GET_PINJAMAN_SUCCESS2';
export const GET_PINJAMAN_FAIL2 = 'GET_PINJAMAN_FAIL2';

export const GET_PINJAMAN_BEGIN3 = 'GET_PINJAMAN_BEGIN3';
export const GET_PINJAMAN_SUCCESS3 = 'GET_PINJAMAN_SUCCESS3';
export const GET_PINJAMAN_FAIL3 = 'GET_PINJAMAN_FAIL3';

export const GET_HIS_PINJAMAN_BEGIN = 'GET_HIS_PINJAMAN_BEGIN';
export const GET_HIS_PINJAMAN_SUCCESS = 'GET_HIS_PINJAMAN_SUCCESS';
export const GET_HIS_PINJAMAN_FAIL = 'GET_HIS_PINJAMAN_FAIL';

export const DEL_PINJAMAN_BEGIN = 'DEL_PINJAMAN_BEGIN';
export const DEL_PINJAMAN_SUCCESS = 'DEL_PINJAMAN_SUCCESS';
export const DEL_PINJAMAN_FAIL = 'DEL_PINJAMAN_FAIL';

export const DEL_PINSTATNULL_BEGIN = 'DEL_PINSTATNULL_BEGIN';
export const DEL_PINSTATNULL_SUCCESS = 'DEL_PINSTATNULL_SUCCESS';
export const DEL_PINSTATNULL_FAIL = 'DEL_PINSTATNULL_FAIL';
