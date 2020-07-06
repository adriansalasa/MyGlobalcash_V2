import {combineReducers} from 'redux';
import register from './RegisterReducer';
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import NasabahReducer from './NasabahReducer';
import OpsiReducer from './OpsiReducer';
import TempReducer from './TempReducer';
import PinjamanReducer from './PinjamanReducer';
// import VirtualAcc_Reducer from './VirtualAcc_Reducer';
import VirtualReducer from './VirtualReducer';
import AboutReducer from './AboutReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
  register: register,
  nasabah: NasabahReducer,
  opsi: OpsiReducer,
  temp: TempReducer,
  pinjaman: PinjamanReducer,
  // VirtualAcc_Reducer: VirtualAcc_Reducer,
  virtual: VirtualReducer,
  about: AboutReducer,
});

// Exports
export default rootReducer;
