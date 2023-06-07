import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useState } from "react";

const Eticket = ({ navigation, route }) => {
  const { paramsData, totalAmount } = route.params;
  console.log("paramdata", paramsData);

  const selectedSeatsString =
    paramsData?.seatData?.selectedSeats ??
    paramsData?.selectedSeats.map((seat) => seat.seatNo).join(", ");

  const luggageType = paramsData?.luggageData?.selectedItem?.name ?? "None";
  const weight =
    paramsData?.luggageData?.weight !== ""
      ? paramsData?.luggageData?.weight
      : "None";

  const html = `<html>
      <head>
        <style>
          /* Add your custom CSS styles here */
        </style>
      </head>
      <body>
        <h1>E-Ticket</h1>
        <div>
          <h2>Ticket Details</h2>
          <p><strong>Seats:</strong> ${selectedSeatsString}</p>
          <p><strong>Luggage Type:</strong> ${luggageType}</p>
          <p><strong>Weight:</strong> ${weight}Kg</p>
          <p><strong>Total Amount:</strong> Rs. ${totalAmount}</p>
        </div>
      </body>
    </html>`;

  const handleDownloadPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("File has been saved to:", uri);
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch (error) {
      console.error("Error while generating or sharing PDF:", error);
    }
  };

  const handleContinue = () => {
    navigation.navigate("BookYourSeat");
  };

  // console.log("params:::::", totalAmount);
  // console.log("paramsData", paramsData);
  // console.log("selectedSeats", paramsData.seatData.selectedSeats);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Ticket</Text>

      <View style={styles.ticketContainer}>
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

        <View style={styles.content}>
          {selectedSeatsString !== "" && (
            <View>
              <View style={styles.content}>
                <View>
                  <Text style={styles.contentTitle}>Seats</Text>
                </View>

                <View style={styles.contentView}>
                  <Text style={[styles.contentText, { fontWeight: "500" }]}>
                    Seat No :
                  </Text>
                  <Text style={styles.contentText}>{selectedSeatsString}</Text>
                </View>
              </View>
            </View>
          )}

          {luggageType !== "None" &&
          luggageType !== undefined &&
          weight !== "None" ? (
            <View>
              <View>
                <Text style={styles.contentTitle}>Luggage</Text>
              </View>

              <View style={styles.contentView}>
                <Text style={[styles.contentText, { fontWeight: "500" }]}>
                  Type :
                </Text>
                <Text style={styles.contentText}>{luggageType}</Text>
              </View>

              <View style={styles.contentView}>
                <Text style={[styles.contentText, { fontWeight: "500" }]}>
                  Weight :
                </Text>
                <Text style={styles.contentText}>{weight}Kg</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.content}>
            <Text style={styles.contentTitle}>Total Amount</Text>
            <Text style={styles.contentText}>Rs. {totalAmount}</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonNo} onPress={handleDownloadPDF}>
            <Text style={styles.buttonTextNo}>Download Ticket</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
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
    marginBottom: 32,
  },
  miniTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#03045E",
    marginBottom: 10,
  },
  ticketContainer: {
    borderRadius: 10,
    backgroundColor: "#c7dcff",
    width: "100%",
    paddingBottom: 10,
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
  content: {
    alignItems: "center",
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 4,
  },
  contentText: {
    fontSize: 20,
  },
  contentView: {
    padding: 4,
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 16,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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

export default Eticket;
