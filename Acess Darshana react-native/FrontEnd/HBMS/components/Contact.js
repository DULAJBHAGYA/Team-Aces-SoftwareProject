// Contact.js
import React, { useEffect, useState } from "react";
import { Button, View, Text,TouchableOpacity,StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from 'react-native-vector-icons';

import * as Font from 'expo-font';


export default function Contact({ navigation }) {


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
      title: 'All Contacts', // Set Header Title
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
      <Text> Contacts</Text>
      <Button
        title="Help&Support"
        onPress={() => navigation.navigate("Help_Support")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
   
    icon: {
      marginRight: 10,
    },
})