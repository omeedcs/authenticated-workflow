// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import { createDrawerNavigator } from '@react-navigation/drawer';


function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
  
  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  
  const Drawer = createDrawerNavigator();

export default class SideDrawer extends Component {

  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  
  render() {
    return (
        <Drawer.Navigator>
      <Animatable.Image  
            iterationCount = 'infinite' 
    style = {{
        flexDirection: 'row',
             alignItems: 'center',
             justifyContent: 'flex-start',
            // flex: 1,
    width: '13%', 
    height: '70%', 
  }} 
    source={require('../assets/highresHookem.png')} 
    animation = 'pulse' 
    duration = {6000}/>  
    </Drawer.Navigator>     
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

export {SideDrawer};