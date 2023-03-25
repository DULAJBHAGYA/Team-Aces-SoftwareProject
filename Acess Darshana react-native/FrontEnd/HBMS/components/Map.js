import React, { useEffect, useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from 'react-native-vector-icons';
import * as Font from 'expo-font';
import MapView from 'react-native-maps';

export default function Map() {
  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: 6.584748,
    longitude: 80.1996578,
    latitudeDelta: 0.0089,
    longitudeDelta: 0.9098,
  });

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
      title: 'Contacts', // Set Header Title
      headerTintColor: 'darkblue', // Set font color of navigation bar
      headerStyle: {
        backgroundColor: 'white', // Set background color of navigation bar
      },
      headerTitleStyle: {
        fontWeight: 'bold', // Set font weight of navigation bar
        fontFamily: 'Poppins-Regular',
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
    <SafeAreaView style={styles.container}>
        <MapView
        style={styles.map}
        initialRegion={region}
        scrollEnabled={true}
      />
      <View style={styles.overlay1}>
      <Text style={styles.text1} >Map</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Page1')}>
        <Text>Go to Page 1</Text>
      </TouchableOpacity>
      <Button
        title="Go Contacts"
        onPress={() => navigation.navigate("Contact")}
      />
      <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            
            
            
        onPress={() => alert('Login with Facebook')}>
        Login with Facebook
      </Icon.Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: 10,
  },
  text1: {
    flex: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomColor: '#ccc',
  },
  overlay: {
    
    top: 400,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  overlay1: {
    
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    
    paddingBottom: 100,
  },
});
