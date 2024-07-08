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
import Parallelogram from "../components/parallelogram";
// import { ScrollView } from "react-native-gesture-handler";

// import GalleryAccess from "./GalleryAccess";

export default function PhotoStyling() {
  const route = useRoute();
  const navigation = useNavigation();
  // state to hold the border color of the styled images
  const [borderColor, setBorderColor] = useState("white");

  //state to hold the updated array of images selected for styling
  const [selectedImagesGlobal, setSelectedImagesGlobal] = useState(
    route.params.selectedImagesGlobal || []
  );

  // this state is set when the user presses checkout that gives order details
  const [modalVisible, setModalVisible] = useState(false);
  // this state is set when the user presses the styled image for cropping or removing
  const [imagePressModalVisible, setImagePressModalVisible] = useState(false);
  // this state is to keep the address of the user
  const [address, setAddress] = useState(null);
  //state to hold which image we are at in the array of images selected for styling
  const [selectedImage, setSelectedImage] = useState(null);
  // for classic and bold functionality
  const [resizeMode, setResizeMode] = useState("cover");
  // for changing colors of classic and bold colors
  const [activeStyle, setActiveStyle] = useState("bold");

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

  const handleImagePress = (imageUri) => {
    console.log("Image is pressed");
    setSelectedImage(imageUri);
    setImagePressModalVisible(true);
  };

  const handleRemove = () => {
    console.log("remove button was pressed");

    if (route.params.selectedImagesGlobal.length !== 3) {
      console.log(
        "number of images before cut",
        route.params.selectedImagesGlobal.length
      );
      setSelectedImagesGlobal((prev) =>
        prev.filter((image) => image != selectedImage)
      );
      // const updatedImages = selectedImagesGlobal.filter(
      //   (image) => image !== currentImage
      // );
      // route.params.selectedImagesGlobal = updatedImages;
      console.log(
        "number of images after cut",
        route.params.selectedImagesGlobal.length
      );

      setImagePressModalVisible(false);
    } else {
      Alert.alert("Error, atleast 3 images should be selected for styling.");
      setImagePressModalVisible(false);
      return;
    }
  };

  const handleAdjust = () => {
    console.log("adjust button was pressed");
    setImagePressModalVisible(false);
    navigation.navigate("ImageAdjustScreen", {
      imageUri: selectedImage,

      updateImage: (newImageUri) => {
        setSelectedImagesGlobal((prev) =>
          prev.map((image) => (image === selectedImage ? newImageUri : image))
        );
      },
    });
  };

  const handleCancel = () => {
    console.log("cancel button was pressed");
    setImagePressModalVisible(false);
  };

  if (selectedImagesGlobal.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No images selected</Text>
      </View>
    );
  }
  //renders the selected images for styling
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => handleImagePress(item)}
      style={styles.imageContainer}
    >
      <View style={styles.frame}>
        <View style={[styles.main, { borderColor: borderColor }]}>
          <Image
            source={{ uri: item }}
            style={[styles.image, { resizeMode }]}
          />
        </View>
        <Parallelogram
          rotation="90deg"
          width={296}
          left={156.5}
          top={147}
          borderColorParallelogram={borderColor}
        ></Parallelogram>
        <Parallelogram
          rotation="0deg"
          width={296}
          left={4.5}
          top={300}
          borderColorParallelogram={borderColor}
        ></Parallelogram>
        {/* <View style={styles.after}></View> */}
      </View>
      {/* <Text style={styles.uriText}>{item}</Text>
      <Text style={styles.imageText}>Styled Image</Text> */}
    </Pressable>
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

  const pressBlack = () => {
    setBorderColor("#000000");
  };
  const pressWhite = () => {
    setBorderColor("#FFFFFF");
  };
  const pressBold = () => {
    setResizeMode("cover");
    setActiveStyle("bold");
    return;
  };

  const pressClassic = () => {
    setResizeMode("center");
    setActiveStyle("classic");
    return;
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
          style={[
            styles.buttonBoldStyle,
            activeStyle === "bold" && styles.activeButtonStyle,
          ]}
          onPress={pressBold}
        >
          <Text style={styles.buttonBoldText}>BOLD</Text>
        </Pressable>
        <Pressable
          style={[
            styles.buttonClassicStyle,
            activeStyle === "classic" && styles.activeButtonStyle,
          ]}
          onPress={pressClassic}
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
          style={styles.buttonWhiteStyle}
          onPress={pressWhite}
          // onPress={() => navigation.navigate(GalleryAccess)}
        ></Pressable>
      </View>
      <View style={styles.weightStyle}>
        <View style={styles.textBlack}>
          <Text>Black</Text>
        </View>

        <View style={styles.textWhite}>
          <Text>White</Text>
        </View>
      </View>

      <FlatList
        data={selectedImagesGlobal}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
      />
      <Pressable style={styles.checkoutbuttonStyle} onPress={handleCheckout}>
        <Text style={styles.checkoutbuttonText}>CHECKOUT</Text>
      </Pressable>
      {/* Checkout Model */}
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
              <View style={styles.row}>
                <Text>3 frames for Rs.1500</Text>
                <Text>Rs.1500</Text>
              </View>

              {extraFramesCount > 0 && (
                <View style={styles.row}>
                  <Text>{extraFramesCount} more frames, 500 each</Text>
                  <Text>Rs.{extraFramesCost}</Text>
                </View>
              )}
              <View style={styles.row}>
                <Text>Delivered within 1 week</Text>
                <Text>FREE</Text>
              </View>

              <View style={styles.row}>
                <Text>Total</Text>
                <Text>Rs.{totalCost}</Text>
              </View>
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
      {/* Image Press Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={imagePressModalVisible}
        onRequestClose={() => setImagePressModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setImagePressModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>X</Text>
            </Pressable>
            <Pressable style={styles.buttonImagePress} onPress={handleRemove}>
              <Text style={styles.textImagePressStyle}>Remove</Text>
            </Pressable>
            <Pressable style={styles.buttonImagePress} onPress={handleAdjust}>
              <Text style={styles.textImagePressStyle}>Adjust</Text>
            </Pressable>
            <Pressable style={styles.buttonImagePress} onPress={handleCancel}>
              <Text style={styles.textImagePressStyle}>Cancel</Text>
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

    position: "relative",
    // overflow: "hidden",
    elevation: 25, // Add elevation for shadow effect (Android)
    shadowColor: "black", // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.3, // Shadow opacity (iOS)
    shadowRadius: 4, // Shadow radius (iOS)
  },
  main: {
    // position: "relative",
    width: 300,
    height: 300,
    overflow: "hidden",
    borderWidth: 10,
    borderColor: "white",
    boxShadow: "inset 2px 2px 10px #888888, 20px 20px 20px #888888",
    position: "relative",
  },
  image: {
    width: 300,
    height: 300,
    // resizeMode: "cover",
    borderWidth: 10,
    position: "relative",
    // borderColor: "grey",
    // resizeMode: "cover",
  },
  before: {
    backgroundColor: "#E5E7E9",
    height: 300,
    width: 10,
    position: "absolute",
    top: 0,
    left: 300,
    transform: [{ skewY: "0.5deg" }],
    zIndex: 10,
  },
  after: {
    backgroundColor: "#A6ACAF",
    height: 10,
    width: 300,
    position: "absolute",
    top: 300,
    left: 0,
    transform: [{ skewX: "45deg" }],
    zIndex: 20,
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
  buttonImagePress: {
    backgroundColor: "#EA9B3F",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
  },
  textImagePressStyle: {
    color: "white",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
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
    backgroundColor: "#EBAE68",
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
    marginLeft: 4,
    backgroundColor: "#000000",
    // position: "absolute",
    width: 200,
    height: 43,
    // paddingHorizontal: 20,
    // paddingVertical: 24,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0.5,
  },

  buttonWhiteStyle: {
    marginTop: 12,
    marginLeft: 4,
    backgroundColor: "#FFFFFF",
    // position: "absolute",
    width: 200,
    height: 43,
    // paddingHorizontal: 20,
    // paddingVertical: 24,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0.5,
  },

  textBlack: {
    marginTop: 17,
    marginLeft: 90,
  },

  textWhite: {
    marginTop: 17,
    marginLeft: 170,
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
  activeButtonStyle: {
    backgroundColor: "#E38417",
  },
});
