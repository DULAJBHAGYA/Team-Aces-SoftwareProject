import React, { useState } from "react"; //to manage the state of the input values
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LuggageChart from "../components/LuggageChart";
import DropDown from "../components/DropDown";

let data = [
  {
    id: 1,
    name: "Hard Side",
    val: "HardSide",
  },
  {
    id: 2,
    name: "Soft Side",
    val: "SoftSide",
  },
  {
    id: 3,
    name: "Carry On",
    val: "CarryOn",
  },
  {
    id: 4,
    name: "Travel Totes",
    val: "TravelTotes",
  },
  {
    id: 5,
    name: "Garment Bags",
    val: "GarmentBags",
  },
];

const BookYourLuggage = ({ navigation, route }) => {
  const seatData = route.params;
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [senderNIC, setSenderNIC] = useState("");
  const [receiverNIC, setReceiverNIC] = useState("");
  const [senderMobile, setSenderMobile] = useState("");
  const [receiverMobile, setReceiverMobile] = useState("");
  const [weight, setWeight] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [errors, setErrors] = useState({
    senderName: "",
    receiverName: "",
    senderNIC: "",
    receiverNIC: "",
    senderMobile: "",
    receiverMobile: "",
    weight: "",
  });

  //user input validation
  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (senderName.trim() === "") {
      newErrors.senderName = "Sender Name is required";
      isValid = false;
    }

    if (receiverName.trim() === "") {
      newErrors.receiverName = "Receiver Name is required";
      isValid = false;
    }

    if (senderNIC.trim() === "") {
      newErrors.senderNIC = "Sender NIC is required";
      isValid = false;
    } else if (senderNIC.trim().length < 9) {
      newErrors.senderNIC = "Sender NIC should be at least 9 characters long";
      isValid = false;
    }

    if (receiverNIC.trim() === "") {
      newErrors.receiverNIC = "Receiver NIC is required";
      isValid = false;
    } else if (receiverNIC.trim().length < 9) {
      newErrors.receiverNIC =
        "Receiver NIC should be at least 9 characters long";
      isValid = false;
    }

    if (senderMobile.trim() === "") {
      newErrors.senderMobile = "Sender Mobile is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(senderMobile)) {
      newErrors.senderMobile = "Sender Mobile should be a 10-digit number";
      isValid = false;
    }

    if (receiverMobile.trim() === "") {
      newErrors.receiverMobile = "Receiver Mobile is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(receiverMobile)) {
      newErrors.receiverMobile = "Receiver Mobile should be a 10-digit number";
      isValid = false;
    }

    if (
      typeof weight !== "number" ||
      isNaN(weight) ||
      weight.toString().trim() === ""
    ) {
      newErrors.weight = "Weight is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  console.log("selected seat", route.params);

  //hanndle the model toggle
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //show the luggage chart
  const handleChart = () => {
    toggleModal();
  };

  //store all data to the luggagedata
  const luggageData = {
    senderName,
    senderNIC,
    receiverName,
    receiverNIC,
    senderMobile,
    receiverMobile,
    weight,
    selectedItem,
  };

  const handleContinue = () => {
    //logs the values entered in the input fields when the "Continue" button is pressed
    // Handle form submission here
    if (validateInputs()) {
      console.log("Sender Name:", senderName);
      console.log("Receiver Name:", senderName);
      console.log("Sender NIC:", senderNIC);
      console.log("Receiver NIC:", receiverNIC);
      console.log("Sender Mobile:", senderMobile);
      console.log("Receiver Mobile:", receiverMobile);
      navigation.navigate("PaymentInfo", { seatData, luggageData });
    }
  };

  //dropdown selected item handle
  const onSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Book Your Luggage</Text>
        </View>

        <View style={styles.deatailsView}>
          <Text style={styles.miniTitle}>Sender Information</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSenderName(text)}
            value={senderName}
          />
          {errors.senderName !== "" && (
            <Text style={styles.errorText}>{errors.senderName}</Text>
          )}

          <Text style={styles.label}>NIC</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSenderNIC(text)}
            value={senderNIC}
          />
          {errors.senderName !== "" && (
            <Text style={styles.errorText}>{errors.senderNIC}</Text>
          )}

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSenderMobile(text)}
            value={senderMobile}
          />
          {errors.senderName !== "" && (
            <Text style={styles.errorText}>{errors.senderMobile}</Text>
          )}
        </View>

        <View style={styles.deatailsView}>
          <Text style={styles.miniTitle}>Receiver Information</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setReceiverName(text)}
            value={receiverName}
          />
          {errors.senderName !== "" && (
            <Text style={styles.errorText}>{errors.receiverName}</Text>
          )}

          <Text style={styles.label}>NIC</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setReceiverNIC(text)}
            value={receiverNIC}
          />
          {errors.senderName !== "" && (
            <Text style={styles.errorText}>{errors.receiverNIC}</Text>
          )}

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setReceiverMobile(text)}
            value={receiverMobile}
          />
          {errors.senderName !== "" && (
            <Text style={styles.errorText}>{errors.receiverMobile}</Text>
          )}
        </View>

        <View style={styles.luggageButton}>
          <TouchableOpacity style={styles.button} onPress={handleChart}>
            <Text style={styles.buttonText}>Luggage Chart</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.label}>Choose Luggage Type:</Text>
          <View>
            <DropDown value={selectedItem} data={data} onSelect={onSelect} />
          </View>

          <Text style={styles.label}>weight:</Text>

          <View style={styles.weightbox}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(text) => {
                const numericValue = parseInt(text);
                setWeight(Number.isNaN(numericValue) ? "" : numericValue);
              }}
              value={weight.toString()}
            />
            {errors.weight !== "" && (
              <Text style={styles.errorText}>{errors.weight}</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* model viwe */}

        <LuggageChart
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#03045E",
    marginBottom: 32,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  luggageButton: {
    alignItems: "flex-end",
    margin: 5,
    borderColor: "#00008b",
  },
  luggageButtontext: {
    color: "#2F80ED",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00008b",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
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

export default BookYourLuggage;
