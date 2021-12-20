import React, { Component, Fragment} from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity , Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


var schools = [
  {
    id: 1,
    name: 'University of Texas at Austin',
  },
//   {
//     id: 2,
//     name: 'University of California, Berkeley',
//   },
//   {
//     id: 3,
//     name: 'Stanford University',
//   },
//   {
//     id: 4,
//     name: 'Carnegie Mellon University',
//   },
//   {
//     id: 5,
//     name: 'Cornell University',
//   },
//   {
//     id: 6,
//     name: 'Columbia University',
//   },
//   {
//     id: 7,
//     name: 'University of Pennsylvania',
//   },
//   {
//     id: 8,
//     name: 'Dartmouth College',
//   },
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

export default class schoolClassTeacherSelect extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
       selectedSchool: '',
       selectedClass: '',
    //   selectedItems: [
    //     {
    //       id: 7,
    //       name: 'Go',
    //     },
    //     {
    //       id: 8,
    //       name: 'Swift',
    //     }
    //   ]
    }
  }
  render() {
  return (
      <KeyboardAvoidingView 
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
    color: '#0198E1', 
    fontSize: 22, 
    textAlign: 'center',
    }}>Let's get you started.
     </Text>

     {/* <Text 
     style = {{ 
       marginBottom: 30,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: '#BF5700', 
    fontSize: 22, 
    textAlign: 'center',
    }}>University: {this.state.selectedSchool} 
    Class:  {this.state.selectedClass}.
     </Text> */}

     <Text 
     style = {{ 
       marginBottom: 10,
       fontFamily: "Avenir", 
    fontWeight: "bold", 
    color: 'black', 
    fontSize: 15, 
    textAlign: 'center',
    }}>What school do you teach at?
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
            defaultIndex={2}
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
    }}>Please select your class code:
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
    onPress={() => this.props.navigation.navigate('staffSignUp')}
    // onPress={() => this.props.navigation.navigate('studentSignUp', {school: this.state.selectedSchool, class: this.state.selectedClass})}
// onPress={() => this.props.navigation.navigate('schoolClassSelect')}
style = {{borderRadius: 10, 
marginTop: 15, 
shadowWidth: 1, 
shadowOffset: {width: 1, height: 1},
shadowColor: '#0198E1',
shadowOpacity: 300, 
height: 50, 
width: '47%', 
backgroundColor: '#0198E1'}}>
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
});