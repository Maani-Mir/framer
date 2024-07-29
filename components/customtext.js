import React from "react";
import { Text } from "react-native";

const CustomText = ({ style, children }) => {
  return (
    <Text style={style} allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default CustomText;
