import {
  getRegisterbyMobile,
  getPinjaman,
} from '../../../redux/action/RegisterAction';
import {connect} from 'react-redux';
import Utama from './Main';
const mapStoreToProps = state => ({
  loading: state.register.loading,
  nasabah: state.register.nasabah,
  pinjam: state.register.pinjam,
  redMobile: state.register.redMobile,
});
const mapDispatchToProps = dispatch => ({
  getRegisterbyMobile: mobile => dispatch(getRegisterbyMobile(mobile)),
  getPinjaman: mobile => dispatch(getPinjaman(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Utama);
