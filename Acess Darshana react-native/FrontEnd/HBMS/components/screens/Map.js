import React, { useEffect, useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
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
        'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../..//assets/Fonts/Poppins-Bold.ttf'),
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

  const handleEmergencyCall = () => {
    Linking.openURL('tel: 1969');
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        scrollEnabled={true}
      />

      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => handleEmergencyCall('1969')} style={styles.emergencyButton}>
          <FontAwesome5 name="phone" size={25} color="white" style={styles.emergencyIcon} />
          <Text style={styles.emergencyText}>Expressway Hotline   1969</Text>
        </TouchableOpacity>
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
    position: 'absolute',
    bottom: 30,
    right: 26,
  },
  emergencyButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyIcon: {
    marginRight: 8,
  },
  emergencyText: {color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},
emergencyIcon: {
marginRight: 10,
},
});
