// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base'


export default class staffSignUp extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      signUpFailure: false,
      password: '',
      confirmPassword: '',
      isLoading: false,
      revealThePassword: true, 
    }
    this.passwordRevealer = this.passwordRevealer.bind(this)
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  passwordRevealer() {
    this.setState({revealThePassword: !this.state.revealThePassword})
  }

  registerUser = () => {
    // if (this.state.new.length < 8 || this.state.confirm.length < 8) {
    //   Alert.alert(
    //     'Not Long Enough',
    //     'The new password must be at least 8 characters long. Try again'
    //   )
    // } else if (this.state.new !== this.state.confirm) {
    //   Alert.alert('Not Matching', 'The new password entries do not match. Try again')
     if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Please enter all fields to complete sign up. Thank you!')
     } else if (this.state.confirmPassword !== this.state.password) {
      Alert.alert('Looks like your passwords do not match!') 
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(trickTheSystem, this.state.password)
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
      .catch(error => this.setState({ signUpFailure: true }))      
    }
  }

  render() {
    if(this.state.isLoading && !this.state.signUpFailure){
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
                <Animatable.Text style = {{marginBottom: 40, 
                    fontSize: 60}} 
                    animation = 'tada'
                     iterationCount = 'infinite' 
                     duration = {3000}>🧑‍🏫
                     </Animatable.Text>
          <Text 
              style = {{ 
            marginTop: -35, 
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 30, 
    textAlign: 'center',}}>Account Information
     </Text>
     <Text 
     style = {{ 
       marginBottom: 30,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: '#0198E1', 
    fontSize: 22, 
    textAlign: 'center',
    }}>Almost there.
     </Text>
    
     <Text 
    style = {{ 
      marginBottom: 10,
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 16.5, 
    }}>What is your name?
    </Text>
    
      <TextInput 
      onChangeText={(val) => this.updateInputVal(val, 'displayName')}
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: 1.1, 
        borderColor: '#0198E1',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '85%',
          height: '5%' }}>
          </TextInput>
    
          {/* <Text 
    style = {{ 
      marginBottom: 10,
      marginTop: 10,
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 15, 
    }}>What is your phone number?
    </Text>
    
          <TextInput 
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: .5, 
        borderRadius: 5,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '75%',
          height: '4%' }}>
          </TextInput> */}
    
          <Text 
    style = {{ 
      marginBottom: 10,
      marginTop: 10,
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 16.5, 
    }}>What is your preferred email?
    </Text>
          <TextInput 
        onChangeText={(val) => this.updateInputVal(val, 'email')}
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: 1.1, 
        borderColor: '#0198E1',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '85%',
          height: '5%' }}>
          </TextInput>
          <Text 
    style = {{ 
      marginBottom: 10,
      marginTop: 10,
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 16.5, 
    }}>Please enter a password.
    </Text>

          <TextInput 
    onChangeText={(val) => this.updateInputVal(val, 'password')}
    secureTextEntry = {this.state.revealThePassword}
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: 1.1, 
        borderColor: '#0198E1',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '85%',
          height: '5%' }}>
          </TextInput>

          <Text 
    style = {{ 
      marginBottom: 10,
      marginTop: 10,
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 16.5, 
    }}>Please re-enter your password.
    </Text>
          <TextInput 
    onChangeText={(val) => this.updateInputVal(val, 'password')}
    secureTextEntry = {this.state.revealThePassword}
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: 1.1, 
        borderColor: '#0198E1',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '85%',
          height: '5%' }}>
          </TextInput>
          <Icon     
          size = {20}
          onPress={this.passwordRevealer}
           style={{
           position: 'absolute',
           right: 50,
           alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'black',
          fontSize: 25,
          bottom: '29.4%',
          color: 'black',}}
          name={this.state.revealThePassword ? 'eye-off' : 'eye'}
          tyep='material-community'
          color='#000'/>
          <Icon     
          size = {20}
          onPress={this.passwordRevealer}
           style={{
           position: 'absolute',
           right: 50,
           alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'black',
          fontSize: 25,
          bottom: '39.2%',
          color: 'black',}}
          name={this.state.revealThePassword ? 'eye-off' : 'eye'}
          tyep='material-community'
          color='#000'/>
    
          {this.state.signUpFailure && (
                  <Animatable.Text animation = 'pulse' duration = {3000} iterationCount = 'infinite'
                    containerStyle={{borderRadius: 50}}
                    style={{
                      backgroundColor: 'white',
                      color: 'red',
                      padding: 13,
                      marginLeft: 30,
                      borderRadius: 25,
                      marginRight: 30,
                      marginTop: 15
                      
                    }}
                    size={17}
                  >
                    Uh oh! Please enter all fields correctly. {"\n"} 
                    Do you have an account already? Hmm..
                  </Animatable.Text>
                )}

          {/* <Text 
    style = {{ 
      marginBottom: 10,
      marginTop: 10,
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 15, 
    }}>Please re-enter your password.
    </Text>
          <TextInput 
          secureTextEntry = {true}
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: .5, 
        borderRadius: 5,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '75%',
          height: '4%' }}>
          </TextInput> */}
    
    <View style = {{alignSelf: 'center', flexDirection: 'row'}}>
    {/* <TouchableOpacity onPress={() => navigation.navigate('Get Started')}
    title = 'hello' 
    style = {{borderRadius: 10, 
    marginTop: 20, 
    shadowWidth: 1, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'gray',
    shadowOpacity: 300, 
    height: 50, 
    width: 150, 
    backgroundColor: 'gray'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Forgot Password
     </Text>
    </TouchableOpacity> */}
    <TouchableOpacity onPress={() => this.registerUser()}
    title = 'hello' 
    style = {{borderRadius: 10, 
    marginTop: 20, 
    shadowWidth: 1, 
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
     marginTop: 15,}}>Create Account

     </Text>
    </TouchableOpacity>
    
    
    </View>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
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
     marginTop: 15,}}>Already Registered? Press here to login.
     
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