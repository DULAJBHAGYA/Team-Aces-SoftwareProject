import BookYourSeat from "./screens/BookYourSeat";
import NeedLuggage from "./screens/NeedLuggage";
import BookYourLuggage from "./screens/BookYourLuggage";
//import LuggageTypes from "./screens/LuggageChart";
import PaymentInfo from "./screens/PaymentInfo";
//import PaymentSuccessAlert from "./components/paymentSuccessAlert";
//import PaymentErrorAlert from "./components/PaymentErrorAlert";
//import LuggageFeedback from "./screens/LuggageFeedback";
import Rating from "./screens/Rating";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Eticket from "./screens/Eticket";
import MenuPage from "./screens/MenuPage";

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MenuPage" component={MenuPage} options={options} />
        <Stack.Screen
          name="BookYourSeat"
          component={BookYourSeat}
          options={options}
        />
        <Stack.Screen
          name="BookYourLuggage"
          component={BookYourLuggage}
          options={options}
        />
        <Stack.Screen
          name="PaymentInfo"
          component={PaymentInfo}
          options={options}
        />
        <Stack.Screen name="Eticket" component={Eticket} options={options} />
        <Stack.Screen name="Rating" component={Rating} options={options} />
      </Stack.Navigator>
    </NavigationContainer>

    // <NeedLuggage />
    //<BookYourLuggage/>
    //<LuggageTypes />
    //<PaymentInfo />
    //<PaymentSuccessAlert />
    //<PaymentErrorAlert />
    //<LuggageFeedback />
    // <Rating />
    // <Eticket />
    // <MenuPage />
  );
}
