// Complain.js
import React, { useEffect, useState } from "react";
import { Button, View, Text,TouchableOpacity,StyleSheet, TextInput,  } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Keyboard } from 'expo';


import * as Font from 'expo-font';


export default function Complain({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complainType, setComplainType] = useState("");
  const [complain, setComplain] = useState("");

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/Fonts/Poppins-Bold.ttf'),
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

  const handleSubmit = () => {
    // Do something with the form data
    console.log(name, email, complainType, complain);
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: 430,
          height: 377,
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 450,
            left: 110,
            width: 300,
            height: 300,
            borderRadius: 300,
            backgroundColor: 'rgba(132, 206, 235, 0.3)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 350,
            left: 250,
            width: 300,
            height: 300,
            borderRadius: 300,
            backgroundColor: 'rgba(132, 206, 235, 0.3)',
          }}
        />
      </View>
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
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Complain Type</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={complainType}
          onValueChange={setComplainType}>
          <Picker.Item label="Complain list (please select) " value="" />
          <Picker.Item label="Type 1" value="Type 1" />
          <Picker.Item label="Type 2" value="Type 2" />
          <Picker.Item label="Type 3" value="Type 3" />
          <Picker.Item label="Type 4" value="Type 4" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Complain</Text>
        <TextInput
          style={[styles.input, { height: 180 }]}
          placeholder="Enter your complain here"
          numberOfLines={20}
          value={complain}
          onChangeText={setComplain}
        />
      </View>
     
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
</TouchableOpacity>

</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 0, // add top padding
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
  },
  dropdown: {
    borderWidth:2,
    borderColor: 'darkblue',
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    padding: 10,
    height: 50,
    
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
});

