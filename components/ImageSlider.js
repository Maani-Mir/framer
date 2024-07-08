import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
} from "react-native";

import sliderdata from "../content/sliderdata";
import SliderItem from "./SliderItem";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { StackNavigator } from "react-navigation";
import GalleryAccess from "../screens/GalleryAccess";
// import GalleryAccess from "../screens/GalleryAccess";
import Paginator from "./paginator";
import paginator from "./paginator";
//import paginator from "./paginator";

export default ImageSlider = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sliderdata}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate(GalleryAccess)}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </Pressable>
      <Paginator data={sliderdata} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 679,
    marginLeft: 122,
    backgroundColor: "#EA9B3F",
    position: "absolute",

    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 10,
  },
  buttonText: { fontSize: 20, color: "white", fontWeight: "bold" },
});
