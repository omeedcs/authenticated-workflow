// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, ScreenContainer, SafeAreaView, Image, TouchableOpacity, ScrollView, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
// import firebase from 'firebase';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import RNTwitterLikeHeader from 'react-native-twitter-like-header';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'; 
import TouchableScale from 'react-native-touchable-scale';
import AddButton from './AddButton';
import CompanyLogo from './CompanyLogo';
import { ListItem, SearchBar, Header } from 'react-native-elements'
import firebaseSvc from '../database/FirebaseSvc';
// import firebaseSDK from '../database/firebaseSDK';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default class Dashboard extends Component {

  constructor(props) {
    super(props);

  this.state = {
    messages: [],
  }
}


  componentDidMount() {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),}))
    );
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }


  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  get user() {
    return {
     name: '',
     email: '',
     avatar: require('../assets/hookem.png'),
      _id: firebaseSvc.uid,
      userIsAdmin: false,
    };
  }

  checkIfAdmin() {
    if (firebaseSvc.uid === 'KsGzPaMfUOghm5aKAmkxmPfgdy53') {
      this.setState({userIsAdmin: true})
    } else {
      this.setState({userIsAdmin: false})
    }
  }

  render() {
    console.log(firebaseSvc.uid);
    return (
      // <Header 
      // containerStyle={{
      //   height: 100,
      //   backgroundColor: 'white',
      //   justifyContent: 'space-around',
      //   borderBottomWidth: .5,
      //   borderBottomColor: 'lightgray',
      // }}
    
      // leftComponent={{icon: 'menu', iconStyle: {fontSize: 27, alignSelf: 'center',
      // color: '#BF5700',}}}
      // rightComponent={{icon: 'send', iconStyle: {fontSize: 27, alignSelf: 'center',
      // color: '#BF5700',}}}
      // centerComponent={<CompanyLogo />}/>
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSvc.send}
        renderUsernameOnMessage = {true}
        user = {this.user}
        showUserAvatar = {true}
        showUserUid = {true}
        // showUserName = {true}
        isTyping = {true}
        alwaysShowSend = {this.checkIfAdmin}
      >
      </GiftedChat>
/* <View style = {{marginBottom: 100}}>
 
  <View>
  
      </View>
      </View> */
    );
  }
}

    // rightComponent={{ icon: 'home', style: { color: 'black' } }}
    // linearGradientProps={{
    //   colors: ['white', 'white'],
    //   start: { x: 1, y: 0 },
    //   end: { x: 0, y: 1 },
    // }}

    {/* <ScrollView style = {styles.titleStyle}>
        <Text style = {{marginTop: 10, paddingLeft: 20, fontWeight: 'bold', fontFamily: "Avenir", fontSize: 25, color: 'black'}}>
          Hello, {this.state.displayName}! 👋 
        </Text>


        </ScrollView>
 */}


       {/* centerComponent={{ text: 'Home', style: { fontSize: 17, fontWeight: 'bold', fontFamily: 'Avenir', color: 'white' }}}
   style = {{ 
     */}
    {/* flexDirection: 'row',
             alignItems: 'center',

             justifyContent: 'flex-start',
            flex: 1,}} */}
            
      
        {/* <Text>{this.state.displayName}</Text>      s
        <Text>{this.state.phoneNumber}</Text>      
        <Text>{this.state.uid}</Text>      
        <Text>{this.state.email}</Text>      */}


// // Logout button:

// {/* <Button
// color="#3740FE"
// title="Logout"
// onPress={() => this.signOut()}
// /> */

// const HomeScreen = ({ navigation }) => {

  
//   const SettingsScreen = ({ navigation }) => {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
// //   }

// const user = {
//   name: this.state.name,
//   email: this.state.email,
//   password: this.state.password,
//   avatar: this.state.avatar,
// };


// const { navigation, route } = props;
// const params = route.params;



      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginLeft: 20,
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
  },
  
  titleStyle: {
    color: 'black',
    backgroundColor: 'white',
    marginBottom: 5,
    fontFamily: "Avenir", 
    fontWeight: 'bold',
  },
});

