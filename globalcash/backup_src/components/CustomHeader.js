/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Header, Left, Icon, Body, Title, Right, Button} from 'native-base';

export class CustomHeader extends Component {
  render() {
    let {title, isHome} = this.props;
    return (
      <Header style={{height: 30}}>
      
        <StatusBar backgroundColor="#f05d00" barStyle="light-content" />
        <Left>
          {isHome ? (
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          ) : (
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
