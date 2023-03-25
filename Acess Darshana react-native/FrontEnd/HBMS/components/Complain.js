// Complain.js
import React, { useEffect, useState } from "react";
import { Button, View, Text,TouchableOpacity,StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from 'react-native-vector-icons';

import * as Font from 'expo-font';


export default function Complain({ navigation }) {


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
          <FontAwesome5 name="home" size={25} color="darkblue" style={styles.icon} />
        </TouchableOpacity>
      ),
      
      
      
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        
      <Text>Complain</Text>
      <Button
        title="Go to home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>



  );
}

const styles = StyleSheet.create({
   
    icon: {
      marginRight: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        },
        heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        },
        inputContainer: {
        marginBottom: 10,
        },
        label: {
        fontSize: 18,
        marginBottom: 5,
        },
        input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        },
        dropdown: {
        borderWidth: 1,
        borderColor: '#ddd',
        },
        submitButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        },
        submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        },
        
})