import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, Button, StyleSheet, Alert } from "react-native";

//import {} from "react-native-image-crop-picker";

import * as ImageManipulator from "expo-image-manipulator";
//import { CropView } from "expo-image-crop";

export default function ImageAdjustScreen({ navigation }) {
  const route = useRoute();
  //console.log(ImagePicker);
  //const navigation = useNavigation;

  const { imageUri, updateImage } = route.params;
  const [croppedImageUri, setCroppedImageUri] = useState(imageUri);

  const [showCropView, setShowCropView] = useState(true);
  const cropViewRef = React.useRef();

  const cropImage = async () => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        croppedImageUri,
        [{ crop: { originX: 50, originY: 50, width: 500, height: 500 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setCroppedImageUri(manipResult.uri);
    } catch (error) {
      console.error(error);
      Alert.alert("Error, Failed to crop image");
    }
  };

  const handleDone = () => {
    updateImage(croppedImageUri);
    navigation.goBack();
  };

  // const handleDone = async () => {
  //   if (showCropView) {
  //     const { uri } = await cropViewRef.current.save();
  //     setCroppedImageUri(uri);
  //     setShowCropView(false);
  //   } else {
  //     updateImage(croppedImageUri);
  //     navigation.goBack();
  //   }
  // };

  return (
    //manipulator code
    <View style={styles.container}>
      <Image source={{ uri: croppedImageUri }} style={styles.image} />
      <Button title="Crop Image" onPress={cropImage} />
      <Button title="Done" onPress={handleDone} />
    </View>

    // <View style={styles.container}>
    //   {showCropView ? (
    //     <CropView
    //       sourceUrl={croppedImageUri}
    //       style={styles.cropView}
    //       ref={cropViewRef}
    //       onSave={(result) => setCroppedImageUri(result.uri)}
    //     />
    //   ) : (
    //     <Image source={{ uri: croppedImageUri }} style={styles.image} />
    //   )}
    //   <Button title="Done" onPress={handleDone} />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

//--------------------last resort effort

// import React from "react";
// import { Dimensions, Button, ImageBackground } from "react-native";
// import { ImageManipulator } from "expo-image-crop";

// export default class ImageAdjustScreen extends React.Component {
//   state = {
//     isVisible: false,
//     uri: "https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg",
//   };
//   onToggleModal = () => {
//     const { isVisible } = this.state;
//     this.setState({ isVisible: !isVisible });
//   };
//   render() {
//     const { uri, isVisible } = this.state;
//     const { width, height } = Dimensions.get("window");
//     return (
//       <ImageBackground
//         resizeMode="contain"
//         style={{
//           justifyContent: "center",
//           padding: 20,
//           alignItems: "center",
//           height,
//           width,
//           backgroundColor: "black",
//         }}
//         source={{ uri }}
//       >
//         <Button
//           title="Open Image Editor"
//           onPress={() => this.setState({ isVisible: true })}
//         />
//         <ImageManipulator
//           photo={{ uri }}
//           isVisible={isVisible}
//           onPictureChoosed={({ uri: uriM }) => this.setState({ uri: uriM })}
//           onToggleModal={this.onToggleModal}
//         />
//       </ImageBackground>
//     );
//   }
// }
