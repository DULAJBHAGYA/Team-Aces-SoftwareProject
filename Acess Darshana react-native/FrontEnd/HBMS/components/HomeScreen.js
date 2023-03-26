import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
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
      title: 'Home',
      headerTintColor: 'darkblue',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        fontSize: 30,
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="gear" size={24} color="darkblue" style={styles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}

          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.contactsButton]}
          onPress={() => navigation.navigate('Map')}>
          <FontAwesome
            name="address-book"
            size={24}
            color="darkblue"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Find Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.viewAllButton]}
          onPress={() => navigation.navigate('Contact')}>
          <FontAwesome
            name="th-list"
            size={24}
            color="darkblue"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>View All Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.helpButton]}
          onPress={() => navigation.navigate('Help_Support')}>
          <FontAwesome
            name="question-circle"
            size={24}
            color="darkblue"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.complainButton]}
          onPress={() => navigation.navigate('Complain')}>
          <FontAwesome
            name="exclamation-circle"
            size={24}
            color="darkblue"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Complain</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.faqButton]}
          onPress={() => navigation.navigate('Faq')}>
          <FontAwesome
            name="question-circle"
            size={24}
            color="darkblue"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>FAQ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
 
  logoContainer: {
    marginTop: -10,
  },
  logo: {
    height: 200,
    width: 200,
  },
  buttonContainer: {
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginLeft: 20,
  },
  buttonIcon: {
    marginLeft: 30,
  },
  icon: {
    marginRight: 20,
  },
  contactsButton: {
    backgroundColor: '#CCE5FF',
  },
  viewAllButton: {
    backgroundColor: '#FFEDCC',
  },
  helpButton: {
    backgroundColor: '#D1E0E0',
  },
  complainButton: {
    backgroundColor: '#FFCCE5',
  },
  faqButton: {
    backgroundColor: '#D6C2FF',
  },
});

export default HomeScreen;