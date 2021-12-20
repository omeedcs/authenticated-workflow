import { StatusBar } from 'expo-status-bar';
import {TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Button, Platform, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, Image, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createTabNavigator } from '@react-navigation/tab';
import Ionicons from 'react-native-vector-icons/Ionicons';

import studentSignUp from './components/studentSignUp';
import staffSignUp from './components/staffSignUp';
import selectSignUp from './components/selectSignUp';
import schoolClassSelect from './components/schoolClassSelect'
import schoolClassTeacherSelect from './components/schoolClassTeacherSelect';

import Login from './components/login';
import PhoneAuthScreen from './components/PhoneAuthScreen';
import Dashboard from './components/dashboard';
import tabTwo from './components/tabTwo';
import tabThree from './components/tabThree';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//  async function _loadFontsAsync() {
//   await Font.loadAsync({
//     'Avenir Book': require('./assets/fonts/FontsFree-Net-proxima_nova_reg-webfont.ttf'),
//     'Avenir Medium': require('./assets/fonts/FontsFree-Net-Proxima-Nova-Bold.otf')
//     'Avenir Roman': require('./assets/fonts/FontsFree-Net-Proxima-Nova-Bold.otf')

//   })
//   this.setState({fontLoaded: true})
// }

function chooseSignUp() {
  return (
<Stack.Navigator>

  <Stack.Screen
    name="selectSignUp"
    component={selectSignUp}
     options={{headerShown: false, title: ''}}/>
       <Stack.Screen
    name="studentSignUp"
    component={studentSignUp}
     options={{headerShown: false, title: ''}}/>
  <Stack.Screen
    name="staffSignUp"
    component={staffSignUp}
     options={{headerShown: false, title: ''}}/>
  <Stack.Screen
    name="schoolClassSelect"
    component={schoolClassSelect}
     options={{headerShown: false, title: ''}}/>
       <Stack.Screen
    name="schoolClassTeacherSelect"
    component={schoolClassTeacherSelect}
     options={{headerShown: false, title: ''}}/>

  </Stack.Navigator>
  )
}

function PostLogin() {
 return (
<Stack.Navigator>
<Stack.Screen
  // initialParams={{ name: this.props.navigate.params.name, email: this.props.navigate.params.email, avatar: this.props.navigate.params.avatar }}
  name="Dashboard"
  component={Dashboard}
   options={{headerShown: false, title: ''}}/>
   </Stack.Navigator>
 )
}

// function PostLogin() {
//   return (
//     <Tab.Navigator
//     animationEnabled = {true}
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused
//               ? 'ios-home'
//               : 'ios-home';
//           } else if (route.name === 'Feed') {
//             iconName = focused ? 'ios-planet' : 'ios-planet';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'ios-person' : 'ios-person';
//           }

//           // You can return any component that you like here!
//           return <Ionicons style = {{ marginTop: 7}}name={iconName} size={size} color={color} />;
//         },
//       })}
//       // This is how you get a SEE THROUGH tab bar in react native. 
//       tabBarOptions={{
//         style: {
//         // activeTintColor: 'transparent',
//         // inactiveTintColor: 'transparent',
//         backgroundColor: '#fff',
//         color: 'white',
//         position: 'absolute',
//         left: 0,
//         opacity: .9,
//         bottom: 0, 
//         right: 0, 
//       }}}>
//       <Tab.Screen name="Home" component={Dashboard} />
//       <Tab.Screen name="Feed" component={tabTwo} />
//       <Tab.Screen name ="Profile" component = {tabThree}/>
//     </Tab.Navigator>
// );
// }

export default function App() {
  return (
      // Hex color:	#BF5700 <- Burnt Orange! 
      // fontFamily: prop!
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
    name="Home"
    component={HomeScreen}
     options={{headerShown: false, title: ''}}/>
    <Stack.Screen  
    options={{
    headerStyle: {
    borderBottomWidth: 0}, 
    borderWidth: 0, 
    headerShown: false, 
    title: ''}}
    name="Login" 
    component={Login}/>

    <Stack.Screen 
    options={{
    headerShown: false, 
    title: ''}}
    name="Get Started" 
    component={chooseSignUp}/>

   <Stack.Screen 
    options={{ 
      cardStack: {
        gesturesEnabled: false,
        },
    headerShown: false, 
    title: ''}}
    name="Dashboard"
    component={PostLogin}/>

  </Stack.Navigator>
  </NavigationContainer>
  );
}


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Animatable.Image  iterationCount = 'infinite' 
    style = {{
    width: '85%', 
    height: '21%', 
    resizeMode: 'contain'}} 
    source={require('./assets/highresHookem.png')} 
    animation = 'tada' 
    duration = {3000}>
    </Animatable.Image>

  <Animatable.View 
  animation = 'fadeInUp' 
  duration = {2000}>
  <View style = {{
    justifyContent: 'center', 
    flexDirection: 'row'}}>

<TouchableOpacity 
onPress={() => navigation.navigate('Get Started')}
style = {{
borderRadius: 10, 
marginTop: 20, 
shadowWidth: 1, 
shadowOffset: {width: 1, 
height: 1},
shadowColor: '#BF5700',
shadowOpacity: 300, 
height: 50, 
width: 150, 
backgroundColor: '#BF5700'}}>
<Text style = {{ 
fontFamily: "Avenir", 
fontWeight: "bold", 
color: 'white', 
fontSize: 15, 
textAlign: 'center',
 marginTop: 15,}}>
   GET STARTED
 </Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={() => navigation.navigate('Login')}
  style = {{
  borderRadius: 10, 
  marginTop: 20, 
  shadowWidth: 1, 
  shadowOffset: {
  width: 1, 
  height: 1},
  shadowColor: '#BF5700',
  shadowOpacity: 300, 
  height: 50, 
  marginLeft: 15,
  width: 150, 
  backgroundColor: '#BF5700'}}>
  <Text style = {{ fontFamily: "Avenir", 
  fontWeight: "bold", 
  color: 'white', 
  fontSize: 15, 
  textAlign: 'center', 
  marginTop: 15,}}>
  LOGIN
  </Text>
  </TouchableOpacity> 

</View>

</Animatable.View>

<Animatable.View style = {styles.bottomView}
      animation = 'slideInUp'> 
   <Text style = {{ textAlign: 'center',  color: 'gray', 
    fontFamily: "Helvetica Neue", 
    fontSize: 17}}>Created by
   </Text>
   <Text style = {{textAlign: 'center',  color: '#BF5700', 
    fontFamily: "Helvetica Neue", 
    fontSize: 19}}>Omeed Tehrani
   </Text>
   </Animatable.View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  getStartedContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bottomView: {
      // Bottom View Style!
          width: '100%', 
          height: 105, 
          backgroundColor: 'transparent', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'absolute',
          bottom: 0
  },
});
