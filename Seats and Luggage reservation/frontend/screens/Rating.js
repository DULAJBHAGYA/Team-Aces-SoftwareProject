import React, { useState } from 'react';
import { View, Text, StyleSheet,Modal,TouchableOpacity } from 'react-native';//modal - proved a way to display the the content
import Icon from "react-native-vector-icons/FontAwesome";

const Rating = ({ visible, onClose }) => { // this function defines which accept this 2 props
  const [rating, setRating] = useState(0); // initial value of rating is=0

  const handleRatingChange = (value) => { //accept the value and state with the passed value entered by the user
    setRating(value);
  };

  const handleSubmit = () => {
    // handle submit
    onClose(); //closes popup
  };

  const handleSkip = () => {
    //handle skip
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.popup}>
          <Icon name="star" size={50} color="#03045E" />
          <Text style={styles.title}>Hey Drop Some Rating!</Text>
          <Text style={styles.content}>
            Your feedback assists us in improving our app. Please give us a
            rating out of 5
          </Text>

          <View style={styles.ratingContainer}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(1)}
            >
              <Text
                style={
                  rating >= 1 ? styles.selectedText : styles.unselectedText
                }
              >
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(2)} //passing in the argument 2 (rating value)
            >
              <Text
                style={
                  rating >= 2 ? styles.selectedText : styles.unselectedText
                }
              >
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(3)}
            >
              <Text
                style={
                  rating >= 3 ? styles.selectedText : styles.unselectedText
                }
              >
                3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(4)}
            >
              <Text
                style={
                  rating >= 4 ? styles.selectedText : styles.unselectedText
                }
              >
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleRatingChange(5)}
            >
              <Text
                style={
                  rating >= 5 ? styles.selectedText : styles.unselectedText
                }
              >
                5
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#90E0EF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 10,

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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#03045E",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fffafa",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 15,
  },
  selectedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03045E",
  },
  unselectedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03045E",
  },
  submitButton: {
    backgroundColor: "#03045E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default Rating;
