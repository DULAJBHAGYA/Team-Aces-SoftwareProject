
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PaymentSuccessAlert = () => {
  //component
  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <Icon name="check-circle" size={50} color="#03045E" />
        <Text style={styles.title}>Payment Success!</Text>
        <Text style={styles.content}>
          Your payment has been successfully processed. Thank you for your
          booking. Have a safe journey!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  alertBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    color: "#03045E",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PaymentSuccessAlert;
// this means that this file can be used in other files also