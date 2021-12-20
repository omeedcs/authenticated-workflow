// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import RNTwitterLikeHeader from 'react-native-twitter-like-header';
// import {SwitchNavigator, createDrawerNavigator} from 'react-navigation'

export default class tabThree extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      uid: '',
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  
  render() {

    // const Tab = createBottomTabNavigator();
    this.state = { 
        displayName: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid
      }    
    return (
      //   <RNTwitterLikeHeader
      // headerMaxHeight={130}
      // headerMinHeight={80}
      // profileImageMaxHeight={90}
      // profileImageMinHeight={50}
      // headerBackgroundColor={'lightskyblue'}
      // usernameAvatar={this.state.displayName}
      // usernameHeader={this.state.displayName}
      // usernameFontSize={15}
      // avatarBorderColor = '#FFDC80'
      // avatarTextPaddingLeft	= {20}
      // getAvatarImage={require('../assets/defaultPic.jpg')}>
        <View style={styles.container} >
         <TouchableOpacity 
         onPress={() => this.signOut()}
    title = 'hello' 
    style = {{borderRadius: 10, 
    marginTop: -15, 
    shadowWidth: 1, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'gray',
    shadowOpacity: 300, 
    height: 50, 
    marginLeft: -20,
    width: 150, 
    backgroundColor: 'red'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Logout
     </Text>
    </TouchableOpacity>
</View>
      // </RNTwitterLikeHeader>
    
    );
  }
}

// // Logout button:



// const HomeScreen = ({ navigation }) => {

  
//   const SettingsScreen = ({ navigation }) => {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 35,
    backgroundColor: 'transparent'
  },
  textStyle: {
    fontSize: 30, 
    color: 'black',
    fontFamily: "Avenir", 
    fontWeight: 'bold',
  }
});