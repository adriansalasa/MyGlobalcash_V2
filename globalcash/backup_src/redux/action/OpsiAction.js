import serverCall from '../../constants/APIcall';

export const getOpinjam = () => {
  return dispatch => {
    dispatch(serviceActionPending());
    serverCall({
      method: 'GET',
      url: `/opinjam`,
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
  type: GET_OPINJAM_BEGIN,
});

export const serviceActionSuccess = data => ({
  type: GET_OPINJAM_SUCCESS,
  payload: data,
});

export const serviceActionError = error => ({
  type: GET_OPINJAM_FAIL,
  payload: error,
});

export const getProvinces = () => {
  return dispatch => {
    dispatch(provincesActionPending());
    serverCall({
      method: 'GET',
      url: `/provinces`,
    })
      .then(res => {
        dispatch(provincesActionSuccess(res));
      })
      .catch(error => {
        dispatch(provincesActionError(error));
      });
  };
};

export const provincesActionPending = () => ({
  type: GET_PROVINCES_BEGIN,
});

export const provincesActionSuccess = data => ({
  type: GET_PROVINCES_SUCCESS,
  payload: data,
});

export const provincesActionError = error => ({
  type: GET_PROVINCES_FAIL,
  payload: error,
});

export const delProvinces = () => ({
  type: GET_PROVINCES_DEL,
});

export const delRegencies = () => ({
  type: GET_REGENCIES_DEL,
});

export const delDistricts = () => ({
  type: GET_DISTRICTS_DEL,
});

export const delVillages = () => ({
  type: GET_VILLAGES_DEL,
});

export const getRegencies = provinceID => {
  return dispatch => {
    dispatch(regenciesActionPending());
    serverCall({
      method: 'GET',
      url: `/regency/${provinceID}`,
    })
      .then(res => {
        dispatch(regenciesActionSuccess(res));
      })
      .catch(error => {
        dispatch(regenciesActionError(error));
      });
  };
};

export const regenciesActionPending = () => ({
  type: GET_REGENCIES_BEGIN,
});

export const regenciesActionSuccess = data => ({
  type: GET_REGENCIES_SUCCESS,
  payload: data,
});

export const regenciesActionError = error => ({
  type: GET_REGENCIES_FAIL,
  payload: error,
});

export const getDistricts = regencyID => {
  return dispatch => {
    dispatch(districtsActionPending());
    serverCall({
      method: 'GET',
      url: `/district/${regencyID}`,
    })
      .then(res => {
        dispatch(districtsActionSuccess(res));
      })
      .catch(error => {
        dispatch(districtsActionError(error));
      });
  };
};

export const districtsActionPending = () => ({
  type: GET_DISTRICTS_BEGIN,
});

export const districtsActionSuccess = data => ({
  type: GET_DISTRICTS_SUCCESS,
  payload: data,
});

export const districtsActionError = error => ({
  type: GET_DISTRICTS_FAIL,
  payload: error,
});

export const getVillages = provinceID => {
  return dispatch => {
    dispatch(villagesActionPending());
    serverCall({
      method: 'GET',
      url: `/village/${provinceID}`,
    })
      .then(res => {
        dispatch(villagesActionSuccess(res));
      })
      .catch(error => {
        dispatch(villagesActionError(error));
      });
  };
};

export const villagesActionPending = () => ({
  type: GET_VILLAGES_BEGIN,
});

export const villagesActionSuccess = data => ({
  type: GET_VILLAGES_SUCCESS,
  payload: data,
});

export const villagesActionError = error => ({
  type: GET_VILLAGES_FAIL,
  payload: error,
});

export const GET_OPINJAM_BEGIN = 'GET_OPINJAM_BEGIN';
export const GET_OPINJAM_SUCCESS = 'GET_OPINJAM_SUCCESS';
export const GET_OPINJAM_FAIL = 'GET_OPINJAM_FAIL';

export const GET_PROVINCES_BEGIN = 'GET_PROVINCES_BEGIN';
export const GET_PROVINCES_SUCCESS = 'GET_PROVINCES_SUCCESS';
export const GET_PROVINCES_FAIL = 'GET_PROVINCES_FAIL';
export const GET_PROVINCES_DEL = 'GET_PROVINCES_DEL';

export const GET_REGENCIES_BEGIN = 'GET_REGENCIES_BEGIN';
export const GET_REGENCIES_SUCCESS = 'GET_REGENCIES_SUCCESS';
export const GET_REGENCIES_FAIL = 'GET_REGENCIES_FAIL';
export const GET_REGENCIES_DEL = 'GET_REGENCIES_DEL';

export const GET_DISTRICTS_BEGIN = 'GET_DISTRICTS_BEGIN';
export const GET_DISTRICTS_SUCCESS = 'GET_DISTRICTS_SUCCESS';
export const GET_DISTRICTS_FAIL = 'GET_DISTRICTS_FAIL';
export const GET_DISTRICTS_DEL = 'GET_DISTRICTS_DEL';

export const GET_VILLAGES_BEGIN = 'GET_VILLAGES_BEGIN';
export const GET_VILLAGES_SUCCESS = 'GET_VILLAGES_SUCCESS';
export const GET_VILLAGES_FAIL = 'GET_VILLAGES_FAIL';
export const GET_VILLAGES_DEL = 'GET_VILLAGES_DEL';
