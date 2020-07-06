import {getRegisterbyMobile} from '../../../redux/action/RegisterAction';
import {connect} from 'react-redux';
import Registration from './Registration';
const mapStoreToProps = state => ({
  redMobile: state.register.redMobile,
  nasabah: state.register.nasabah,
  loading: state.register.loading,
});
const mapDispatchToProps = dispatch => ({
  getRegisterbyMobile: mobile => dispatch(getRegisterbyMobile(mobile)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Registration);
