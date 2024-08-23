import React from "react";
import { StyleSheet, Text } from "react-native";

const CustomText = ({ children }) => {
  return (
    <Text style={styles.customStyle} allowFontScaling={false}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  customStyle: {
    fontSize: 17,
    color: "gray",
  },
});

export default CustomText;
