import { React, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// let rotationGlobal = "90deg";

function Parallelogram({
  rotation,
  width,
  left,
  top,
  borderColorParallelogram,
}) {
  const colors = colorBorders(borderColorParallelogram);
  //console.log("this is the inner color", colors.innerColor);
  //console.log("this is the triangle color", colors.triangleColor);

  //console.log("not even at the start of component?", borderColorParallelogram);
  return (
    <View style={styles.parallelogram(rotation, width, left, top)}>
      <View
        style={[
          styles.parallelogramLeft,
          styles.triangle,
          colors.triangleColor,
          //colorBorders(borderColorParallelogram), // replacing the styles.triangle
          smoother(rotation, false),
        ]}
      />
      <View style={[styles.parallelogramInner, colors.innerColor]} />

      <View
        style={[
          styles.parallelogramRight,
          styles.triangle,
          colors.triangleColor,
          //colorBorders(borderColorParallelogram), // replacing the styles.triangle
          smoother(rotation, true),
        ]}
      />
    </View>
  );
}

function smoother(rotationParam, check) {
  //console.log("this is the rotation param", rotationParam);
  if (check && rotationParam == "90deg") {
    return styles.triangleDown;
  } else if (!check && rotationParam == "0deg") {
    return styles.triangleDown;
  }
  return;
}

function colorBorders(borderColorParallelogram) {
  //console.log("are we getting the border color here?",borderColorParallelogram);
  let innerColor, triangleColor;
  //console.log("start of triangle color", triangleColor);
  //for pink
  switch (borderColorParallelogram) {
    case "#000000":
      innerColor = { backgroundColor: "#2B2B2B" };
      triangleColor = { borderBottomColor: "#2B2B2B" };
      break;
    case "#FFFFFF":
      innerColor = { backgroundColor: "#D4D4D4" };
      triangleColor = { borderBottomColor: "#D4D4D4" };
      break;

    default:
      innerColor = { backgroundColor: "#D4D4D4" };
      triangleColor = { borderBottomColor: "#D4D4D4" };
  }
  return { innerColor, triangleColor };
}

const styles = StyleSheet.create({
  parallelogram: (rotation, width, left, top) => ({
    // margin: 100,
    position: "absolute",
    width: width,
    height: 10,
    transform: [{ rotate: rotation }],
    left: left,
    top: top,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 4.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  parallelogramInner: {
    position: "absolute",
    left: 5,
    top: 0,

    width: 290,
    height: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 4.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  parallelogramRight: {
    top: 0,
    right: -10,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 4.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  parallelogramLeft: {
    top: 0,
    left: -5,
    position: "absolute",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 4.25,
    // shadowRadius: 3.84,
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 4.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },

  triangleDown: {
    transform: [{ rotate: "180deg" }],
  },
});

export default Parallelogram;
