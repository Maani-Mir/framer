import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Image } from "react-native";

export default function OrderDetails() {
  const route = useRoute();
  const { order } = route.params;
  console.log("what is in order", order);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStatic}>
            Name:
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamic}>
            {order.name}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStatic}>
            Phone #:
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamic}>
            {order.pnum}
          </Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStatic}>
            Address:{" "}
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamic}>
            {order.addr}
          </Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStatic}>
            Date:
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamic}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStatic}>
            Status:
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamic}>
            {order.status}
          </Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStatic}>
            No. Of Images:
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamic}>
            {order.images.length}
          </Text>
        </View>
        <View style={[styles.row, styles.rowImage]}>
          {order.images.map((_image) => (
            <Image
              source={{
                uri: `https://backend.framer.pk/${_image}`,
              }}
              style={{ height: 100, width: 100, margin: 4 }}
            />
          ))}
        </View>
        <View style={styles.line} />

        {/* add image logic here */}

        <View style={styles.row}>
          <Text allowFontScaling={false} style={styles.textStaticPrice}>
            Price:
          </Text>
          <Text allowFontScaling={false} style={styles.textDynamicPrice}>
            {order.price}
          </Text>
        </View>
        <View style={styles.line} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    //flexDirection: "column",
  },
  textDynamic: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 15,
    marginVertical: 10,
    marginRight: 5,
    color: "#808080",
  },
  textStatic: {
    flexWrap: "wrap",
    fontSize: 15,
    marginVertical: 10,

    color: "#EA9B3F",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    flexWrap: "wrap",

    // overflow: "scroll",
  },
  rowImage: {
    flexWrap: "wrap",
    width: "90%",
    justifyContent: "flex-start",
  },
  line: {
    width: "102%",
    height: 1,
    // backgroundColor: "black",
    marginVertical: 1,
    backgroundColor: "#d3d3d3",
  },
  textStaticPrice: {
    fontSize: 26,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#EA9B3F",
  },
  textDynamicPrice: {
    fontSize: 26,
    marginVertical: 10,
    marginHorizontal: 5,
    fontWeight: "bold",
    color: "#808080",
  },
});
