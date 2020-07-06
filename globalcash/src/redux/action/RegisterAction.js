/* eslint-disable no-undef */
import serverCall from '../../constants/APIcall';
import axios from 'axios';

export const getRegisterbyMobile = mobile => {
  return dispatch => {
    dispatch(serviceActionPending());
    axios
      // .get(`http://182.253.28.197:63003/api/nasabah/${mobile}`)
      .get(`http://192.168.5.27:63003/api/nasabah/${mobile}`)
      .then(res => {
        dispatch(serviceActionSuccess(res));
      })
      .catch(err => {
        dispatch(serviceActionError(err));
      });
  };
};

export const serviceActionPending = () => ({
  type: GET_REGISTER_BEGIN,
});

export const serviceActionError = error => ({
  type: GET_REGISTER_FAIL,
  payload: error,
});

export const serviceActionSuccess = data => ({
  type: GET_REGISTER_SUCCESS,
  payload: data,
});

export const getPinjaman = mobile => {
  return dispatch => {
    dispatch(PinjamanBegin());
    axios
      // .get(`http://182.253.28.197:63003/api/pinjam/${mobile}`)
      .get(`http://192.168.5.27:63003/api/pinjam/${mobile}`)
      .then(res => {
        dispatch(PinjamanSuccess(res));
      })
      .catch(err => {
        dispatch(PinjamanFailed(err));
      });
  };
};

export const PinjamanBegin = () => ({
  type: GET_PINJAMAN_BEGIN,
});

export const PinjamanSuccess = data => ({
  type: GET_PINJAMAN_SUCCESS,
  payload: data,
});

export const PinjamanFailed = error => ({
  type: GET_PINJAMAN_FAIL,
  payload: error,
});

export const saveMobile = mobile => ({
  type: GET_SAVE_MOBILE,
  payload: mobile,
});

export const GET_REGISTER_BEGIN = 'GET_REGISTER_BEGIN';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAIL = 'GET_REGISTER_FAIL';
export const GET_PINJAMAN_BEGIN = 'GET_PINJAMAN_BEGIN';
export const GET_PINJAMAN_SUCCESS = 'GET_PINJAMAN_SUCCESS';
export const GET_PINJAMAN_FAIL = 'GET_PINJAMAN_FAIL';
export const GET_SAVE_MOBILE = 'GET_SAVE_MOBILE';
