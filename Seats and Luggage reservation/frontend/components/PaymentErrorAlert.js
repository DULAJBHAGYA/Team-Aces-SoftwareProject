import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PaymentErrorAlert = () => {
  return (
    <View style={styles.alert}>
      <Ionicons
        name="close-circle-outline"
        size={24}
        color="red"
        style={styles.icon}
      />
      <Text style={styles.text}>
        Payment Error: Your transaction has failed. Please try again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff1f0",
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: "#f5222d",
  },
});

export default PaymentErrorAlert;
