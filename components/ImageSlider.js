import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import sliderdata from "../content/sliderdata";
import SliderItem from "./SliderItem";

export default ImageSlider = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={sliderdata}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
