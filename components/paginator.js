import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

export default Paginator = ({ data, scrollX }) => {
  console.log("this is the data from image slider", data);
  const { width } = useWindowDimensions();
  return (
    <View style={styles.paginatorView}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EA9B3F",
    marginHorizontal: 5,
  },
  paginatorView: {
    flexDirection: "row",
    height: 20,
    marginLeft: 152,
    marginTop: 755,
    position: "absolute",
  },
});
