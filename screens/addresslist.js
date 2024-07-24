import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Alert, Modal } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

export default function AddressList() {
  const [addressData, setAddressData] = useState([]);
  const navigation = useNavigation();
  // const route = useRoute();
  // const { onDone } = route.params;

  const headers = {
    userid: "668e636cdfb7272abd65a759",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTM5MTU1NywiZXhwIjoxNzIxOTk2MzU3fQ.TCX32d_9Fu6sHuhKbdB9-wle62egJRV1VCdqWasABm0",
  };
  axios
    .get("https://backend.framer.pk/address", {
      headers: headers,
    })
    .then(function (response) {
      //console.log("response", response.data);
      if (response === null) {
        Alert.alert("There are no addresses here!");
      } else {
        setAddressData(response.data);
      }
      //console.log("response from addressData", addressData.data);
    })
    .catch(function (error) {
      console.log("error from orders", error.message);
    });

  return (
    <View style={styles.container}>
      <FlatList
        data={addressData.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AddressCard address={item} />}
        contentContainerStyle={styles.container}
      />
      <Pressable
        onPress={() => navigation.navigate("AddressScreenAddNew")}
        style={styles.addButtonStyle}
      >
        <Text style={styles.addButtonText}>Add New Address</Text>
      </Pressable>
    </View>
  );
}

const AddressCard = ({ address }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onDone } = route.params;
  const [confirmModel, setConfirmModel] = useState(false);

  // const handleAddressCardModel = () => {
  //   setConfirmModel(true);
  // };

  const handleAddressCardPress = (address) => {
    onDone(address);
    navigation.goBack();
  };

  // console.log("this is the address parameter", order);

  return (
    <Pressable
      onPress={() => handleAddressCardPress(address)}
      style={styles.card}
    >
      <Text style={styles.textOrder}>{address.addr}</Text>

      <View style={styles.editButton}>
        <Pressable
          // style={styles.button}
          onPress={() => navigation.navigate("AddressScreenEdit", { address })}
        >
          {/* {console.log(
            "the address content that is present in this card",
            address
          )} */}
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      </View>
      {/* modal for confirmation that the user is proceeding with this address */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModel}
        onRequestClose={() => setConfirmModel(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setConfirmModel(false)}
            >
              <Text style={styles.modalCloseButtonText}>X</Text>
            </Pressable>

            <Text style={styles.codText}>
              Are you sure you want to proceed with this information provided?
            </Text>
            <View style={styles.orderDetails}>
              <View style={styles.row}>
                <Text>Name: </Text>
                <Text style={styles.codText}>
                  {JSON.stringify(address.name)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Email: </Text>
                <Text style={styles.codText}>
                  {JSON.stringify(address.email)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>City: </Text>
                <Text style={styles.codText}>
                  {JSON.stringify(address.city)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Country: </Text>
                <Text style={styles.codText}>
                  {JSON.stringify(address.country)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Phone #: </Text>
                <Text style={styles.codText}>
                  {JSON.stringify(address.pnum)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Home Address: </Text>
                <Text style={styles.codText}>
                  {JSON.stringify(address.addr)}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.confirmOrderButton}
              onPress={handleAddressCardPress(address)}
              // disabled={!isAddressValid}
            >
              <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </Pressable>
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
  editButton: {
    // marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignSelf: "flex-end",
    // borderColor: "black",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  addButtonStyle: {
    flex: 1,
    marginTop: 679,
    // marginTop: 10,
    marginLeft: 122,
    backgroundColor: "#EA9B3F",
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 7,
    zIndex: 10,
  },
  addButtonText: { fontSize: 15, color: "white", fontWeight: "bold" },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 7,
    alignItems: "center",
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  codText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  viewOrderButton: {
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignItems: "center",
    margin: 20,
  },
  orderDetails: {
    width: "100%",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  confirmOrderButton: {
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignItems: "center",
  },
  confirmOrderButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
