import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Alert, Modal } from "react-native";
import axios from "axios";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

export default function AddressList() {
  const [addressData, setAddressData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // const route = useRoute();
  // const { onDone } = route.params;

  const getAllAddresses = () => {
    const headers = {
      userid: "668e636cdfb7272abd65a759",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTk5NzI5MiwiZXhwIjoxNzIyNjAyMDkyfQ.T_TEyGfBro254mSh5vTuY15ypOaLL4AMWe_S0WVpi7w",
    };
    axios
      .get("https://backend.framer.pk/address", {
        headers: headers,
      })
      .then(function (response) {
        console.log("response for all addresses", response.data);
        //console.log("do we seriously have no address here?", response);

        if (response === null) {
          Alert.alert("There are no addresses here!");
        } else {
          setAddressData(response.data);
        }
        //console.log("response from addressData", addressData.data);
      })
      .catch(function (error) {
        console.log("error from address list", error.message);
      });
  };

  useEffect(() => {
    console.log("are we getting here in useeffect?");
    // if (isFocused) {
    getAllAddresses();
    // }
  }, [isFocused]);

  //console.log("list of address should be here", addressData.data);

  return (
    <View>
      <FlatList
        data={addressData.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AddressCard address={item} getAllAddresses={getAllAddresses} />
        )}
        contentContainerStyle={styles.container}
        // ListFooterComponent={AddressFooter}
      />
      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate("AddressScreenAddNew")}
          style={styles.addButtonStyle}
        >
          <Text allowFontScaling={false} style={styles.addButtonText}>
            ADD NEW ADDRESS
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const AddressCard = ({ address, getAllAddresses }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onDone } = route.params;
  //const [confirmModel, setConfirmModel] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // const handleAddressCardModel = () => {
  //   setConfirmModel(true);
  // };

  const handleAddressCardPress = (address) => {
    onDone(address);
    navigation.goBack();
  };

  const handleDeleteAddressModal = () => {
    setDeleteModalVisible(true);
  };
  const deleteAddressDenied = () => {
    console.log("denied");
    setDeleteModalVisible(false);
  };

  const deleteAddress = (address) => {
    // console.log("deleting...", address._id);
    const headers = {
      userid: "668e636cdfb7272abd65a759",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTk5NzI5MiwiZXhwIjoxNzIyNjAyMDkyfQ.T_TEyGfBro254mSh5vTuY15ypOaLL4AMWe_S0WVpi7w",
    };
    axios
      .delete(`https://backend.framer.pk/address/${address._id}`, {
        headers: headers,
      })
      .then(function (response) {
        //console.log("response", response.data);
        getAllAddresses();
        if (response === null) {
          Alert.alert("There are no addresses here!");
        }
        //console.log("response from addressData", addressData.data);
      })
      .catch(function (error) {
        console.log("error from delete address function", error.message);
      });
    setDeleteModalVisible(false);
  };

  // };
  // console.log("this is the address parameter", order);

  return (
    <Pressable
      onPress={() => handleAddressCardPress(address)}
      style={styles.card}
    >
      <Text allowFontScaling={false} style={styles.textOrder}>
        {address.addr}
      </Text>
      <Text allowFontScaling={false} style={styles.textSmallOrder}>
        {address.city}
      </Text>
      <Text allowFontScaling={false} style={styles.textSmallOrder}>
        {address.country}
      </Text>
      <Text allowFontScaling={false} style={styles.textSmallOrder}>
        {address.pnum}
      </Text>
      <View style={styles.addressEditDeleteRow}>
        <View style={styles.editButton}>
          <Pressable
            // style={styles.button}
            onPress={() =>
              navigation.navigate("AddressScreenEdit", { address })
            }
          >
            {/* {console.log(
            "the address content that is present in this card",
            address
          )} */}
            <Text allowFontScaling={false} style={styles.editButtonText}>
              EDIT
            </Text>
          </Pressable>
        </View>
        <View style={styles.deleteButton}>
          <Pressable
            // style={styles.button}
            onPress={() => handleDeleteAddressModal()}
          >
            {/* {console.log(
            "the address content that is present in this card",
            address
          )} */}
            <Text allowFontScaling={false} style={styles.deleteButtonText}>
              DELETE
            </Text>
          </Pressable>
        </View>
      </View>
      {/* modal for deleting the address */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text
                allowFontScaling={false}
                style={styles.modalCloseButtonText}
              >
                X
              </Text>
            </Pressable>

            <Text allowFontScaling={false} style={styles.codText}>
              Are you sure you want to delete this address?
            </Text>
            <View style={styles.row}>
              <Pressable
                style={styles.deleteModalButtonYes}
                onPress={() => deleteAddress(address)}
                // disabled={!isAddressValid}
              >
                <Text
                  allowFontScaling={false}
                  style={styles.confirmOrderButtonText}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable
                style={styles.deleteModalButtonNo}
                onPress={deleteAddressDenied}
                // disabled={!isAddressValid}
              >
                <Text
                  allowFontScaling={false}
                  style={styles.confirmOrderButtonText}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 89,
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
    color: "#000000",
    fontWeight: "bold",
  },
  textSmallOrder: {
    fontSize: 16,
    // marginBottom: 5,
    color: "#000000",
    fontWeight: "bold",
  },
  addressEditDeleteRow: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 190,
    marginTop: 15,
  },
  editButton: {
    // marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,

    // borderColor: "black",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  deleteButton: {
    // marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    marginLeft: 10,

    // borderColor: "black",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButtonStyle: {
    flex: 1,
    // marginTop: 609,
    // marginTop: 10,
    // marginLeft: 122,
    backgroundColor: "#EA9B3F",
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 7,
    // zIndex: 10,
  },
  addButtonText: {
    // flex: 1,
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    flexWrap: "nowrap",
  },
  footer: {
    flex: 1,
    // padding: 10,
    marginTop: 679,
    // marginTop: 10,
    marginLeft: 4,
    position: "absolute",
    paddingBottom: 88,
    paddingHorizontal: 200,
    // paddingRight: 116,
    paddingTop: 17,
    // paddingBottom: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 17,
    borderColor: "#EA9B3F",
    // marginBottom: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
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
  deleteModalButtonYes: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignItems: "center",
  },
  deleteModalButtonNo: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignItems: "center",
    marginLeft: 7,
  },
  confirmOrderButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
