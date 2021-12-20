import React, { Component, Fragment} from 'react';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity , Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base'
import SearchableDropdown from 'react-native-searchable-dropdown';
import ViewPager from '@react-native-community/viewpager';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  FirebaseRecaptcha,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier
} from 'expo-firebase-recaptcha';
import PhoneInput from 'react-native-phone-input'

var schools = [
  {
    id: 1,
    name: 'University of Texas at Austin',
  },
];

var classes = [
    {
      id: 1,
      name: 'Introduction to Programming (CS312)',
    },
    {
      id: 2,
      name: 'Foundations of Accounting (ACC310F)',
    },
    {
      id: 3,
      name: 'Data Structures (CS314)',
    },
    {
      id: 4,
      name: 'Issues/Policies In Amer Gov (GOV312L)',
    },
  ];
  
  const PAGE1 = 0;
  const PAGE2 = 1;
  const PAGE3 = 2;
  const PAGE4 = 3;
  
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
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loginText: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center'
    },
    phoneAuthContainer: {
      flex: 1,
      backgroundColor: '#aaa'
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
  });
  
export default class schoolClassSelect extends Component {
  checkForRealUser: FirebaseAuthApplicationVerifier;

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: null,
    };
  };

  constructor(props) {
    super(props);

    this.pager = React.createRef();

    this.renderPageOne = this.renderPageOne.bind(this);
    this.renderPageTwo = this.renderPageTwo.bind(this);
    this.renderPageThree = this.renderPageThree.bind(this);
    this.renderPageFour = this.renderPageFour.bind(this);
    this.setPage = this.setPage.bind(this);
    this.state = {
       selectedSchool: '',
       selectedClass: '',
       index: PAGE1, 
        displayName: '',
        // email: '', 
        signUpFailure: false,
        password: '',
        new: '',
        confirmPassword: '',
        isLoading: false,
        revealThePassword: true,
        phoneNumber: '+1 ' + '',
        confirmResult: null,
        email: '',
        verificationCode: '',
        phoneNumberValid: false,
        userId: '', 
      }
      this.passwordRevealer = this.passwordRevealer.bind(this)
    }

      validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(this.state.phoneNumber)
      }
    
      handleSendCode = () => {
        // This will set the proper screen to render for phone verification.
        this.setPage(PAGE4);
          // Firebase requirement for phone number verification.
        var appVerifier = this.checkForRealUser;
        // var phoneNumber = this.state.phoneNumber;
        // phoneNumber = '+' + this.phoneRef.getCountryCode() + phoneNumber;
        // Request to send OTP
        if (this.validatePhoneNumber) {
          firebase
            .auth()
            .signInWithPhoneNumber(this.state.phoneNumber, appVerifier)
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
    // const credentials = await firebase.auth.PhoneAuthProvider.credential(
    //   confirmResult, 
    //   verificationCode
    // );
    // var phoneNumber = this.state.phoneNumber; 
    // phoneNumber = '+' + ssas.getCountryCode() + phoneNumber;
    // var credentialEmail = firebase.auth.EmailAuthProvider.credential(phoneNumber + '@buttcheeks.com', this.state.new);
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
    confirmResult
    .confirm(verificationCode)
    .then(user => {
      this.registerUser();
        this.setState({ userId: user.uid })})
        .catch(error => {
        alert(error.message)
        console.log(error)
        })
        } else {
        alert('Please enter a 6 digit OTP code.')
      }
    }

    registerUser = () => {
      // if (this.state.new.length < 8 || this.state.confirm.length < 8) {
      //   Alert.alert(
      //     'Not Long Enough',
      //     'The new password must be at least 8 characters long. Try again'
      //   )
      // } else if (this.state.new !== this.state.confirm) {
      //   Alert.alert('Not Matching', 'The new password entries do not match. Try again')
      // this.setState({
      //   email: this.state.phoneNumber + '@gmail.com'
      // })
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
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
            phoneNumber: this.state.phoneNumber,
            // selectedSchool: this.state.selectedSchool,
            // selectedClass: this.state.selectedClass,
          })
          console.log('User registered successfully!')
          this.setState({
            isLoading: false,
            displayName: '',
            email: '', 
            password: '',
            phoneNumber: '',
            // selectedSchool: '',
            // selectedClass: '',
          })
          this.props.navigation.navigate('Dashboard')
        })
        .catch(error => this.setState({ signUpFailure: true }))      
      }
    }
  

    renderPageFour() {
    return (
      <View key = {PAGE4}
      style={styles.container}>
                   <Text 
              style = {{ 
            marginTop: -35, 
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 20, 
    textAlign: 'center',}}>An SMS will be arriving shortly. 💬
     </Text>
     <Text 
     style = {{ 
       marginBottom: 30,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: '#cd201f', 
    fontSize: 20, 
    textAlign: 'center',
    }}>Enter the 6 digit code below.
     </Text>
      <TextInput
                  style={{
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    fontSize: 20,
                    marginLeft: 25, 
                    height: '6%',
                    marginRight: 25,
                    backgroundColor: 'transparent',
                    marginBottom: 30,
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingHorizontal: 6}}
      placeholder='Verification Code'
      placeholderTextColor='lightgray'
      value={this.state.verificationCode}
      keyboardType='numeric'
      onChangeText={verificationCode => {
      this.setState({ verificationCode })
      }}
      maxLength={6}
      />

<TouchableOpacity 
onPress={this.handleVerifyCode}
style = {{borderRadius: 10, 
marginTop: 0, 
alignSelf: 'center',
shadowWidth: 1, 
shadowOffset: {width: 1, height: 1},
shadowColor: '#0084ff',
shadowOpacity: 300, 
height: 50, 
width: '55%', 
backgroundColor: '#0084ff'}}>
<Text style = {{ fontFamily: "Avenir", 
fontWeight: "bold", 
color: 'white', 
fontSize: 15, 
textAlign: 'center', 
marginTop: 15,}}>
Verify Code
</Text>
</TouchableOpacity> 
    <TouchableOpacity 
      onPress = {() => this.props.navigation.goBack()}
      style = {{borderRadius: 10, 
      marginTop: 10, 
      alignSelf: 'center',
      shadowWidth: 1, 
      shadowOffset: {width: 1, height: 1},
      shadowColor: '#cd201f',
      shadowOpacity: 300, 
      height: 50, 
      width: '55%', 
      backgroundColor: '#cd201f'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center', 
    marginTop: 15,}}>✕ Cancel 
    </Text>
    </TouchableOpacity> 
    </View>
      )
   }

    phoneNumberEntry = (text) => {
      //Maybe go look at the phone number parser in AddMembers
      if (text.length === 13) {
        this.setState({ phoneNumberValid: true, phoneNumber: text})
      }
      this.setState({ phoneNumber: text})
    }

  updateInputVal = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
  }

  passwordRevealer() {
    this.setState({revealThePassword: !this.state.revealThePassword})
  }

  accountInformationFieldChecker = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Please enter all fields to complete sign up.')
     } else if (this.state.confirmPassword !== this.state.password) {
      Alert.alert('Looks like your passwords do not match!') 
     } else {
       this.setPage(PAGE3);
     }
  }

  setPage(page) {
    this.setState({ index: page });
    this.pager.current.setPage(page);
  }

  renderPageTwo() {

    let classroomData = [{
      value: 'Intro to Programming (CS312)'
    }, {
      value: 'Fundamentals of Accounting (ACC310F)'
    }]
  
    if(this.state.isLoading && !this.state.signUpFailure){
      return(
        <View style={styles.preloader}>
             <Text style = {{textAlign: 'center',
   fontFamily: "Avenir",
    fontSize: 20}}>
      Verified. Thanks for signing up! 🤘
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
         key = {PAGE2}
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
                <Animatable.Text style = {{marginBottom: 40, fontSize: 60}} animation = 'tada' iterationCount = 'infinite' duration = {3000}>🤘</Animatable.Text>
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
    color: '#BF5700', 
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
        borderColor: '#BF5700',
        borderRadius: 10,
        paddingLeft: 10, 
        fontSize: 15,
         backgroundColor: 'white', 
         width: '85%',
          height: '5%' }}>
          </TextInput>
    
    {/* <Dropdown
    label = 'Select your class'
    data = {classroomData}>
    </Dropdown> */}
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
        borderColor: '#BF5700',
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
        borderColor: '#BF5700',
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
    onChangeText={(val) => this.updateInputVal(val, 'confirmPassword')}
    secureTextEntry = {this.state.revealThePassword}
      placeholder = 'Enter here..'
      placeholderStyle = {{paddingLeft: 30}}
      inputContainerStyle = {{paddingLeft: 20}}
      conentContainerStyle = {{marginLeft: 1200}}
      style = {{
        borderWidth: 1.1, 
        borderColor: '#BF5700',
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
                    size={17}>
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
        {/* onPress={() => this.registerUser()} */}
    <TouchableOpacity 
    onPress = {this.accountInformationFieldChecker}
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
     marginTop: 15,}}>Next ➟

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
   );
}

