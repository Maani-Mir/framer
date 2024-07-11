import React from "react";
import { Text, View } from "react-native";
import axios from "axios";
export default function MyOrders() {
  // axios
  //   .post("https://backend.framer.pk/order/{orderid}", {
  //     userid: "salman.arif@stax3.com",
  //     authentication: "Flintstone",
  //   })
  //   .then(function (response) {
  //     console.log("response", response.data);
  //   })
  //   .catch(function (error) {
  //     console.log("error", error.message);
  //   });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>You haven't made any orders yet!</Text>
    </View>
  );
}
