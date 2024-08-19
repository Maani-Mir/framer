import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Alert,
  Pressable,
  Text,
} from "react-native";

import ImageCropPicker from "react-native-image-crop-picker";

import * as ImageManipulator from "expo-image-manipulator";
import { croppedImageAdd } from "../redux/imagesslice";
import { useDispatch, useSelector } from "react-redux";
//import { CropView } from "expo-image-crop";

export default function ImageAdjustScreen({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();
  //console.log(ImagePicker);
  //const navigation = useNavigation;

  const image = useSelector((state) => {
    //console.log("consoling state in selector", state.image);
    return state.image;
  });

  console.log("what are the route params", route.params);

  const [imageUri, setImageUri] = useState(route.params.imageUri.original);
  const [indexStyle, setIndexStyle] = useState(route.params.indexStyle);
  const [croppedImageUri, setCroppedImageUri] = useState();

  useEffect(() => {
    // setImageUri(route.params.imageUri.original);
    //setCroppedImageUri(route.params.imageUri.original);
    // setIndexStyle(route.params.indexStyle);
    cropImage();
  }, []);

  //console.log("croppedImageUri before doing anything", croppedImageUri);
  //below two statements are related to "CropView"
  //  const [showCropView, setShowCropView] = useState(true);
  //  const cropViewRef = React.useRef();
  console.log("should get an image at start here", imageUri);
  console.log("should get the image index at start here", indexStyle);

  // useEffect(() => {
  //   console.log("are we getting in crop?");
  //   cropImage();
  // }, [imageUri]);

  //--------image crop picker code
  const cropImage = () => {
    ImageCropPicker.openCropper({
      path: imageUri,
      width: 300,
      height: 400,
    })
      .then((_image) => {
        console.log("We should get some sorta image here", _image);
        //setCroppedImageUri(_image.path);
        setImageUri(_image.path);
        handleDone(_image.path);
      })
      .catch((error) => {
        console.error("Error cropping image: ", error);
        Alert.alert("Error, Failed to crop image");
      });
  };

  // useEffect(() => {
  //   console.log("are we getting in handleDone?");
  //   handleDone();
  // }, []);

  const handleDone = (croppedUri) => {
    // console.log(
    //   "this is the cropped imageUri, before assigning",
    //   croppedImageUri
    // );

    // useEffect(() => {
    //   setImageUri(route.params.imageUri || "");
    // }, [route.params.imageUri]);

    // setImageUri(croppedImageUri);
    dispatch(croppedImageAdd({ index: indexStyle, uri: croppedUri }));

    console.log("updated state array with the cropped image", image.value);

    navigation.goBack();
  };

  useEffect(() => {
    console.log("final cropped imageUri, is it the one?", imageUri);
    // setImageUri(route.params.imageUri || "");
  }, [imageUri]);

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: croppedImageUri }} style={styles.image} />

      <Pressable style={styles.cropButton} onPress={cropImage}>
        <Text allowFontScaling={false} style={styles.cropButtonText}>
          CROP IMAGE HERE
        </Text>
      </Pressable>
      <Pressable style={styles.doneButton} onPress={handleDone}>
        <Text allowFontScaling={false} style={styles.doneButtonText}>
          DONE
        </Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cropButton: {
    backgroundColor: "#EA9B3F",
    padding: 18,
    borderRadius: 7,
    alignItems: "center",
  },
  cropButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  doneButton: {
    backgroundColor: "#EA9B3F",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 15,
  },
  doneButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cropView: {
    width: 300,
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

//------------------------------Hassan bhai's effort

// import React, { useState } from "react";
// import { Button, Image, View, PanResponder, Dimensions } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as ImageManipulator from "expo-image-manipulator";
// import { CropView } from "react-native-image-crop-tools";

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// export default function ImageAdjustScreen() {
//   const [image, setImage] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const cropViewRef = React.useRef();
//   const [cropArea, setCropArea] = useState({
//     x: 0,
//     y: 0,
//     width: 100,
//     height: 100,
//   });

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       console.log(
//         "we should get an image here in if condition",
//         result.assets[0].uri
//       );

//       setImage(result.assets[0].uri);
//     }
//   };

//   const onImageCrop = (result) => {
//     setCroppedImage(result.uri);
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && (
//         <CropView
//           sourceUrl={image}
//           style={{ width: 300, height: 300 }}
//           onImageCrop={onImageCrop}
//           keepAspectRatio
//           aspectRatio={{ width: 1, height: 1 }}
//         />
//       )}
//       {croppedImage && (
//         <Image
//           source={{ uri: croppedImage }}
//           style={{ width: 200, height: 200 }}
//         />
//       )}
//     </View>
//   );
// }
