import React, {Component} from 'react';
import {Image, Dimensions, View} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {IMAGE} from './constants/Image';
import {CustomHeader} from './components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SideMenu,
  Feed,
  FeedDetail,
  Search,
  SearchDetail,
  Profile,
  Setting,
  Register,
  BankInfo,
  Edit_BankInfo,
  His_Pinjam,
  His_Bayar,
  mod_Phone,
  mod_Password,
  usr_suggest,
  mnAbout,
  dtlAbout,
  PPen,
  PPriv,
} from './components';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store/';

import Registration from './screens/RegistrationScreen';
import Login from './screens/LoginScreen';
// import Main from './components/tabs/utama/';
import Main from './screens/MainScreen';
import UtamaDetail from './components/tabs/utama/MainDetail';

class Registration2 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          title="Registration2"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Feed Screen</Text>
          <Button
            light
            onPress={() => this.props.navigation.navigate('Registration')}>
            <Text>go to feed detail</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const navOptionsHandler = navigation => ({
  header: null,
});

const FeedStack = createStackNavigator({
  feed: {
    screen: Feed,
    navigationOptions: navOptionsHandler,
  },
  FeedDetail: {
    screen: FeedDetail,
    navigationOptions: navOptionsHandler,
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: navOptionsHandler,
  },
  SearchDetail: {
    screen: SearchDetail,
    navigationOptions: navOptionsHandler,
  },
});

const UtamaStack = createStackNavigator({
  Utama: {
    screen: Main,
    navigationOptions: navOptionsHandler,
  },
  UtamaDetail: {
    screen: UtamaDetail,
    navigationOptions: navOptionsHandler,
  },
});

const MainTabs = createBottomTabNavigator({
  Utama: {
    screen: UtamaStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        // <Image
        //   source={IMAGE.Home}
        //   resizeMode="contain"
        //   style={{width: 20, height: 20}}
        // />
        <Icon
          type="FontAwesome5"
          name="home"
          style={{fontSize: 20, color: tintColor}}
          // onPress={()=>{this.props.navigation.navigate('Main')}}
        />
        // <Ionicons
        //   style={[{color: tintColor}]}
        //   size={25}
        //   name={'ios-chatboxes'}
        // />
      ),
    },
  },
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({tintColor}) => (
        // <Image
        //   source={IMAGE.Feed}
        //   resizeMode="contain"
        //   style={{width: 20, height: 20}}
        // />
        <Ionicons
          style={[{color: tintColor}]}
          size={25}
          name={'logo-rss'}
          // onPress={() => this.keok()}
        />
      ),
    },
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({tintColor}) => (
        // <Image
        //   source={IMAGE.User_Icon}
        //   resizeMode="contain"
        //   style={{width: 25, height: 25}}
        // />
        <Icon
          type="FontAwesome5"
          name="user-cog"
          style={{fontSize: 25, color: tintColor}}
        />
      ),
    },
  },
});

const MainStack = createStackNavigator(
  {
    Home: {
      screen: MainTabs,
      navigationOptions: navOptionsHandler,
    },
    Setting: {
      screen: Setting,
      navigationOptions: navOptionsHandler,
    },
    Profile: {
      screen: Profile,
      navigationOptions: navOptionsHandler,
    },
    Registration: {
      screen: Registration,
      navigationOptions: navOptionsHandler,
    },
    Registration1: {
      screen: Registration2,
      navigationOptions: navOptionsHandler,
    },
    BankInfo: {
      screen: BankInfo,
      navigationOptions: navOptionsHandler,
    },
    Edit_BankInfo: {
      screen: Edit_BankInfo,
      navigationOptions: navOptionsHandler,
    },
    His_Pinjam: {
      screen: His_Pinjam,
      navigationOptions: navOptionsHandler,
    },
    His_Bayar: {
      screen: His_Bayar,
      navigationOptions: navOptionsHandler,
    },
    mod_Phone: {
      screen: mod_Phone,
      navigationOptions: navOptionsHandler,
    },
    mod_Password: {
      screen: mod_Password,
      navigationOptions: navOptionsHandler,
    },
    usr_suggest: {
      screen: usr_suggest,
      navigationOptions: navOptionsHandler,
    },
    mnAbout: {
      screen: mnAbout,
      navigationOptions: navOptionsHandler,
    },
    dtlAbout: {
      screen: dtlAbout,
      navigationOptions: navOptionsHandler,
    },
    PPen: {
      screen: PPen,
      navigationOptions: navOptionsHandler,
    },
    PPriv: {
      screen: PPriv,
      navigationOptions: navOptionsHandler,
    },
  },
  {initialRouteName: 'Home'},
);

const appDrawer = createDrawerNavigator(
  {
    drawer: MainStack,
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get('window').width * 3) / 4,
  },
);

const authStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: navOptionsHandler,
  },
  Register: {
    screen: Register,
    navigationOptions: navOptionsHandler,
  },
});

const MainApp = createSwitchNavigator(
  {
    app: appDrawer,
    auth: authStack,
  },
  {
    initialRouteName: 'auth',
  },
);

const AppNavigator = createAppContainer(MainApp);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
