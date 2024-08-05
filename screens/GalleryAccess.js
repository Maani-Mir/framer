import { useState, useEffect, useMemo, memo } from "react";
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
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabView, SceneMap } from "react-native-tab-view";
import PhotoStyling from "./photostyling";
import { useRoute } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    value: "",
  },
  reducers: {
    imageManipulation: (state) => {
      state.value = handlePress(uri);
    },
  },
});

const counterImageSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = counterImageSlice.actions;
export const { imageManipulation } = imageSlice.actions;

const store = configureStore({
  reducer: counterImageSlice.reducer,
  reducer: imageSlice.reducer,
});

// store.subscribe(() => console.log(store.getState()))

const initialLayout = { width: Dimensions.get("window").width };

// i don't know what i was smoking when i thought
// i should use a global array for mainitaining the most
// critical part of the app, the images
var selectedImagesGlobal = new Array();

// async function getAlbums(setAlbums, permissionResponse, requestPermission) {
//   if (permissionResponse.status !== "granted") {
//     await requestPermission();
//   }
//   const fetchedAlbums = await MediaLibrary.getAlbumAsync({
//     includeSmartAlbums: true,
//   });
//   setAlbums(fetchedAlbums);
// }

// async function getAlbumAssets(album, setAssets, setLoading) {
//   setLoading(true);
//   const albumAssets = await MediaLibrary.getAssetsAsync({
//     album,
//     first: 20,
//   });
//   setAssets(albumAssets.assets);
//   setLoading(false);
// }

export default function GalleryAccess({ navigation }) {
  const route = useRoute();
  const [albums, setAlbums] = useState([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [selectedCount, setSelectedCount] = useState([]);
  // const userId = route.params.userId;
  // const userToken = route.params.token;

  // const memoAlbums = memo(() => getAlbums(), [albums]);

  async function getAlbums() {
    console.log("are we getting in getalbums?");
    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    console.log("albums that are fetched", fetchedAlbums);
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    getAlbums();
  }, [permissionResponse]);

  const handleImageSelection = (updatedSelection) => {
    setSelectedCount([...updatedSelection]);
  };

  const handleProceed = () => {
    if (selectedImagesGlobal.length < 3) {
      Alert.alert("Select atleast 3 images to proceed");
      return;
    }
    console.log("Selected Images on gallery access", selectedImagesGlobal);

    navigation.navigate("PhotoStyling", { selectedImagesGlobal });
  };

  if (!albums) {
    return <ActivityIndicator size="large" color="#EA9B3F" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text allowFontScaling={false} style={styles.headerSelectedImagesText}>
        Selected Images: {selectedImagesGlobal.length}
      </Text>
      {/* <AlbumTabs
        // style={{ marginTop: -350 }}
        albums={memoAlbums}
        handleImageSelection={handleImageSelection}
      /> */}
      <ScrollView>
        {albums &&
          albums.map((album) => (
            <AlbumEntry
              key={album.id}
              album={album}
              onImageSelect={handleImageSelection}
            />
          ))}
      </ScrollView>
      <Pressable style={styles.buttonStyle} onPress={handleProceed}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          STYLE YOUR PHOTO
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

function AlbumTabs({ albums, handleImageSelection }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    albums.map((album) => ({
      key: album.id,
      title: album.title,
    }))
  );

  const renderScene = SceneMap(
    albums.reduce((scenes, album) => {
      scenes[album.id] = () => (
        <AlbumEntry album={album} onImageSelect={handleImageSelection} />
      );
      return scenes;
    }, {})
  );

  return (
    // <View style={styles.tabViewContainer}>
    <TabView
      renderTabBar={() => null}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
    // </View>
  );
}

function AlbumEntry({ album, onImageSelect }) {
  const [assets, setAssets] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Images that should show border color", selectedImages);
  }, [selectedImages]);

  async function getAlbumAssets() {
    setLoading(true);
    const albumAssets = await MediaLibrary.getAssetsAsync({
      album,
      first: 20,
    });
    setAssets(albumAssets.assets);
    setLoading(false);
  }

  useEffect(() => {
    console.log("album assets");
    getAlbumAssets();
  }, [album]);

  const handlePress = (uri) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(uri)) {
        const updatedSelection = prevSelectedImages.filter(
          (imageUri) => imageUri !== uri
        );
        //to show how many images are selected
        onImageSelect(updatedSelection);

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

        //to show how many images are selected
        onImageSelect(updatedSelection);

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
      <Text allowFontScaling={false} style={styles.albumNameStyle}>
        {album.title}
      </Text>
      {loading ? (
        <ActivityIndicator size="small" color="#EA9B3F" />
      ) : (
        <View style={styles.albumAssetsContainer}>
          {assets.length === 0 ? (
            <Text allowFontScaling={false} style={styles.noResultsText}>
              0 results
            </Text>
          ) : (
            // assets &&
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
            ))
          )}
        </View>
      )}
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
  tabViewContainer: {
    height: 20,
  },
  tabView: {
    flex: 1,
    height: 20,
  },
  headerSelectedImagesText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
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
  albumNameStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  imageStyle: {
    borderColor: "white",
    borderWidth: 3,
  },
  noResultsText: {
    fontSize: 16,
  },
  selectedImage: {
    borderColor: "#EA9B3F",
    // borderWidth: 3,
  },
  buttonStyle: {
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
  },
  buttonText: { fontSize: 15, color: "white", fontWeight: "bold" },
});
