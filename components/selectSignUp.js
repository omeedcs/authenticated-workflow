// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';

export default class selectSignUp extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Please enter all fields to complete sign up. Thank you!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
             <Text style = {{textAlign: 'center',
   fontFamily: "Avenir",
    fontSize: 20}}>
      Thanks for signing up! 🤘
    </Text>
    <Text style = {{
        color: '#BF5700', 
        textAlign: 'center', 
    fontFamily: "Avenir", 
    fontSize: 20,
    marginBottom: 20}}>Please wait while your account is created.
   </Text>
          <ActivityIndicator size="large" color="#BF5700"/>
        </View>
      )
    }    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAwareScrollView
        bounces={true}
        style={styles.getStartedContainer}
        showsVerticalScrollIndicator={false}
        extraScrollHeight = {100}
        contentContainerStyle={{
          minHeight: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* // behavior={Platform.OS == "ios" ? "padding" : "height"} */}
     
       {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}/> */}
          {/* Top View STYLE: 
          <View style = {{ 
      width: '100%', 
      height: '30%', 
          backgroundColor: 'transparent', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'absolute',
          top: 0}}> */}
                
          <Text 
              style = {{ 
            marginTop: -35, 
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 32, 
    textAlign: 'center',}}>First time here? 😱
     </Text>
     <Text 
     style = {{ 
       marginBottom: 10,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: '#BF5700', 
    fontSize: 18, 
    textAlign: 'center',
    }}>Select one of the options below.
     </Text>
    
    
    <View style = {{alignSelf: 'center', flexDirection: 'row'}}>
    <TouchableOpacity 
    // onPress={() => this.props.navigation.navigate('studentSignUp')}
    onPress={() => this.props.navigation.navigate('schoolClassSelect')}

    title = 'hello' 
    style = {{borderRadius: 10, 
    marginTop: 20, 
    shadowWidth: 1, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#BF5700',
    shadowOpacity: 300, 
    height: 50, 
    width: '75%', 
    backgroundColor: '#BF5700'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Student
     </Text>
    </TouchableOpacity>
    
    
    </View>
    <TouchableOpacity 
    // onPress={() => this.props.navigation.navigate('staffSignUp')}
    // onPress={() => this.props.navigation.navigate('schoolClassTeacherSelect')}
    style = {{borderRadius: 10, 
    marginTop: 15, 
    shadowWidth: 1, 
    alignSelf: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#0198E1',
    shadowOpacity: 300, 
    height: 50, 
    width: '75%', 
    backgroundColor: '#0198E1'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Staff/Faculty (Coming Soon)
     </Text>                     
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
    title = 'hello' 
    style = {{borderRadius: 10, 
    marginTop: 15, 
    shadowWidth: 1, 
    alignSelf: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#5F9F9F',
    shadowOpacity: 300, 
    height: 50, 
    width: '75%', 
    backgroundColor: '#5F9F9F'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>↵ Back
     </Text>
    </TouchableOpacity>
          </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>

    //   <View style={styles.container}>  
    //     <TextInput
    //       style={styles.inputStyle}
    //       placeholder="Name"
    //       value={this.state.displayName}
        //   onChangeText={(val) => this.updateInputVal(val, 'displayName')}
    //     />      
    //     <TextInput
    //       style={styles.inputStyle}
    //       placeholder="Email"
    //       value={this.state.email}
    //       onChangeText={(val) => this.updateInputVal(val, 'email')}
    //     />
    //     <TextInput
    //       style={styles.inputStyle}
    //       placeholder="Password"
    //       value={this.state.password}
    //       onChangeText={(val) => this.updateInputVal(val, 'password')}
    //       maxLength={15}
    //       secureTextEntry={true}
    //     />   
    //     <Button
    //       color="#3740FE"
    //       title="Signup"
    //       onPress={() => this.registerUser()}
    //     />

    //     <Text 
    //       style={styles.loginText}
    //       onPress={() => navigation.navigate('Login')}>
    //       Already Registered? Click here to login.
    //     </Text>                          
    //   </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  getStartedContainer: {
    flex: 1,
    backgroundColor: '#fff',

  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});