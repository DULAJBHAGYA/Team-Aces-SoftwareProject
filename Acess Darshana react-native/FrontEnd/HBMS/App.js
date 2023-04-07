// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/screens/HomeScreen";
import Contact from "./components/screens/Contact";
import Map from "./components/screens/Map";
import complain from "./components/screens/Complain";
import Help_Support from "./components/screens/Help_Support";
import ViewComplaints from "./components/screens/ViewComplaints";

import Faq from "./components/screens/Faq";

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
        <Stack.Screen name="ViewComplaints" component={ViewComplaints} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}