renderPageThree() {
  return (
  <SafeAreaView style={[{ backgroundColor: 'white' }]}
  key = {PAGE3}>
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
     maxLength = {10}
            value={this.state.phoneNumber}
            onChangePhoneNumber={this.phoneNumberEntry}
            initialCountry = 'us'
            ref={(ref) => {
              this.phoneRef = ref
            }}
            textStyle={{
              color: 'black',
              fontSize: 22,
            }}
            style={{
              borderColor: 'lightgray',
              borderWidth: 1,
              marginLeft: 20, 
              height: '6%',
              marginRight: 20,
              backgroundColor: 'transparent',
              marginBottom: 30,
              borderRadius: 15,
              paddingVertical: 10,
              paddingHorizontal: 5
            }}
          />
         <Text style={{marginLeft: 25, position: 'absolute',  fontFamily: "Avenir", alignSelf: 'center', fontSize: 10.5, marginBottom: 10}}>Please enter 10 digit phone number. SMS and DATA rates may apply.</Text>

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
    <TouchableOpacity onPress={() => this.setPage(PAGE2)}
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
    {this.state.confirmResult ? this.renderPageFour() : null}
        </View>
        </SafeAreaView>

 );
}
    

  renderPageOne() {
  return (
    <KeyboardAvoidingView 
    key={PAGE1}
    behavior="padding"
   style = {styles.container}>
    <Fragment>
        <Text 
              style = {{ 
            marginTop: -35, 
      fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 35, 
    textAlign: 'center',}}>Academic Information 
     </Text>
     <Text 
     style = {{ 
       marginBottom: 30,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: '#BF5700', 
    fontSize: 22, 
    textAlign: 'center',
    }}>Let's get you started.
     </Text>
     <Text 
     style = {{ 
       marginBottom: 10,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 15, 
    textAlign: 'center',
    }}>What school are you attending?
     </Text>
          {/* Single */}
          <SearchableDropdown
            onItemSelect={(item) => {
            //   const schools = this.state.selectedSchool;
            //   schools.push(item)
              this.setState({ selectedSchool: item.name});
            }}
            containerStyle={{ padding: 5 }}
            // onRemoveItem={(item, index) => {
            //   const schools = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: schools });
            // }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={schools}
            defaultIndex={0}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select a School 🏫",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
            <Text 
     style = {{ 
       marginBottom: 10,
       marginTop: 10, 
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 15, 
    textAlign: 'center',
    }}>What class are you signing up for?
     </Text>
         <SearchableDropdown
            onItemSelect={(item) => {
            //   const classes = this.state.selectedClass;
            //   classes.push(item)
              this.setState({ selectedClass: item.name });
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const classes = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedItems: classes });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={classes}
            defaultIndex={0}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select a Class ✏️",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                // onTextChange: text => item.name
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
            <View style = {{alignSelf: 'center', flexDirection: 'row'}}>

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
    marginRight: 10,
    width: '47%', 
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
            onPress = {() => this.setPage(PAGE2)}
    // onPress={() => this.props.navigation.navigate('studentSignUp', {school: this.state.selectedSchool, class: this.state.selectedClass})}
    // onPress={() => this.props.navigation.navigate('schoolClassSelect')}
    style = {{borderRadius: 10, 
    marginTop: 15, 
    shadowWidth: 1, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#BF5700',
    shadowOpacity: 300, 
    height: 50, 
    width: '47%', 
    backgroundColor: '#BF5700'}}>
    <Text style = {{ fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center',
     marginTop: 15,}}>Next →
     </Text>
    </TouchableOpacity>
    </View>
    
      </Fragment>
      <View style={{ height: 0 }} />
      </KeyboardAvoidingView>
         );
        }
      
        render() {
          // const { theme } = this.props;
          return (
            <View >
              <ViewPager
                initialPage={PAGE2}
                scrollEnabled={false}
                onPageSelected={(e) => this.setState({ index: e.position })}
                ref={this.pager}
                //keyboardDismissMode='none'
                orientation='horizontal'
                style={{ backgroundColor: 'white', height: '100%' }}>
                {this.renderPageOne()}
                {this.renderPageTwo()}
                {this.renderPageThree()}
                {this.renderPageFour()}
              </ViewPager>
            </View>
          );
        }
      }
      



