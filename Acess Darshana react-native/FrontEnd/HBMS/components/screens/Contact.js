import React, { useEffect, useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Platform, Linking, Clipboard } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from 'react-native-vector-icons';
import Circles  from '../../Data/Circles.js';
import * as Font from 'expo-font';
import DATA from '../../Data/contact_details.js';

export default function Contact({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [contacts, setContacts] = useState(DATA); // <-- added this state variable

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
          <FontAwesome name="home" size={25} color="darkblue" style={styles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const toggleModal = (item) => {
    setSelectedPhoneNumber(item.phone);
    setSelectedContact(item.name);
    setModalVisible(!modalVisible);
  };

  const handleCopyPress = (phoneNumber) => {
    Clipboard.setString(phoneNumber);
    setModalVisible(false);
  };

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.contactContainer} onPress={() => toggleModal(item)}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Circles /> 
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        >
        <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{selectedContact}</Text>
        <Text style={styles.modalPhone}>{selectedPhoneNumber}</Text>
        <View style={styles.modalButtonsContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={() => handleCallPress(selectedPhoneNumber)}>
        <FontAwesome name="phone" size={25} color="white" />
        <Text style={styles.modalButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={() => handleCopyPress(selectedPhoneNumber)}>
        <FontAwesome name="copy" size={25} color="white" />
        <Text style={styles.modalButtonText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
        <FontAwesome name="close" size={25} color="white" />
        <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
        </View>
        </View>
        </Modal>
        </SafeAreaView>
        );
        }
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'row',
          },
          contactContainer: {
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#ddd',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 30,
          },
          contactName: {
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Bold',
            marginBottom: 5,
          },
          contactPhone: {
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            color: '#555',
          },
          modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: 'white',
            borderWidth: 2,
            paddingHorizontal: 4,
            paddingVertical: 50,
            position: 'absolute',
            top: '30%',
            left: '10%',
            borderColor: '#ddd',
             shadowColor: '#000',
            shadowOffset: {
             width: 0,
             height: 3,
                         },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          },
          modalTitle: {
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Bold',
            color: '#444',
            marginBottom: 20,
          },
          modalPhone: {
            fontSize: 28,
            fontFamily: 'Poppins-Regular',
            fontWeight: 'bold',
            color: '#777',
            marginBottom: 20,
          },
          modalButtonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10
          },
          modalButton: {
            backgroundColor: '#4a90e2',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            width: '25%',
            marginHorizontal: 5,
          },
          modalButtonText: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            marginTop: 5,
          },
          icon: {
            marginRight: 20,
          },
        });
        
