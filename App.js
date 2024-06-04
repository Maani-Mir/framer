import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
import ImageSlider from "./components/ImageSlider";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={StyleSheet.container}>
        <Text>This is a sample text</Text>
        <ImageSlider />
      </SafeAreaView>
    </SafeAreaProvider>
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
