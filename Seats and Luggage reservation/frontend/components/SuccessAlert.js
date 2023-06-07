import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, Text } from "react-native";

const SuccessAlert = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    showSuccessAlert();
  }, []);

  const showSuccessAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.successAlert}>
        <Text style={styles.successText}>Payment Successful!</Text>
      </View>
    </Animated.View>
  );
};

const styles = {
  successAlert: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  successText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default SuccessAlert;
