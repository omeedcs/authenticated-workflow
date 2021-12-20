import React, { Component } from 'react'
// import * as React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Button,
  View,
  ButtonGroup,
  Text,
  TextInput,
} from 'react-native'
import firebase from '../database/firebase';
// import * as firebase from 'firebase';
import {
    FirebaseRecaptcha,
    FirebaseRecaptchaVerifier,
    FirebaseRecaptchaVerifierModal,
    FirebaseAuthApplicationVerifier
  } from 'expo-firebase-recaptcha';
import PhoneInput from 'react-native-phone-input'



class PhoneAuthScreen extends Component {
    checkForRealUser: FirebaseAuthApplicationVerifier;
  
    state = {
      phone: '+1 ' + '',
      confirmResult: null,
      verificationCode: '',
      phoneNumberValid: false,
      userId: '',
  }
    validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(this.state.phone)
      }
    
      handleSendCode = () => {
          // Firebase requirement for phone number verification.
        var appVerifier = this.checkForRealUser;
        var phone = this.state.phone;
        phone = '+' + this.phoneRef.getCountryCode() + phone;
        // Request to send OTP
        if (this.validatePhoneNumber) {
          firebase
            .auth()
            // .RecaptchaVerifier,
            .signInWithPhoneNumber(this.state.phone, appVerifier)
            .then(confirmResult => {
              this.setState({ confirmResult })
            })
            .catch(error => {
              alert(error.message)
      
              console.log(error)
            })
        } else {
          alert('Invalid Phone Number')
        }
        
        this.setState({ phoneNumberValid: true, confirmResult: null, verificationCode: '' })
    }
   
    handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
    confirmResult
    .confirm(verificationCode)
    .then(user => {
        this.setState({ userId: user.uid })
        alert(`Verified! ${user.uid}`)
        })
        .catch(error => {
        alert(error.message)
        console.log(error)
        })
        } else {
        alert('Please enter a 6 digit OTP code.')
      }
    }

    renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
      <TextInput
      style={styles.textInput}
      placeholder='Verification code'
      placeholderTextColor='#eee'
      value={this.state.verificationCode}
      keyboardType='numeric'
      onChangeText={verificationCode => {
      this.setState({ verificationCode })
      }}
      maxLength={6}
      />
      <TouchableOpacity
      style={[styles.themeButton, { marginTop: 20 }]}
      onPress={this.handleVerifyCode}>
      <Text style={styles.themeButtonTitle}>Verify Code</Text>
      </TouchableOpacity>
      </View>
      )
   }

    phoneNumberEntry = (text) => {
      //Maybe go look at the phone number parser in AddMembers
      if (text.length === 13) {
        this.setState({ phoneNumberValid: true, phone: text})
      }
      this.setState({ phone: text})
    }

  
  render(){
      return(
        <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
        <View style={styles.page}>
        <FirebaseRecaptchaVerifierModal
    // ref = {recaptchaVerifierz}
    ref={(ref) => (this.checkForRealUser = ref)}
    // containerStyle = {{backgroundColor: 'transparent', width: '100%', }}
    // contentContainerStyle = {{backgroundColor: 'white'}}
    style={{
      alignItems: 'center',
      marginRight: 31,
      backgroundColor: 'transparent',
      flexDirection: 'column',
      width: '100%',
      left: 0,
       margin: 0,
       right: 0, 
       bottom: 0,
       top: 0,
    }}
    title='UTOH Verification System'
    cancelLabel = 'Close'
    firebaseConfig={firebase.app().options}/>
             <Text 
              style = {{ 
            marginTop: -35, 
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 35, 
    textAlign: 'center',}}>User Authentication
     </Text>
     <Text 
     style = {{ 
       marginBottom: 30,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: '#BF5700', 
    fontSize: 22, 
    textAlign: 'center',
    }}>What is your phone number?
     </Text>
     <PhoneInput
            value={this.state.phone}
            onChangePhoneNumber={this.phoneNumberEntry}
            initialCountry = 'us'
            ref={(ref) => {
              this.phoneRef = ref
            }}
            textStyle={{
              color: 'black',
              fontSize: 22,
              // fontFamily: Theme.mf
            }}
            style={{
              borderColor: 'lightgray',
              borderWidth: 1,
              marginLeft: 20, 
              height: '6%',
              marginRight: 20,
              backgroundColor: 'transparent',
              marginBottom: 20,
              borderRadius: 15,
              paddingVertical: 10,
              paddingHorizontal: 5
            }}
          />
        {/* <TextInput
  style={{ marginVertical: 10, fontSize: 17 }}        
  placeholder="+1 999 999 9999"
  autoFocus
  autoCompleteType="tel"
        placeholderTextColor='#eee'
        textContentType="telephoneNumber"
        keyboardType='phone-pad'
        value={this.state.phone}
        onChangeText={phone => {
        this.setState({ phone })
        }}
        maxLength={15}
        editable={this.state.confirmResult ? false : true}/> */}
         {/* {this.phoneNumberValid ? */}
           {this.state.phoneNumberValid && (
           <TouchableOpacity 
           title = 'Send Code'
                    onPress={
                  this.state.confirmResult
                  ? this.changePhoneNumber
                  : this.handleSendCode}
                  disabled={!this.state.phoneNumberValid}
                  disabledTitleStyle={{color: 'lightgray'}}  
                  disabledStyle = {{
                    backgroundColor: 'gray'}}
                    
    style = {{borderRadius: 10, 
    marginTop: 15, 
    height: 50,
    shadowWidth: 1, 
    alignSelf: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#BF5700',
    shadowRadius: 5, 
    shadowOpacity: 300, 
    height: 50, 
    width: '75%', 
    backgroundColor: '#BF5700'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}> {this.state.confirmResult ? 'Send New Code' : 'Send Code'}
     </Text>
    </TouchableOpacity>)}

    {!this.state.phoneNumberValid && (
           <TouchableOpacity 
           title = 'Send Code'
                    onPress={
                  this.state.confirmResult
                  ? this.changePhoneNumber
                  : this.handleSendCode}
                  disabled={!this.state.phoneNumberValid}
                  disabledTitleStyle={{color: 'lightgray'}}  
                  disabledStyle = {{
                    backgroundColor: 'gray'}}
                    
    style = {{borderRadius: 10, 
    marginTop: 15, 
    height: 50,
    shadowWidth: 1, 
    alignSelf: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'gray',
    shadowOpacity: 300, 
    shadowRadius: 5,
    height: 50, 
    width: '75%', 
    backgroundColor: 'gray'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'darkgray', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Send Code
     </Text>
    </TouchableOpacity>)}
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
width: '50%', 
backgroundColor: '#5F9F9F'}}>
<Text style = {{ fontFamily: "Avenir", 
fontWeight: "bold", 
color: 'white', 
fontSize: 15, 
textAlign: 'center',
 marginTop: 15,}}>↵ Back
 </Text>
</TouchableOpacity>
    {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
        </View>
        </SafeAreaView>
       );
      }
    }
    

  const Separator = () => (
      <View style={styles.separator} />
    );

const styles = StyleSheet.create({
    phoneAuthContainer: {
      flex: 1,
      backgroundColor: '#aaa'
    },
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInput: {
      marginTop: '50%',
      width: '90%',
      height: 40,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5,
      borderRadius: 30,
      paddingLeft: 10,
      color: 'black',
      fontSize: 16
    },
    themeButton: {
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#888',
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5
    },
    themeButtonTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
      backgroundColor: 'gray',
      marginLeft: 10, 
      marginRight: 10, 
    },
    verificationView: {
      width: '100%',
      alignItems: 'center',
      marginTop: 25
    }
  })
  
  
  export default PhoneAuthScreen;