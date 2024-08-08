import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";

import sliderdata from "../content/sliderdata";
import SliderItem from "./SliderItem";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { StackNavigator } from "react-navigation";
import GalleryAccess from "../screens/GalleryAccess";
// import GalleryAccess from "../screens/GalleryAccess";
import Paginator from "./paginator";
import axios from "axios";
//import LoginPage from "../screens/login";

export default ImageSlider = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  // for login communication with backend
  // axios
  //   .post("https://backend.framer.pk/login", {
  //     email: "salman.arif@stax3.com",
  //     password: "Flintstone",
  //   })
  //   .then(function (response) {
  //     console.log("response", response.data);
  //   })
  //   .catch(function (error) {
  //     console.log("error", error.message);
  //   });
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 500); // Simulate a 5-second loading time

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#EA9B3F" />
  //     </View>
  //   );
  // }

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
        onPress={() => navigation.navigate("GalleryAccess")}
      >
        <Text allowFontScaling={false} style={styles.buttonText}>
          GET STARTED
        </Text>
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
    borderRadius: 7,
  },
  buttonText: { fontSize: 20, color: "white", fontWeight: "bold" },
});
