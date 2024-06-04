import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
import ImageSlider from "./components/ImageSlider";

export default App = () => {
  return (
    <View style={StyleSheet.container}>
      <ImageSlider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
