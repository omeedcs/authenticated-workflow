// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';


export default class CompanyLogo extends Component {

  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  
  render() {
    return (
      <TouchableOpacity style = {{  justifyContent: 'flex-start', alignSelf: 'center', alignItems: 'center', width: '100%', 
      height: '100%', }}>
      <Animatable.Image  
            iterationCount = 'infinite' 
    style = {{
      marginTop: 5,
        flexDirection: 'row',
             alignItems: 'center',
             justifyContent: 'flex-start',
    width: '13%', 
    height: '65%', 
  }} 
    source={require('../assets/highresHookem.png')} 
    animation = 'pulse' 
    duration = {6000}/>    
    </TouchableOpacity>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 35, 
    marginTop: '20%',
    color: 'black',
    fontFamily: "Avenir", 
    fontWeight: 'bold',
  },
});

export {CompanyLogo};