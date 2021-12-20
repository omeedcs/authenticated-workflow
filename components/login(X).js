// components/login.js

import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity , Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base'
import {
  FirebaseRecaptcha,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier
} from 'expo-firebase-recaptcha';
import PhoneInput from 'react-native-phone-input'
import { Header, Input } from 'react-native-elements';

// var actionCodeSettings = {
//   url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
//   iOS: {
//     bundleId: 'com.example.ios'
//   },
//   android: {
//     packageName: 'com.example.android',
//     installApp: true,
//     minimumVersion: '12'
//   },
//   handleCodeInApp: true,
//   // When multiple custom dynamic link domains are defined, specify which
//   // one to use.
//   dynamicLinkDomain: "example.page.link"
// };
// firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
//   .then(function() {
//     // Verification email sent.
//   })
//   .catch(function(error) {
//     // Error occurred. Inspect error.code.
//   });


export default class Login extends Component {

  constructor() {
    super();
    this.state = { 
      email: '', 
      loginFailure: false,
      revealThePassword: true, 
      trickTheSystem: '', 
      password: '',
      isLoading: false
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

  userLogin = () => {
    // let trickCompToTakeNum = '+1 ' + this.state.phone + "@ranstuff.com"
    let userEmail = this.state.email; 
    var appVerifier = this.checkForRealUser;
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Please fill fields to complete login!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      // .signInWithPhoneNumber(this.state.email, appVerifier)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ loginFailure: true}))
    }
  }

  render() {
    if(this.state.isLoading && !this.state.loginFailure){
      return(
        <View style={styles.preloader}>
        {/* <Text style = {{textAlign: 'center',
fontFamily: "Avenir",
fontSize: 20}}>
 Welcome back! ❤️
</Text>
<Text style = {{
   color: '#BF5700', 
   textAlign: 'center', 
fontFamily: "Avenir", 
fontSize: 20,
marginBottom: 20}}>Please wait while we load your account.
</Text> */}
     <ActivityIndicator size="large" color="#BF5700"/>
   </View>
      )
    }    
          return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <KeyboardAvoidingView
        // behavior = "padding"
        style={styles.loginContainer}>
                {/* <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        // leftComponent={<MyCustomLeftComponent />}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        containerStyle={{
          backgroundColor: '#3D6DCC',
          alignSelf: 'flex-start',
          justifyContent: 'space-around',
        }}
      /> */}
         
                  {/* behavior={Platform.OS == "ios" ? "padding" : "height"} */}

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
    fontSize: 35, 
    textAlign: 'center',}}>Welcome back! 🎉
     </Text>
     <Text 
    
     style = {{ 
       marginBottom: 30,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 20, 
    textAlign: 'center',
    }}>Let's get you logged in.
     </Text>
    
      <TextInput 
      onChangeText={(val) => this.updateInputVal(val, 'email')}
      placeholder = 'Email'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: 1, 
        borderColor: 'lightgray',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 20,
         backgroundColor: 'white', 
         width: '75%',
          height: '5%' }}>
          </TextInput>
          
          <TextInput 
    onChangeText={(val) => this.updateInputVal(val, 'password')}
      placeholder = 'Password'
      secureTextEntry = {this.state.revealThePassword}
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        marginTop: 10,
        borderWidth: 1, 
        borderColor: 'lightgray',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 20,
         backgroundColor: 'white', 
         width: '75%',
          height: '5%' }}>
          </TextInput>

          {this.state.loginFailure && (
                  <Animatable.Text animation = 'pulse' duration = {3000} iterationCount = 'infinite'
                    containerStyle={{marginTop: 30, borderRadius: 50}}
                    style={{
                      backgroundColor: 'white',
                      color: 'red',
                      position: 'absolute',
                      padding: 13,
                      marginLeft: 30,
                      borderRadius: 25,
                      bottom: '24.5%',
                    }}
                    size={17}>
                    Uh oh! No username and password match. {"\n"}Please try again or recover password.
                  </Animatable.Text>
                 )}
          <Icon     
          size = {20}
          onPress={this.passwordRevealer}
           style={{
           position: 'absolute',
           right: 62,
           top: '48%',
           alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'black',
          fontSize: 27,
          color: 'black',}}
          name={this.state.revealThePassword ? 'eye-off' : 'eye'}
          tyep='material-community'
          color='#000'/>
        
                
    <TouchableOpacity    
     onPress={() => this.userLogin()}
    title = 'hello' 
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
     marginTop: 15,}}>Login
     </Text>
    </TouchableOpacity>
    <View style = {{alignSelf: 'flex-end', marginRight: 50, flexDirection: 'row'}}>

    
    <TouchableOpacity 
    // Sign In Button
    onPress={() => this.props.navigation.navigate('Home')}
    style = {{borderRadius: 10, 
    marginTop: 20, 
    shadowWidth: 1, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#5F9F9F',
    shadowOpacity: 300, 
    height: 50, 
    width: 150, 
    backgroundColor: '#5F9F9F'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>↵ Back
     </Text>
    </TouchableOpacity>

    <TouchableOpacity
    //  onPress={() => navigation.navigate('Get Started')}
    title = 'hello' 
    style = {{borderRadius: 10, 
    marginTop: 20, 
    shadowWidth: 1, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'gray',
    shadowOpacity: 300, 
    height: 50, 
    marginLeft: 15,
    width: 150, 
    backgroundColor: '#FF6347'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Forgot Password
     </Text>
    </TouchableOpacity>
    
    </View>
     </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
          
      );
    };
}



//       <View style={styles.container}>  
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Email"
//           value={this.state.email}
//           onChangeText={(val) => this.updateInputVal(val, 'email')}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Password"
//           value={this.state.password}
//           onChangeText={(val) => this.updateInputVal(val, 'password')}
//           maxLength={15}
//           secureTextEntry={true}
//         />   
//         <Button
//           color="#3740FE"
//           title="Signin"
//           onPress={() => this.userLogin()}
//         />   

//         <Text 
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Signup')}>
//           Don't have account? Click here to signup
//         </Text>                          
//       </View>
//     );
//   }
// }


  // If null, no SMS has been sent

  // const [confirm, setConfirm] = useState(null);

  // const [code, setCode] = useState('');

  // // Handle the button press
  // async function signInWithPhoneNumber(phoneNumber) {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // }

  // async function confirmCode() {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
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
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});