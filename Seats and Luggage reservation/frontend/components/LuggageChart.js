import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";

const LuggageChart = ({ isModalVisible, toggleModal }) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
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

          <View style={styles.modelButtons}>
            <TouchableOpacity style={styles.buttonNo} onPress={toggleModal}>
              <Text style={styles.buttonTextNo}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelButtons: {
    justifyContent: "flex-end",
    padding: 10,
  },
  buttonNo: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#0077C9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonTextNo: {
    color: "#0077C9",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#03045E",
    marginBottom: 24,
  },
  gridContainer: {
    flex: 1,
  },
  gridItem: {
    padding: 10,
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

export default LuggageChart;
