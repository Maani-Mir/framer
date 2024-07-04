import { useState, useEffect } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Platform,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";
import PhotoStyling from "./photostyling";
// import { useNavigation } from "@react-navigation/native";

var selectedImagesGlobal = new Array();

export default function GalleryAccess({ navigation }) {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    async function getAlbums() {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }
      const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });
      setAlbums(fetchedAlbums);
    }
    getAlbums();
  });

  const handleProceed = () => {
    if (selectedImagesGlobal.length < 3) {
      Alert.alert("Select atleast 3 images to proceed");
      return;
    }
    console.log("Selected Images on gallery access", selectedImagesGlobal);

    navigation.navigate("PhotoStyling", { selectedImagesGlobal });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button onPress={getAlbums} title="Get albums" /> */}
      <ScrollView>
        {/* <FlatList
          data={albums.map}
          renderItem={({ album }) => <AlbumEntry album={album} />}
        /> */}
        {albums &&
          albums.map((album) => <AlbumEntry key={album.id} album={album} />)}
      </ScrollView>
      <Pressable style={styles.buttonStyle} onPress={handleProceed}>
        <Text style={styles.buttonText}>STYLE YOUR PHOTO</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({
        album,
        first: 20,
      });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  const handlePress = (uri) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(uri)) {
        const updatedSelection = prevSelectedImages.filter(
          (imageUri) => imageUri !== uri
        );
        console.log("updatedSelection", updatedSelection);
        // selectedImagesGlobal = selectedImagesGlobal.concat(updatedSelection);
        selectedImagesGlobal = updatedSelection;
        selectedImagesGlobal = [...new Set(selectedImagesGlobal)];
        // const filteredArray = selectedImagesGlobal.filter((value) =>
        //   updatedSelection.includes(value)
        // );
        // selectedImagesGlobal = selectedImagesGlobal.concat(filteredArray);

        console.log("Image removed", selectedImagesGlobal);

        return selectedImagesGlobal;
      } else {
        const updatedSelection = [...prevSelectedImages, uri];
        //console.log("Selected Images before global", updatedSelection);

        selectedImagesGlobal = selectedImagesGlobal.concat(updatedSelection);
        selectedImagesGlobal = [...new Set(selectedImagesGlobal)];
        console.log("Image added", selectedImagesGlobal);

        return selectedImagesGlobal;
      }
    });
    // if (selectedImages.includes(uri)) {
    //   setSelectedImages(selectedImages.filter((imageUri) => imageUri !== uri));
    //   selectedImagesGlobal = selectedImages;
    // } else {
    //   setSelectedImages([...selectedImages, uri]);
    //   console.log("Selected Images before global", selectedImages);
    //   selectedImagesGlobal = selectedImages;
    //   console.log("Selected Images after global", selectedImagesGlobal);
  };

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>{album.title}</Text>
      <View style={styles.albumAssetsContainer}>
        {assets &&
          assets.map((image) => (
            // console.log(image)
            <TouchableOpacity
              key={image.id}
              onPress={() => handlePress(image.uri)}
            >
              <Image
                style={[
                  styles.imageStyle,
                  selectedImages.includes(image.uri) && styles.selectedImage,
                ]}
                source={{ uri: image.uri }}
                width={100}
                height={100}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    // justifyContent: "center",
    ...Platform.select({
      android: {
        paddingTop: 10,
      },
    }),
  },
  albumContainer: {
    paddingHorizontal: 5,
    marginBottom: 5,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageStyle: {
    borderColor: "white",
    borderWidth: 3,
  },
  selectedImage: {
    borderColor: "#EA9B3F",
    // borderWidth: 3,
  },
  buttonStyle: {
    flex: 1,
    marginTop: 679,
    marginLeft: 122,
    backgroundColor: "#EA9B3F",
    position: "absolute",

    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 10,
  },
  buttonText: { fontSize: 15, color: "white", fontWeight: "bold" },
});
