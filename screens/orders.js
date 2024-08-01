import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const headers = {
    userid: "668e636cdfb7272abd65a759",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTk5NzI5MiwiZXhwIjoxNzIyNjAyMDkyfQ.T_TEyGfBro254mSh5vTuY15ypOaLL4AMWe_S0WVpi7w",
  };
  axios
    .get("https://backend.framer.pk/order", {
      headers: headers,
    })
    .then(function (response) {
      //console.log("response", response.data);
      setOrderData(response.data);
      // console.log("response from orderData", orderData.data);
    })
    .catch(function (error) {
      console.log("error from orders", error.message);
    });

  return (
    <View>
      <FlatList
        data={orderData.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const OrderCard = ({ order }) => {
  const navigation = useNavigation();

  // console.log("this is the order parameter", order);

  return (
    <View style={styles.card}>
      <Text allowFontScaling={false} style={styles.textOrder}>
        Order #: {order.orderID}
      </Text>
      <Text allowFontScaling={false} style={styles.text}>
        Name: {order.name}
      </Text>
      <Text allowFontScaling={false} style={styles.text}>
        Phone #: {order.pnum}
      </Text>
      <Text allowFontScaling={false} style={styles.text}>
        Images: {order.images.length}
      </Text>
      <View style={styles.button}>
        <Pressable
          // style={styles.button}
          onPress={() => navigation.navigate("OrderDetails", { order })}
        >
          <Text allowFontScaling={false} style={styles.buttonText}>
            VIEW DETAILS
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  textOrder: {
    fontSize: 20,
    marginBottom: 5,
    color: "#EA9B3F",
    fontWeight: "bold",
  },
  button: {
    // marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignSelf: "flex-end",
    // borderColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
