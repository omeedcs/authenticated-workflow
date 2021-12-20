// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import CompanyLogo from './CompanyLogo';
import { ListItem, SearchBar, Header } from 'react-native-elements'

export default class tabTwo extends Component {


  constructor() {
    super();
    this.state = { 
      uid: '',
      search: '',
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  updateSearch = (search) => {
    this.setState({ search });
  };
  
  render() {

    const { search } = this.state;

    const Tab = createBottomTabNavigator();
    this.state = { 
        displayName: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid
      }    
    return (
      <View>
         <Header 
  containerStyle={{
    height: 100,
    justifyContent: 'space-around',
    borderBottomWidth: .5,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
  }}
    // rightComponent={{ icon: 'home', style: { color: 'black' } }}
    // linearGradientProps={{
    //   colors: ['white', '#F2F3F4'],
    //   start: { x: 1, y: 0 },
    //   end: { x: 0, y: 1 },
    // }}
  leftComponent={{icon: 'menu', iconStyle: {fontSize: 27, alignSelf: 'center',
  color: '#BF5700',}}}
  rightComponent={{icon: 'send', iconStyle: {fontSize: 27, alignSelf: 'center',
  color: '#BF5700',}}}
  centerComponent={<CompanyLogo />}/>
    <View style = {styles.titleStyle}>
        <Animatable.Text animation = 'fadeInLeft' duration = {2500} style = {{fontWeight: 'bold', fontFamily: "Avenir", fontSize: 30, color: 'black'}}>Feed </Animatable.Text>
        </View>
        <View>
        <SearchBar 
        round
        showCancel
        lightTheme
        onChangeText={this.updateSearch}
        value={search}
        inputStyle = {{color: 'black'}}
        containerStyle = {{backgroundColor: 'transparent'}}
        inputContainerStyle = {{ alignSelf: 'center'}}placeholder="Search"
        platform = 'default'></SearchBar>
        <ScrollView>
        {
    list.map((l, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: l.avatar_url } }}
        title={l.name}
        subtitle={l.subtitle}
        bottomDivider
      />
    ))
  }
  </ScrollView>
        </View>
        </View>
    
    );
  }
}

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Bobby Joe',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Omeed Tehrani',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Bobby Schmurda',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Dwayne Johnson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 30, 
    color: 'black',
    fontFamily: "Avenir", 
    fontWeight: 'bold',
  },
  titleStyle: {
    marginTop: '5%',
    marginLeft: '5%',
    color: 'black',
    flex: 0,
    marginBottom: 5,
    fontFamily: "Avenir", 
    fontWeight: 'bold',
  },
});