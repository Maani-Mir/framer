import React, { useRef, useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Parallelogram from "../components/parallelogram";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";

// import { ScrollView } from "react-native-gesture-handler";

// import GalleryAccess from "./GalleryAccess";
// const checkIdTokenStatus = async (userId, userToken) => {
//   try {
//     userId = SecureStore.getItemAsync("userId");
//     userToken = SecureStore.getItemAsync("userToken");
//   } catch (error) {
//     console.log("Failed to get id and token status", error);
//   }
// };

export default function PhotoStyling() {
  // console.log("This is the user id", userId);
  // console.log("This is the user token", userToken);

  const route = useRoute();
  const navigation = useNavigation();
  // state to hold the border color of the styled images
  const [borderColor, setBorderColor] = useState("white");

  //state to hold the updated array of images selected for styling
  const [selectedImagesGlobal, setSelectedImagesGlobal] = useState(
    route.params.selectedImagesGlobal || []
  );

  // console.log(
  //   "We are at photostyling and selected images are: ",
  //   selectedImagesGlobal
  // );
  // this state is set when the user presses checkout that gives order details
  const [modalVisible, setModalVisible] = useState(false);
  //order placed successfull modal
  const [modalOrderSuccess, setModalOrderSuccess] = useState(false);
  // this state is set when the user presses the styled image for cropping or removing
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  // this state is to keep the address of the user
  const [address, setAddress] = useState([]);
  //state to hold which image we are at in the array of images selected for styling
  const [selectedImage, setSelectedImage] = useState(null);
  // for classic and bold functionality
  const [resizeMode, setResizeMode] = useState("cover");
  // for changing of classic and bold
  const [activeStyle, setActiveStyle] = useState("bold");
  // to show loader when waiting
  const [isLoading, setIsLoading] = useState(false);

  let frameColor = "white";

  //const [isAddressValid, setIsAddressValid] = useState(false);

  //console.log("route params", route.params);

  //console.log("Selected Images on photo styling", selectedImagesGlobal);

  // const TestComponent = () => (
  //   <View style={styles.container}>
  //     {selectedImagesGlobal.map((uri) => (
  //       <View key={uri} style={styles.imageContainer}>
  //         <Image source={{ uri }} style={styles.image} />
  //       </View>
  //     ))}
  //   </View>
  // );

  // const handleImagePress = (imageUri) => {
  //   console.log("Image is pressed");
  //   setSelectedImage(imageUri);
  //   setImagePressModalVisible(true);
  // };

  // callback to handle visible items change
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  }).current;

  // viewability config for flatlist
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleRemove = () => {
    console.log("remove button was pressed");

    if (selectedImagesGlobal.length > 3) {
      console.log("number of images before cut", selectedImagesGlobal.length);
      console.log("Images before cut", selectedImagesGlobal);
      setSelectedImagesGlobal((prev) =>
        prev.filter((_, index) => index != currentVisibleIndex)
      );
      // const updatedImages = selectedImagesGlobal.filter(
      //   (image) => image !== currentImage
      // );
      // route.params.selectedImagesGlobal = updatedImages;
      console.log("number of images after cut", selectedImagesGlobal.length);
      console.log("Images after cut", selectedImagesGlobal);
      //setImagePressModalVisible(false);
    } else {
      Alert.alert("Error, atleast 3 images should be selected for styling.");
      //setImagePressModalVisible(false);
      return;
    }
  };

  const handleAdjust = () => {
    console.log("adjust button was pressed");
    //setImagePressModalVisible(false);
    navigation.navigate("ImageAdjustScreen", {
      imageUri: selectedImagesGlobal[currentVisibleIndex],
      updateImage: (newImageUri) => {
        setSelectedImagesGlobal((prev) =>
          prev.map((image, index) =>
            index === currentVisibleIndex ? newImageUri : image
          )
        );
      },
    });
  };

  // const handleCancel = () => {
  //   console.log("cancel button was pressed");
  //   setImagePressModalVisible(false);
  // };

  if (selectedImagesGlobal.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text allowFontScaling={false} style={styles.emptyText}>
          No images selected
        </Text>
      </View>
    );
  }

  //renders the selected images for styling
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
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
      {/* <Text allowFontScaling={false} style={styles.uriText}>{item}</Text>
      <Text allowFontScaling={false} style={styles.imageText}>Styled Image</Text> */}
    </View>
  );

  const handleCheckout = async () => {
    setModalVisible(false);
    setIsLoading(true); // loaderr activated

    //--------just wanna see if we revert back to OG position, will it still work?

    const formData = new FormData();

    formData.append("name", address.name);
    formData.append("email", address.email);
    formData.append("price", totalCost);
    formData.append("color", frameColor);
    formData.append("country", address.country);
    formData.append("pnum", address.pnum);
    formData.append("zip", address.zip);
    formData.append("addr", address.addr);
    formData.append("city", address.city);
    formData.append("frame", activeStyle);
    formData.append("status", "Pending");

    // Add images
    for (let i = 0; i < selectedImagesGlobal.length; i++) {
      const uri = selectedImagesGlobal[i];
      console.log("This is the uri for images", uri);
      const blob = await uriToBlob(uri);
      // this has the filename of the image taken through URI
      const filename = selectedImagesGlobal[i].split("/").pop();
      // this has the type of the image, like if it's jpg or png etc so if it's jpg, match = [".jpg", "jpg"]
      //const match = /\.(\w+)$/.exec(filename);
      // assigning image/jpg, if match is jpg
      //const type = match ? `image/${match[1]}` : `image`;
      formData.append("images", {
        uri,
        name: filename,
        type: blob.type,
      });
    }

    //console.log("This is the data from formData", data);

    //sending form data to server
    try {
      const response = await fetch("https://backend.framer.pk/order", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
          userid: "668e636cdfb7272abd65a759",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTk5NzI5MiwiZXhwIjoxNzIyNjAyMDkyfQ.T_TEyGfBro254mSh5vTuY15ypOaLL4AMWe_S0WVpi7w",
        },
      });

      console.log(
        "response from post order (response.text)",
        await response.text()
      );
      setModalOrderSuccess(true);
    } catch (err) {
      console.log("Error from post order", err);
      Alert.alert("Order not confirmed, please try again");
    } finally {
      setIsLoading(false); //loader done
    }
  };

  // const handlePlaceOrder = () => {
  //   console.log("Order button is pressed");
  //   if (!address || Object.values(address).some((val) => val.trim() === "")) {
  //     Alert.alert("Error, Please fill in all address fields.");
  //     return;
  //   } else if (address) {
  //     //order placement logic here
  //     setModalVisible(false);
  //     Alert.alert("Order placed sucessfully!");
  //     console.log("This is the address", address);
  //   }
  // };

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

  //function to convert URI to blob
  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const goToAddressList = () => {
    // setModalVisible(false);
    navigation.navigate("AddressList", {
      onDone: (address) => {
        // console.log(
        //   "This is the address we got after clicking the addresslist pressable",
        //   address
        // );
        // console.log(
        //   "This is the address we got after getting back fromm 2 screens",
        //   address
        // );
        setAddress(address);
        console.log("we are getting address before post order", address);

        //to show final order information
        setModalVisible(true);

        // useEffect(() => {
        //   checkIdTokenStatus(userId, userToken);
        //   console.log("userID, are we really getting it here?", userId);
        //   console.log("no way we get userToken too", userToken);
        // }, []);

        //------------------------------post order starts here-------------

        // const filename = selectedImagesGlobal[1].split("/").pop();
        // // this has the type of the image, like if it's jpg or png etc so if it's jpg, match = [".jpg", "jpg"]
        // const match = /\.(\w+)$/.exec(filename);
        // // assigning image/jpg, if match is jpg
        // const type = match ? `image/${match[1]}` : `image`;

        // const headers = {
        //   userid: "668e636cdfb7272abd65a759",
        //   Authorization:
        //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTk5NzI5MiwiZXhwIjoxNzIyNjAyMDkyfQ.T_TEyGfBro254mSh5vTuY15ypOaLL4AMWe_S0WVpi7w",
        // };

        // const data = {
        //   name: address.name,
        //   email: address.email,
        //   price: totalCost,
        //   color: frameColor,
        //   country: address.country,
        //   pnum: address.pnum,
        //   zip: address.zip,
        //   addr: address.addr,
        //   city: address.city,
        //   // images: [
        //   //   "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5fGVufDB8fDB8fHww",
        //   //   "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //   // ],
        //   frame: activeStyle,
        //   status: "Pending",
        // };

        //-------lets try this on handleCheckout and see if it works

        // const formData = new FormData();

        // formData.append("name", address.name);
        // formData.append("email", address.email);
        // formData.append("price", totalCost);
        // formData.append("color", frameColor);
        // formData.append("country", address.country);
        // formData.append("pnum", address.pnum);
        // formData.append("zip", address.zip);
        // formData.append("addr", address.addr);
        // formData.append("city", address.city);
        // formData.append("frame", activeStyle);
        // formData.append("status", "Pending");

        // // Add images
        // for (let i = 0; i < selectedImagesGlobal.length; i++) {
        //   const uri = selectedImagesGlobal[i];
        //   console.log("This is the uri for images", uri);
        //   const blob = await uriToBlob(uri);
        //   // this has the filename of the image taken through URI
        //   const filename = selectedImagesGlobal[i].split("/").pop();
        //   // this has the type of the image, like if it's jpg or png etc so if it's jpg, match = [".jpg", "jpg"]
        //   //const match = /\.(\w+)$/.exec(filename);
        //   // assigning image/jpg, if match is jpg
        //   //const type = match ? `image/${match[1]}` : `image`;
        //   formData.append("images", {
        //     uri,
        //     name: filename,
        //     type: blob.type,
        //   });
        // }

        // //console.log("This is the data from formData", data);

        // //sending form data to server
        // try {
        //   const response = await fetch("https://backend.framer.pk/order", {
        //     method: "POST",
        //     body: formData,
        //     headers: {
        //       "content-type": "multipart/form-data",
        //       userid: "668e636cdfb7272abd65a759",
        //       Authorization:
        //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMTk5NzI5MiwiZXhwIjoxNzIyNjAyMDkyfQ.T_TEyGfBro254mSh5vTuY15ypOaLL4AMWe_S0WVpi7w",
        //     },
        //   });

        //   console.log(
        //     "response from post order (response.text)",
        //     await response.text()
        //   );
        //   setModalOrderSuccess(true);

        //   // console.log(
        //   //   "response from post order (response.body)",
        //   //   response.body
        //   // );

        //   // console.log(
        //   //   "response from post order (response.json)",
        //   //   await response.json()
        //   // );

        //   // console.log("are our images that b")
        //   //const result = await response.json();
        //   //console.log("response in json format", result);
        // } catch (err) {
        //   console.log("Error from post order", err);
        //   Alert.alert("Order not confirmed, please try again");
        // }

        // axios
        //   .post("https://backend.framer.pk/order", data, {
        //     headers: headers,
        //   })
        //   .then(function (response) {
        //     console.log(
        //       "response: order has been placed, whole order info: ",
        //       response.data
        //     );
        //     setModalVisible(true);
        //   })
        //   .catch(function (error) {
        //     console.log("error from photostyling", error.message);
        //     console.log("What is this filename bruh", filename);
        //     console.log("What even is this match brooo", match);
        //     console.log(
        //       "ok we got type which seems similar to match i think ",
        //       type
        //     );

        //     Alert.alert("Error, order not confirmed");
        //   });
        // console.log("we are getting address finally", address);
        // console.log("total cost coming from addresslist", totalCost);
        // console.log("frame color coming from addresslist", frameColor);
      },
    });
    // console.log(
    //   "This should get the complete address from address screen",
    //   address
    // );
  };

  const goToOrdersScreen = () => {
    setModalOrderSuccess(false);
    navigation.navigate("OrdersScreen");

    //take address and images from here to orders screen
    //console.log("This is the address", address);
    //console.log("These are the images", selectedImagesGlobal);
  };

  const goToHomeScreen = () => {
    setSelectedImagesGlobal([]);
    setModalOrderSuccess(false);
    console.log("selected images are zero?", selectedImagesGlobal);
    navigation.navigate("ImageSlider");
  };

  const framesCount = selectedImagesGlobal.length;
  const extraFramesCount = framesCount > 3 ? framesCount - 3 : 0;
  const extraFramesCost = extraFramesCount * 500;
  const totalCost = 1500 + extraFramesCost;

  const pressBlack = () => {
    setBorderColor("#000000");
    frameColor = "black";
  };
  const pressWhite = () => {
    setBorderColor("#FFFFFF");
    frameColor = "white";
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
    <View /*style={[styles.container, { alignSelf: "center" }]}*/>
      <View style={styles.weightStyle}>
        <Pressable
          style={[
            styles.buttonBoldStyle,
            activeStyle === "bold" && styles.activeButtonStyle,
          ]}
          onPress={pressBold}
        >
          <Text allowFontScaling={false} style={styles.buttonBoldText}>
            BOLD
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.buttonClassicStyle,
            activeStyle === "classic" && styles.activeButtonStyle,
          ]}
          onPress={pressClassic}
        >
          <Text allowFontScaling={false} style={styles.buttonClassicText}>
            CLASSIC
          </Text>
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
          <Text allowFontScaling={false}>Black</Text>
        </View>

        <View style={styles.textWhite}>
          <Text allowFontScaling={false}>White</Text>
        </View>
      </View>

      <FlatList
        data={selectedImagesGlobal}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // contentContainerStyle={styles.flatListContent}
      />
      {isLoading && <ActivityIndicator size="large" color="#EA9B3F" />}
      <View style={styles.imageEditingStyle}>
        <Pressable style={styles.removeButtonImagePress} onPress={handleRemove}>
          <Text
            allowFontScaling={false}
            style={styles.removeTextImagePressStyle}
          >
            Remove
          </Text>
        </Pressable>
        <Pressable style={styles.adjustButtonImagePress} onPress={handleAdjust}>
          <Text
            allowFontScaling={false}
            style={styles.adjustTextImagePressStyle}
          >
            Adjust
          </Text>
        </Pressable>
      </View>
      <Pressable style={styles.checkoutbuttonStyle} onPress={goToAddressList}>
        <Text allowFontScaling={false} style={styles.checkoutbuttonText}>
          ADD ADDRESS
        </Text>
      </Pressable>
      {/* Checkout Modal */}
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
              <Text
                allowFontScaling={false}
                style={styles.modalCloseButtonText}
              >
                X
              </Text>
            </Pressable>
            <Text allowFontScaling={false} style={styles.orderModalHeading}>
              Address
            </Text>
            <View style={styles.orderDetails}>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.codText}>
                  Name:{" "}
                </Text>
                <Text allowFontScaling={false} style={styles.codText}>
                  {address.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.codText}>
                  Email:{" "}
                </Text>
                <Text allowFontScaling={false} style={styles.codText}>
                  {address.email}
                </Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.codText}>
                  City:{" "}
                </Text>
                <Text allowFontScaling={false} style={styles.codText}>
                  {address.city}
                </Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.codText}>
                  Country:{" "}
                </Text>
                <Text allowFontScaling={false} style={styles.codText}>
                  {address.country}
                </Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.codText}>
                  Phone #:{" "}
                </Text>
                <Text allowFontScaling={false} style={styles.codText}>
                  {address.pnum}
                </Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.codText}>
                  Home Address:{" "}
                </Text>
                <Text allowFontScaling={false} style={styles.codText}>
                  {address.addr}
                </Text>
              </View>
            </View>

            <Text allowFontScaling={false} style={styles.orderModalHeading}>
              Cash on Delivery (COD)
            </Text>
            <View style={styles.orderDetails}>
              <View style={styles.row}>
                <Text allowFontScaling={false}>3 frames for Rs.1500</Text>
                <Text allowFontScaling={false}>Rs.1500</Text>
              </View>

              {extraFramesCount > 0 && (
                <View style={styles.row}>
                  <Text allowFontScaling={false}>
                    {extraFramesCount} more frames, 500 each
                  </Text>
                  <Text allowFontScaling={false}>Rs.{extraFramesCost}</Text>
                </View>
              )}
              <View style={styles.row}>
                <Text allowFontScaling={false}>Delivered within 1 week</Text>
                <Text allowFontScaling={false}>FREE</Text>
              </View>

              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.totalRowText}>
                  Total
                </Text>
                <Text allowFontScaling={false} style={styles.totalRowText}>
                  Rs.{totalCost}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.placeOrderButton}
              onPress={handleCheckout}
              // disabled={!isAddressValid}
            >
              <Text
                allowFontScaling={false}
                style={styles.placeOrderButtonText}
              >
                PLACE ORDER
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Order Success modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOrderSuccess}
        onRequestClose={() => setModalOrderSuccess(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalOrderSuccess(false)}
            >
              <Text
                allowFontScaling={false}
                style={styles.modalCloseButtonText}
              >
                X
              </Text>
            </Pressable>

            <Text allowFontScaling={false} style={styles.orderModalHeading}>
              Order Placed Successfully!
            </Text>

            <Pressable
              style={styles.viewOrderButton}
              onPress={goToOrdersScreen}
              // disabled={!isAddressValid}
            >
              <Text allowFontScaling={false} style={styles.viewOrderButtonText}>
                View My Orders
              </Text>
            </Pressable>

            <Pressable
              style={styles.homeButton}
              onPress={goToHomeScreen}
              // disabled={!isAddressValid}
            >
              <Text allowFontScaling={false} style={styles.homeButtonText}>
                Go Home
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    // <Text allowFontScaling={false}>This is the part where we style our photos</Text>
    // <TestComponent />
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 10,
  // },
  imageContainer: {
    marginTop: 100,
    // margin: 55,
    marginLeft: 52,
    marginBottom: 48,
    marginRight: 60,
    // marginTop: 50,
    marginTop: 80,

    justifyContent: "center",
    alignItems: "center",
  },
  imageEditingStyle: {
    flexDirection: "row",
    marginLeft: 98,
    marginTop: 15,
  },
  removeButtonImagePress: {
    backgroundColor: "#EA9B3F",
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 7,
  },
  removeTextImagePressStyle: {
    color: "white",
    fontWeight: "bold",
  },

  adjustButtonImagePress: {
    backgroundColor: "#EA9B3F",
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
    marginLeft: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 7,
  },
  adjustTextImagePressStyle: {
    color: "white",
    fontWeight: "bold",
  },
  // flatListContent: {
  //   flexGrow: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
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
    position: "absolute",
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
    marginLeft: 72,
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

  addressButton: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
  },
  addressButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  orderModalHeading: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  codText: {
    flex: 1,
    flexWrap: "wrap",
    // justifyContent: "space-between",
    // flexDirection: "row",
    marginBottom: 20,
    fontSize: 13,
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
  totalRowText: {
    fontWeight: "bold",
  },
  placeOrderButton: {
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
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
    borderRadius: 7,
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
    borderRadius: 7,
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
    borderRadius: 7,
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
    borderRadius: 7,
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

  activeButtonStyle: {
    backgroundColor: "#E38417",
  },

  viewOrderButton: {
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignItems: "center",
    margin: 20,
  },
  viewOrderButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  homeButton: {
    padding: 10,
    backgroundColor: "#EA9B3F",
    borderRadius: 7,
    alignItems: "center",
    marginBottom: 5,
  },
  homeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
