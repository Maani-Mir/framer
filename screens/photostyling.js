import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { ScrollView } from "react-native-gesture-handler";

// import GalleryAccess from "./GalleryAccess";

export default function PhotoStyling() {
  const route = useRoute();
  const navigation = useNavigation();
  const [borderColor, setBorderColor] = useState("transparent");
  const { selectedImagesGlobal = [] } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState(null);

  //const [isAddressValid, setIsAddressValid] = useState(false);

  console.log("route params", route.params);

  console.log("Selected Images on photo styling", selectedImagesGlobal);

  // const TestComponent = () => (
  //   <View style={styles.container}>
  //     {selectedImagesGlobal.map((uri) => (
  //       <View key={uri} style={styles.imageContainer}>
  //         <Image source={{ uri }} style={styles.image} />
  //       </View>
  //     ))}
  //   </View>
  // );

  if (selectedImagesGlobal.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No images selected</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <View style={styles.frame}>
        <Image
          source={{ uri: item }}
          style={[styles.image, { borderColor: borderColor }]}
        />
      </View>
      {/* <Text style={styles.uriText}>{item}</Text>
      <Text style={styles.imageText}>Styled Image</Text> */}
    </View>
  );

  const handleCheckout = () => {
    setModalVisible(true);
  };

  const handlePlaceOrder = () => {
    console.log("Order button is pressed");
    if (!address || Object.values(address).some((val) => val.trim() === "")) {
      Alert.alert("Error, Please fill in all address fields.");
      return;
    } else if (address) {
      //order placement logic here
      setModalVisible(false);
      Alert.alert("Order placed sucessfully!");
      console.log("This is the address", address);
    }
  };

  // const handleAddressChange = (updatedAddress) => {
  //   setAddress(updatedAddress);
  //   setModalVisible(true);
  //   // const isValid = Object.values(updatedAddress).every(
  //   //   (val) => val.trim() !== ""
  //   // );
  //   // setIsAddressValid(isValid);
  //   console.log("This should receive data from addressscreen", updatedAddress);
  //   //address = updatedAddress;
  //   //console.log("This is the global address variable that is set", address);
  // };

  const goToAddressScreen = () => {
    setModalVisible(false);
    navigation.navigate("AddressScreen", {
      onDone: (address) => {
        setAddress(address);
        setModalVisible(true);
      },
    });
    // console.log(
    //   "This should get the complete address from address screen",
    //   address
    // );
  };

  const framesCount = selectedImagesGlobal.length;
  const extraFramesCount = framesCount > 3 ? framesCount - 3 : 0;
  const extraFramesCost = extraFramesCount * 500;
  const totalCost = 1500 + extraFramesCost;

  const pressPink = () => {
    setBorderColor("#FF00FF");
  };
  const pressBlack = () => {
    setBorderColor("#000000");
  };
  const pressWhite = () => {
    setBorderColor("#FFFFFF");
  };
  const pressRed = () => {
    setBorderColor("#FF0000");
  };

  return (
    // <View>
    //   <ScrollView horizontal={true} contentContainerStyle={styles.container}>
    //     {selectedImagesGlobal.map((uri, index) => (
    //       <View key={index} style={styles.imageContainer}>
    //         <Image source={{ uri: uri }} style={styles.image} />
    //       </View>
    //     ))}
    //   </ScrollView>
    // </View>
    <View>
      <View style={styles.weightStyle}>
        <Pressable
          style={styles.buttonBoldStyle}
          // onPress={pressBold}
        >
          <Text style={styles.buttonBoldText}>BOLD</Text>
        </Pressable>
        <Pressable
          style={styles.buttonClassicStyle}
          // onPress={() => }
        >
          <Text style={styles.buttonClassicText}>CLASSIC</Text>
        </Pressable>
      </View>
      <View style={styles.weightButtonStyle}>
        <Pressable
          style={styles.buttonBlackStyle}
          onPress={pressBlack}
        ></Pressable>
        <Pressable
          style={styles.buttonPinkStyle}
          onPress={pressPink}
          // onPress={() => navigation.navigate(GalleryAccess)}
        ></Pressable>
        <Pressable
          style={styles.buttonWhiteStyle}
          onPress={pressWhite}
          // onPress={() => navigation.navigate(GalleryAccess)}
        ></Pressable>
        <Pressable
          style={styles.buttonRedStyle}
          onPress={pressRed}
          // onPress={() => navigation.navigate(GalleryAccess)}
        ></Pressable>
      </View>
      <View style={styles.weightStyle}>
        <View style={styles.textBlack}>
          <Text>Black</Text>
        </View>
        <View style={styles.textPink}>
          <Text>Pink</Text>
        </View>
        <View style={styles.textWhite}>
          <Text>White</Text>
        </View>
        <View style={styles.textRed}>
          <Text>Red</Text>
        </View>
      </View>
      <FlatList
        data={selectedImagesGlobal}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled

        // contentContainerStyle={styles.container}
      />
      <Pressable style={styles.checkoutbuttonStyle} onPress={handleCheckout}>
        <Text style={styles.checkoutbuttonText}>CHECKOUT</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>X</Text>
            </Pressable>
            <Pressable style={styles.addressButton} onPress={goToAddressScreen}>
              <Text style={styles.addressButtonText}>Enter Address</Text>
            </Pressable>
            <Text style={styles.codText}>Cash on Delivery (COD)</Text>
            <View style={styles.orderDetails}>
              <Text>
                3 frames for Rs.1500
                {"                                       "}
                Rs.1500
              </Text>

              {extraFramesCount > 0 && (
                <>
                  <Text>
                    {extraFramesCount} more frames, 500 each
                    {"                             "}Rs.{extraFramesCost}
                  </Text>
                </>
              )}
              <Text>
                Delivered within 1 week{"                                    "}
                FREE
              </Text>

              <Text>
                Total
                {
                  "                                                                     "
                }
                Rs.
                {totalCost}
              </Text>
            </View>
            <Pressable
              style={styles.placeOrderButton}
              onPress={handlePlaceOrder}
              // disabled={!isAddressValid}
            >
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    // <Text>This is the part where we style our photos</Text>
    // <TestComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    marginTop: 100,
    margin: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    //borderWidth: 1,
    //borderColor: "black",
    //borderRadius: 10,
    overflow: "hidden",
    elevation: 25, // Add elevation for shadow effect (Android)
    shadowColor: "black", // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.3, // Shadow opacity (iOS)
    shadowRadius: 4, // Shadow radius (iOS)
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderWidth: 10,
    borderColor: "grey",
    // resizeMode: "cover",
  },

  imageText: {
    marginTop: 5,
    fontSize: 16,
    color: "black",
  },
  uriText: {
    fontSize: 12,
    color: "red", // Different color for better visibility
    marginBottom: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
  checkoutbuttonStyle: {
    flex: 1,
    marginTop: 700,
    marginLeft: 82,
    backgroundColor: "#EA9B3F",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 17,
    borderRadius: 7,
  },
  checkoutbuttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
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
    borderRadius: 10,
    alignItems: "center",
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addressButton: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 5,
  },
  addressButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  codText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDetails: {
    width: "100%",
    marginBottom: 20,
  },
  placeOrderButton: {
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 5,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  weightButtonStyle: {
    flexDirection: "row",
    marginTop: 5,
  },
  weightStyle: {
    flexDirection: "row",
  },
  buttonBoldStyle: {
    marginTop: 2,
    marginLeft: 4,
    backgroundColor: "#E38417",
    // position: "absolute",
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonBoldText: { fontSize: 15, color: "white", fontWeight: "bold" },
  buttonClassicStyle: {
    marginTop: 2,
    marginLeft: 4,
    backgroundColor: "#EBAE68",
    // position: "absolute",
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonClassicText: { fontSize: 15, color: "white", fontWeight: "bold" },
  buttonBlackStyle: {
    marginTop: 12,
    marginLeft: 18,
    backgroundColor: "#000000",
    // position: "absolute",
    width: 75,
    height: 43,
    // paddingHorizontal: 20,
    // paddingVertical: 24,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  buttonPinkStyle: {
    marginTop: 12,
    marginLeft: 25,
    backgroundColor: "#FF00FF",
    // position: "absolute",
    width: 75,
    height: 43,
    // paddingHorizontal: 20,
    // paddingVertical: 24,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  buttonWhiteStyle: {
    marginTop: 12,
    marginLeft: 25,
    backgroundColor: "#FFFFFF",
    // position: "absolute",
    width: 75,
    height: 43,
    // paddingHorizontal: 20,
    // paddingVertical: 24,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  buttonRedStyle: {
    marginTop: 12,
    marginLeft: 25,
    backgroundColor: "#FF0000",
    // position: "absolute",
    width: 75,
    height: 43,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  textBlack: {
    marginTop: 17,
    marginLeft: 40,
  },
  textPink: {
    marginTop: 17,
    marginLeft: 72,
  },
  textWhite: {
    marginTop: 17,
    marginLeft: 70,
  },
  textRed: {
    marginTop: 17,
    marginLeft: 74,
  },
  checkoutbuttonStyle: {
    flex: 1,
    marginTop: 700,
    marginLeft: 82,
    backgroundColor: "#EA9B3F",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 90,
    paddingVertical: 17,
    borderRadius: 7,
  },
  checkoutbuttonText: { fontSize: 15, color: "white", fontWeight: "bold" },
});
