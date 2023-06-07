import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Modal from "react-native-modal";

const BookYourSeat = ({ navigation }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatTotalPrice, setSeatTotalPrice] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [requiredMessage, setRequiredMessage] = useState("");

  //handle the model view
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //render the seats row wise
  const renderSeats = () => {
    const rows = [];
    let currentRow = [];
    let rowCounter = 0;

    seats.forEach((seat) => {
      const isSelected = selectedSeats.some(
        (selectedSeat) => selectedSeat.seatId === seat._id
      ); // Check if the seat is selected
      const seatStyle = [
        styles.seat,
        {
          backgroundColor: seat.availability
            ? isSelected
              ? "#8EFFA5"
              : "#EAEAEA"
            : "red",
        },
      ];

      currentRow.push(
        <TouchableOpacity
          key={seat._id}
          style={seatStyle}
          onPress={() => handleSeatSelection(seat._id, seat.seatNo)}
        >
          <Text style={styles.seatText}>{seat.seatNo}</Text>
        </TouchableOpacity>
      );

      if (currentRow.length === 5 || rowCounter === seats.length - 1) {
        rows.push(
          <View key={rowCounter} style={styles.row}>
            {currentRow}
          </View>
        );
        currentRow = [];
        rowCounter++;
      }
    });

    return rows;
  };

  //handle the seat selection
  const handleSeatSelection = (seatId, seatNo) => {
    const isSeatSelected = selectedSeats.includes(seatId);

    if (selectedSeats.includes(seatId)) {
      // seat is already selected, remove it from the selectedSeats array
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((id) => id !== seatId)
      );
    } else {
      // seat is not selected, add it to the selectedSeats array
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        { seatId, seatNo },
      ]);
    }

    // Calculate the total price
    const seatPrice = 100;
    const newTotalPrice = isSeatSelected
      ? seatTotalPrice - seatPrice
      : seatTotalPrice + seatPrice;
    setSeatTotalPrice(newTotalPrice);
  };

  //handle proceed button function
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      setRequiredMessage("Please select a seat before proceeding.");
    } else {
      toggleModal();
    }
  };

  //handle continue button function in the model
  const handleContinue = () => {
    toggleModal();
    navigation.navigate("BookYourLuggage", { selectedSeats, seatTotalPrice });
  };

  const handleNo = () => {
    toggleModal();
    navigation.navigate("PaymentInfo", { selectedSeats, seatTotalPrice });
  };

  // fetch available seats from the server
  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/v1/seat");
        setSeats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeatData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Seat</Text>

      <View style={styles.flexBox}>
        <View style={styles.item}>
          <Text style={styles.label}>Bus Number:</Text>
          <Text style={styles.value}>234</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>10.30 AM</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Start:</Text>
          <Text style={styles.value}>Kadawatha</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.value}>Makumbura</Text>
        </View>
      </View>
      <View style={styles.seatView}>
        <View style={styles.seatBox}>
          <View style={styles.seatDriver}>
            <Text style={{ textAlign: "center" }}>Driver</Text>
          </View>
          {renderSeats()}
        </View>
      </View>

      <View style={styles.detailsView}>
        <View style={styles.detailsSeatA}></View>
        <Text style={styles.detailsText}>Available</Text>
        <View style={styles.detailsSeatR}></View>
        <Text style={styles.detailsText}>Reserved</Text>
        <View style={styles.detailsSeatS}></View>
        <Text style={styles.detailsText}>Selected</Text>
      </View>

      {/* required message  */}
      {selectedSeats.length === 0 && (
        <Text style={styles.requiredMessage}>{requiredMessage}</Text>
      )}

      {/* do you need luggage popup */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text style={styles.modelTitle}>
              Do you need Luggage Reservation?
            </Text>
            <Text style={styles.modelContent}>
              To ensure availability, we suggest that you reserve your luggage
              space in advance. You are able to reserve up to 15kg of luggage
              per passenger. Please keep in mind that additional costs for
              excess weight may apply.
            </Text>
            <View style={styles.modelButtons}>
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNo} onPress={handleNo}>
                <Text style={styles.buttonTextNo}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#03045E",
    marginBottom: 32,
  },
  flexBox: {
    backgroundColor: "#87cefa",
    borderRadius: 8,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0.5,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  value: {
    color: "black",
    fontSize: 18,
  },
  seatView: { alignItems: "center", marginTop: 25 },
  seatBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#87cefa",
    width: "80%",
    // height: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  seatDriver: {
    width: 90,
    height: 40,
    alignSelf: "flex-end",
    backgroundColor: "#87cefa",
    marginRight: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  row: {
    flexDirection: "row",
    margin: 10,
  },
  seat: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#eaeaea",
  },
  seatText: {
    fontSize: 14,
    color: "#333333",
  },
  detailsView: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  detailsSeatA: {
    backgroundColor: "#EAEAEA",
    width: 20,
    height: 20,
  },
  detailsSeatR: {
    backgroundColor: "red",
    width: 20,
    height: 20,
  },
  detailsSeatS: {
    backgroundColor: "#8EFFA5",
    width: 20,
    height: 20,
  },
  buttonContainer: {
    flex: 1,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#0077C9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    borderWidth: 3,
    borderColor: "#0077C9",
  },
  modelTitle: {
    fontSize: 24,
    color: "#03045E",
    marginBottom: 24,
    fontWeight: "bold",
  },
  modelContent: {
    fontSize: 18,
    color: "#03045E",
    marginBottom: 24,
  },
  modelButtons: {
    justifyContent: "flex-end",
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
  requiredMessage: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default BookYourSeat;
