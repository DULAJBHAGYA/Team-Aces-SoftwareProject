// Complain.js
import React, { useEffect, useState } from "react";
import { Button, View, Text,TouchableOpacity,StyleSheet, TextInput,KeyboardAvoidingView,
  Platform,  } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import { Keyboard } from 'expo';
import axios from 'axios';
import Circles  from '../../Data/Circles.js';

import * as Font from 'expo-font';


export default function Complain({ navigation }) {

  const [emailIsValid, setEmailIsValid] = useState(false);
  const emailRegex = /^\S+@\S+\.\S+$/;

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complainType, setComplainType] = useState("");
  const [complain, setComplain] = useState("");


const validateEmail = (email) => {
  setEmailIsValid(emailRegex.test(email));
  return emailRegex.test(email);
};
  

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'), 
      });
    }

    loadFonts();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Complain', // Set Header Title
      headerTintColor: 'darkblue', // Set font color of navigation bar
      headerStyle: {
        backgroundColor: 'white', // Set background color of navigation bar
      },
      headerTitleStyle: {
        fontWeight: 'bold', // Set font weight of navigation bar
        fontFamily: 'Poppins-Bold', // Set font family of navigation bar
        fontSize: 30,
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="home" size={25} color="darkblue" style={styles.Home_icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSubmit = async () => {
    // Check if any of the fields are empty
    if (!name || !email || !complainType || !complain) {
      Alert.alert(
        'Error',
        'Please fill out all fields before submitting your complaint.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        {
          titleStyle: {
            color: 'darkblue',
            fontFamily: 'Poppins-Bold',
            fontSize: 20
          },
          alertStyle: {
            backgroundColor: 'lightblue' // Change the background color of the alert box here
          }
        }
      );
    } else if (!validateEmail(email)) {
      Alert.alert(
        'Error',
        'Please enter a valid email address.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        {
          titleStyle: {
            color: 'darkblue',
            fontFamily: 'Poppins-Bold',
            fontSize: 20
          },
          alertStyle: {
            backgroundColor: 'lightblue' // Change the background color of the alert box here
          }
        }
      );
    } else {
      // Set loading state to true
      setIsLoading(true);
  
      try {
        // Send POST request to backend API
        await axios.post('http://10.10.18.244:4000/api/data', {
          name,
          email,
          complainType,
          complain,
        });
  
        // Show success alert
        Alert.alert(
          'Complain Submit Success',
          'We apologize for the need to submit a complaint. Your concerns have been addressed to the Authority in the Transport. Please be assured that we will review your concerns and take the necessary action to resolve the problem.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          {
            titleStyle: {
              color: 'darkblue',
              fontFamily: 'Poppins-Bold',
              fontSize: 20
            },
            alertStyle: {
              backgroundColor: 'lightblue' // Change the background color of the alert box here
            }
          }
        );
      } catch (error) {
        // Show error alert
        Alert.alert(
          'Error',
          'An error occurred while submitting your complaint. Please try again later.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          {
            titleStyle: {
              color: 'darkblue',
              fontFamily: 'Poppins-Bold',
              fontSize: 20
            },
            alertStyle: {
              backgroundColor: 'lightblue' // Change the background color of the alert box here
            }
          }
        );
      }
  
      // Set loading state back to false
      setIsLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}>
     <Circles /> 
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>
     <View style={styles.inputContainer}>
  <Text style={styles.label}>Email Address</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter your email address"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCompleteType="email"
    textContentType="emailAddress"
  />
</View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Complain Type</Text>
        <Picker
          style={[styles.dropdown, {  borderWidth: 2, borderColor: 'darkblue', backgroundColor: 'white' }]}
          selectedValue={complainType}
          onValueChange={setComplainType}>
          <Picker.Item label="Complain list (please select) " value="" />
          <Picker.Item label="Incorrect fare charge" value="Incorrect fare charge" />
          <Picker.Item label="Attitude or behavior of staff" value="Attitude or behavior of staff" />
          <Picker.Item label="Personal security" value="Personal security" />
          <Picker.Item label="Reliability and punctuality" value="Reliability and punctuality" />
          <Picker.Item label="Other..." value="Other..." />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Complain</Text>
        <TextInput
          style={[styles.input, { height: 180 ,textAlignVertical: 'top'}]}
          placeholder="Enter your complain here"
          numberOfLines={20}
          value={complain}
          onChangeText={setComplain}
        />
      </View>
     
      <TouchableOpacity
         style={styles.submitButton}
         onPress={handleSubmit}
         disabled={isLoading}
      >
     <Text style={styles.submitButtonText}>
     {isLoading ? "Submitting..." : "Submit"}
    </Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 0, 
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'darkblue',
  },
  input: {
    borderWidth: 1,
    borderColor: 'darkblue',
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    padding: 10,
    alignContent: 'center',
  },
  dropdown: {
    borderWidth:2,
    borderColor: 'darkblue',
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    padding: 10,
    height: 50,
    backgroundColor: 'white' 
  },
  submitButton: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 18,
  },
  Home_icon: {
    marginRight: 2,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

