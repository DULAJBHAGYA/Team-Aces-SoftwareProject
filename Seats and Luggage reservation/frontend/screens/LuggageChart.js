import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LuggageTypes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luggage Types</Text>

      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <View style={styles.flexBox}>
            <Text style={styles.label}>Hard Side</Text>
            <Text style={styles.price}>LKR 500/kg</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.flexBox}>
            <Text style={styles.label}>Soft Side</Text>
            <Text style={styles.price}>LKR 700/kg</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.flexBox}>
            <Text style={styles.label}>Carry On</Text>
            <Text style={styles.price}>LKR 750/kg</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.flexBox}>
            <Text style={styles.label}>Travel Totes</Text>
            <Text style={styles.price}>LKR 300/kg</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.flexBox}>
            <Text style={styles.label}>Garment Bags</Text>
            <Text style={styles.price}>LKR 600/kg</Text>
          </View>
        </View>
      </View>
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
    marginBottom: 24,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "column",
  },
  gridItem: {
    width: "100%",
    padding: 16,
  },
  flexBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#03045E",
  },
  label: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    justifyContent: "space-between",
  },
});

export default LuggageTypes;
