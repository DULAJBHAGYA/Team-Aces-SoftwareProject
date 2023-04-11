import React, {useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Animated, Easing } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import Circles  from '../../Data/Circles.js';


import * as Font from 'expo-font';


const HomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.log('Error loading fonts:', error);
    }
  };
  const startAnimation = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setButtonIndex(1));
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
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
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setButtonIndex(1));
    }
  }, [navigation, fontsLoaded]);

 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      startAnimation();
    });

    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    if (buttonIndex < 5) {
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 125,
        easing: Easing.ease,
        useNativeDriver: true,
        delay: 20,
      }).start(() => setButtonIndex(buttonIndex + 1));
    }
  }, [buttonIndex]);
  return (
    <SafeAreaView style={styles.container}>
       <Circles /> 
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}

          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
              style={[
                styles.button,
                styles.contactsButton,
                {
                  opacity: buttonIndex >= 1 ? 1 : 0,
                  transform: [
                    {
                      translateY: opacityValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 0],
                      }),
                    },
                  ],
                },
              ]}
              onPress={() => navigation.navigate('Map')}
            >
          <FontAwesome
            name="address-book"
            size={24}
            color="darkblue"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Find Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.viewAllButton,
            {
              opacity: buttonIndex >= 2 ? 1 : 0,
              transform: [
                {
                  translateY: opacityValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
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
          style={[styles.button, styles.helpButton,
            {
              opacity: buttonIndex >= 3 ? 1 : 0,
              transform: [
                {
                  translateY: opacityValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
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
          style={[styles.button, styles.complainButton,
            {
              opacity: buttonIndex >= 4 ? 1 : 0,
              transform: [
                {
                  translateY: opacityValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
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
          style={[styles.button, styles.faqButton,
            {
              opacity: buttonIndex >= 5 ? 1 : 0,
              transform: [
                {
                  translateY: opacityValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
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
    elevation: 10,
  },
  viewAllButton: {
    backgroundColor: '#FFEDCC',
    elevation: 10,
  },
  helpButton: {
    backgroundColor: '#D1E0E0',
    elevation: 10,
  },
  complainButton: {
    backgroundColor: '#FFCCE5',
    elevation: 10,
  },
  faqButton: {
    backgroundColor: '#D6C2FF',
    elevation: 10,
  },
});

export default HomeScreen;