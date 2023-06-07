import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import SuccessAlert from "../components/SuccessAlert";

const PaymentInfo = ({ navigation, route }) => {
  const { luggageData, seatData } = route.params;
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpiaryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const paramsData = route.params;
  console.log("paramsData", paramsData.selectedSeats);

  // const seatIds = seatData.selectedSeats || paramsData.selectedSeats;

  let seatIds = seatData?.selectedSeats ?? paramsData?.selectedSeats ?? [];
  let seatIdArray;
  if (seatIds != undefined) {
    seatIdArray = seatData ? seatIds.map((seat) => seat.seatId) : [];
  }

  console.log("seatIdssss", seatIds);
  console.log("seatIdArray", seatIdArray);

  const handlePay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/payment",
        {
          cardNumber,
          expirationDate,
          cvv,
        }
      );

      const result = response.data;
      console.log("response.data", response.data);
      console.log("response=", response);

      if (result.success) {
        // Payment success
        if (luggageData) {
          submitLuggageData();
        }
        Alert.alert("Success", "Payment successful");
        console.log("success");
        handleSeatSelection(seatIdArray);
        setShowSuccessAlert(true);
        navigation.navigate("Eticket", { paramsData, totalAmount });
      } else {
        // Payment failed
        Alert.alert("Error", "Payment failed");
        console.log("Error");
      }
    } catch (error) {
      // Handle network errors
      Alert.alert("Error", "An error occurred");
      console.log("An error occurred");
    }
  };

  const handleSeatSelection = (seatIdArray) => {
    const requestBody = {
      seatIds: seatIdArray,
      availability: false,
    };

    axios
      .patch("http://localhost:5001/api/v1/seat/select", requestBody)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitLuggageData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/luggage",
        {
          senderName: luggageData?.senderName,
          senderNIC: luggageData?.senderNIC,
          senderMobile: luggageData?.senderMobile,
          receiverName: luggageData?.receiverName,
          receiverNIC: luggageData?.receiverNIC,
          receiverMobile: luggageData?.receiverMobile,
          weight: luggageData?.weight,
          luggageType: luggageData?.selectedItem.val,
        }
      );

      console.log(response.data); // Handle the response data here
    } catch (error) {
      console.error(error); // Handle error here
    }
  };

  // console.log("selected seat from payment ", route.params);
  // console.log(
  //   "selected seat from payment luggage Data",
  //   route.params.luggageData.selectedItem
  // );

  //Price calculation
  const calcTotalAmount = () => {
    let luggagePrice = 0;
    let selectedItem;
    let weight = luggageData?.weight;
    let seatPrice = seatData?.seatTotalPrice ?? paramsData?.seatTotalPrice;
    let totalAmount = 0.0;
    console.log("luggageData?.selectedItem", luggageData?.selectedItem);
    console.log("seatPrice", seatPrice);

    if (
      luggageData?.selectedItem === null ||
      luggageData?.selectedItem === undefined
    ) {
      selectedItem = "";
    } else {
      selectedItem = luggageData?.selectedItem?.val;
    }

    switch (selectedItem) {
      case "HardSide":
        luggagePrice = 500;
        break;
      case "SoftSide":
        luggagePrice = 700;
        break;
      case "CarryOn":
        luggagePrice = 750;
        break;
      case "TravelTotes":
        luggagePrice = 300;
        break;
      case "GarmentBags":
        luggagePrice = 600;
        break;
      default:
        luggagePrice = 0;
        weight = 0;
        break;
    }

    // if (!)
    totalAmount = weight * luggagePrice + seatPrice;

    return totalAmount;
  };

  const totalAmount = calcTotalAmount();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Info</Text>

      <View>
        <Text style={styles.miniTitle}>
          Total Amount to Pay Rs. {calcTotalAmount()}
        </Text>
      </View>

      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
        keyboardType="numeric"
        maxLength={16}
      />

      <Text style={styles.label}>Expiry Date (MM/YY)</Text>
      <TextInput
        style={styles.input}
        value={expirationDate}
        onChangeText={(text) => setExpiaryDate(text)}
        keyboardType="numeric"
        maxLength={5}
      />

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        value={cvv}
        onChangeText={(text) => setCvv(text)}
        keyboardType="numeric"
        maxLength={3}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handlePay}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
      {showSuccessAlert && <SuccessAlert />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 80,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#03045E",
    marginBottom: 48,
  },
  miniTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#03045E",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 20,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  proceedButton: {
    backgroundColor: "#00008b",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    bottom: 0,
    marginBottom: 15,
    width: "100%",
  },
});

export default PaymentInfo;
