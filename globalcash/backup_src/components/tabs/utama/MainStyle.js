import {StyleSheet} from 'react-native';

export const HeaderStyle = {
  position: 'relative',
  backgroundColor: '#f05d00',
  height: 200,
  borderBottomRightRadius: 200,
  borderBottomLeftRadius: 200,
  transform: [{scaleX: 1.6}],
};
export const ContentWrapper = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

export const ContentStyle = {
  backgroundColor: 'white',
  marginHorizontal: 20,
  padding: 10,
  alignItems: 'center',
  top: 30,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const ContentStyleDetail = {
  backgroundColor: 'white',
  marginHorizontal: 20,
  padding: 10,
  top: 30,
  borderRadius: -10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const TenorWrapper = {
  dlexDirection: 'row',
};
export const CurencyStyle = {
  fontSize: 30,
  color: 'black',
  fontWeight: 'bold',
};

export const TujuanStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 5,
};
export const TujuanStyle2 = {
  marginTop: 15,
  flexDirection: 'row',
  width: 300,
  paddingBottom: 5,
};

export const TujuanTextLeft = {flex: 1, textAlign: 'left'};

export const TujuanTextRight = {textAlign: 'right'};

export const TujuanTextLeft2 = {
  flex: 1,
  textAlign: 'left',
  padding: 5,
  borderRadius: 10,
  marginRight: 5,
};

export const TujuanTextRight2 = {
  textAlign: 'right',
  backgroundColor: '#f3f3f3',
  padding: 5,
  borderRadius: 10,
  marginLeft: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const PickerStyle = {
  marginTop: 5,
  width: 300,
  borderRadius: 10,
  padding: 5,
  backgroundColor: '#f3f3f3',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const Lines = {
  borderWidth: 0.5,
  borderColor: '#747474',
  margin: 10,
};
