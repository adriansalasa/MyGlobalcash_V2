import serverCall from '../../constants/APIcall';

export const getAbout = abtID => {
  return dispatch => {
    dispatch(serviceActionPending());
    serverCall({
      method: 'GET',
      url: `/About/${abtID}`,
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
  type: GET_About_BEGIN,
});

export const serviceActionSuccess = data => ({
  type: GET_About_SUCCESS,
  payload: data,
});

export const serviceActionError = error => ({
  type: GET_About_FAIL,
  payload: error,
});

export const setLoading = p => ({
  type: SET_About_LOADING,
  payload: p,
});

export const GET_About_BEGIN = 'GET_About_BEGIN';
export const GET_About_SUCCESS = 'GET_About_SUCCESS';
export const GET_About_FAIL = 'GET_About_FAIL';
export const SET_About_LOADING = 'SET_About_LOADING';
