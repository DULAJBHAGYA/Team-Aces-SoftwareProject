import RadioGroup from "react-native-radio-buttons-group";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

const LuggageFeedback = () => {
  const [radioReceive, setRadioReceive] = useState([ // setting radio buttons
    {
      id: "1",
      label: "Yes",
      value: "yes",
    },
    {
      id: "2",
      label: "No",
      value: "no",
    },
  ]);
  const [radioDamage, setRadioDamage] = useState([
    {
      id: "1",
      label: "Yes",
      value: "yes",
    },
    {
      id: "2",
      label: "No",
      value: "no",
    },
  ]);
  const [radioTimely, setRadioTimely] = useState([
    {
      id: "1",
      label: "Yes",
      value: "yes",
    },
    {
      id: "2",
      label: "No",
      value: "no",
    },
  ]);
  const [radioRate, setRadioRate] = useState([
    {
      id: "1",
      label: "Very bad",
      value: "verybad",
    },
    {
      id: "2",
      label: "Bad",
      value: "bad",
    },
    {
      id: "3",
      label: "Good",
      value: "good",
    },
    {
      id: "4",
      label: "Excellent",
      value: "excellent",
    },
  ]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Book Your Luggage</Text>
      </View>
      <View>
        <Text style={styles.label}>
          Did the right person receive your luggage?
        </Text>
        <RadioGroup
          layout="row"
          radioButtons={radioReceive}
          onPress={(qone) => setRadioReceive(qone)}
        />
      </View>
      <View>
        <Text style={styles.label}>Has your luggage been damaged?</Text>
        <RadioGroup
          layout="row"
          radioButtons={radioDamage}
          onPress={(qtwo) => setRadioDamage(qtwo)}
        />
      </View>
      <View>
        <Text style={styles.label}>
          Did you get your luggage in a timely manner?
        </Text>
        <RadioGroup
          layout="row"
          radioButtons={radioTimely}
          onPress={(qt) => setRadioTimely(qt)}
        />
      </View>
      <View>
        <Text style={styles.label}>How would you rate us?</Text>
        <RadioGroup
          style={styles.radio}
          layout="row"
          radioButtons={radioRate}
          onPress={(qfour) => setRadioRate(qfour)}
        />
      </View>
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
  label: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#03045E",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop:50
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default LuggageFeedback;
