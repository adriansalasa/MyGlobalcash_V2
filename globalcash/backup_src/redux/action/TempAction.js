/* eslint-disable no-undef */
import serverCall from '../../constants/APIcall';
import axios from 'axios';

export const insertData = (object, data) => ({
  type: GET_INSERT_TEMP,
  object: object,
  payload: data,
});

export const GET_INSERT_TEMP = 'GET_INSERT_TEMP';
