import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MenuPage = ({ navigation }) => {
  const HandleSeatReservation = () => {
    navigation.navigate("BookYourSeat");
  };

  const HandleLuggageReservation = () => {
    navigation.navigate("BookYourLuggage");
  };

  const HandleFeedback = () => {};

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Menu</Text>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={HandleSeatReservation}>
          <View style={styles.boxView}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              />
              <View style={styles.boxTextView}>
                <Text style={styles.boxText}>Seat Reservation</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={HandleLuggageReservation}>
          <View style={styles.boxView}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              />
              <View style={styles.boxTextView}>
                <Text style={styles.boxText}>Luggage Reservation</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.boxView}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              />
              <View style={styles.boxTextView}>
                <Text style={styles.boxText}>Feedback</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
  tinyLogo: {
    width: 100,
    height: 100,
  },
  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  boxView: {
    width: 320,
    height: 100,
    backgroundColor: "#00B4D8",
    borderRadius: 10,
    marginBottom: 16,
  },
  boxTextView: {
    position: "absolute",
    alignSelf: "center",
    left: "38%",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  boxText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default MenuPage;
