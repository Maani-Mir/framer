import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderDetails() {
  const route = useRoute();
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.textStatic}>Name:</Text>
        <Text style={styles.textDynamic}>{order.name}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <Text style={styles.textStatic}>Phone #:</Text>
        <Text style={styles.textDynamic}>{order.pnum}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.row}>
        <Text style={styles.textStatic}>Address: </Text>
        <Text style={styles.textDynamic}>{order.addr}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.row}>
        <Text style={styles.textStatic}>Date:</Text>
        <Text style={styles.textDynamic}>
          {new Date(order.createdAt).toLocaleString()}
        </Text>
      </View>
      <View style={styles.line} />

      <View style={styles.row}>
        <Text style={styles.textStatic}>Status:</Text>
        <Text style={styles.textDynamic}>{order.status}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.row}>
        <Text style={styles.textStatic}>No. Of Images:</Text>
        <Text style={styles.textDynamic}>{order.images}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.row}>
        <Text style={styles.textStaticPrice}>Price:</Text>
        <Text style={styles.textDynamicPrice}>{order.price}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textDynamic: {
    fontSize: 16,
    marginVertical: 10,
    color: "#808080",
  },
  textStatic: {
    fontSize: 16,
    marginVertical: 10,
    color: "#EA9B3F",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  line: {
    width: "100%",
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
    fontWeight: "bold",
    color: "#808080",
  },
});
