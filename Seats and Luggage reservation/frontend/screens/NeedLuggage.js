import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NeedLuggage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you need Luggage Reservation?</Text>
      <Text style={styles.content}>
        To ensure availability, we suggest that you reserve your luggage space
        in advance. You are able to reserve up to 15kg of luggage per passenger.
        Please keep in mind that additional costs for excess weight may apply.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
    fontWeight: 700,
    color: "#03045E",
    marginBottom: 48,
  },

  content: {
    fontSize: 16,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#0077C9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NeedLuggage;
