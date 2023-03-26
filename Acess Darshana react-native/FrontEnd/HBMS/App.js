// App.js
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import Contact from "./components/Contact";
import Map from "./components/Map";
import complain from "./components/Complain";
import Help_Support from "./components/Help_Support";

import Faq from "./components/Faq";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Help_Support" component={Help_Support} />
        <Stack.Screen name="Complain" component={complain} />
        
        <Stack.Screen name="Faq" component={Faq} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}