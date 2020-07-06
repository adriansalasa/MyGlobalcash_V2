import {combineReducers} from 'redux';
import register from './RegisterReducer';
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import NasabahReducer from './NasabahReducer';
import OpsiReducer from './OpsiReducer';
import TempReducer from './TempReducer';
import PinjamanReducer from './PinjamanReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
  register: register,
  nasabah: NasabahReducer,
  opsi: OpsiReducer,
  temp: TempReducer,
  pinjaman: PinjamanReducer,
});

// Exports
export default rootReducer;
