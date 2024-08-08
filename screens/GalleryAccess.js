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
import { imageAdd, imageRemove, flushImages } from "../redux/imagesslice";
import { useDispatch, useSelector } from "react-redux";

// store.subscribe(() => console.log(store.getState()))

// const initialLayout = { width: Dimensions.get("window").width };

// i don't know what i was smoking when i thought
// i should use a global array for mainitaining the most
// critical part of the app, the images

//var selectedImagesGlobal = new Array();

export default function GalleryAccess({ navigation }) {
  const image = useSelector((state) => {
    console.log(
      "consoling state image in selector (galleryaccess)",
      state.image
    );
    return state.image;
  });

  console.log("set image slice in gallery", image);
  const dispatch = useDispatch();

  // dispatch(imageAdd(uri, prevSelectedImages));

  const route = useRoute();
  const [albums, setAlbums] = useState([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [selectedCount, setSelectedCount] = useState([]);

  // const userId = route.params.userId;
  // const userToken = route.params.token;

  // const memoAlbums = memo(() => getAlbums(), [albums]);

  // after adding or removing images from addImage and addRemove,
  // see from below useEffect if we're adding or removing it correctly
  useEffect(() => {
    console.log("imageRedux in useEffect?", image);
  }, [image]);

  async function getAlbums() {
    console.log("are we getting in getalbums?");

    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }
    // dispatch(imageAdd());

    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    console.log("albums that are fetched", fetchedAlbums);
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    console.log("imageRedux in useEffect?", image);

    getAlbums();
  }, [permissionResponse]);

  // const handleImageSelection = (updatedSelection) => {
  //   setSelectedCount([...new Set(updatedSelection)]);
  // };

  const handleProceed = () => {
    if (image.count < 3) {
      Alert.alert("Select atleast 3 images to proceed");
      return;
    }

    navigation.navigate("PhotoStyling");
  };

  if (!albums) {
    return <ActivityIndicator size="large" color="#EA9B3F" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text allowFontScaling={false} style={styles.headerSelectedImagesText}>
          Selected Images: {image.count}
        </Text>
        <Pressable
          style={styles.unselectStyle}
          onPress={() => {
            dispatch(flushImages());
          }}
        >
          <Text>Unselect All</Text>
        </Pressable>
      </View>
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
              image={image}
              //onImageSelect={handleImageSelection}
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

// function AlbumTabs({ albums, handleImageSelection }) {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState(
//     albums.map((album) => ({
//       key: album.id,
//       title: album.title,
//     }))
//   );

//   const renderScene = SceneMap(
//     albums.reduce((scenes, album) => {
//       scenes[album.id] = () => (
//         <AlbumEntry album={album} onImageSelect={handleImageSelection} />
//       );
//       return scenes;
//     }, {})
//   );

//   return (
//     // <View style={styles.tabViewContainer}>
//     <TabView
//       renderTabBar={() => null}
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={initialLayout}
//       style={styles.tabView}
//     />
//     // </View>
//   );
// }

function AlbumEntry({ album, image }) {
  const [assets, setAssets] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image.value != undefined) {
      setSelectedImages(image.value);
    }
  }, [image]);

  // useEffect(() => {
  //   console.log("set image redux in album entry", image);

  //   console.log("Images that should show border color", selectedImages);
  // }, [selectedImages]);

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

  const handlePress = async (uri) => {
    setSelectedImages((prevSelectedImages) => {
      if (selectedImages.some((_uri) => _uri.original == uri)) {
        const updatedSelection = prevSelectedImages.filter(
          (imageUri) => imageUri.original !== uri
        );
        // //to show how many images are selected
        //onImageSelect(updatedSelection);

        console.log("updatedSelection on remove part", updatedSelection);

        //uri passes to the action param of image remove
        dispatch(imageRemove({ uri }));

        // selectedImagesGlobal = updatedSelection;
        // selectedImagesGlobal = [...new Set(selectedImagesGlobal)];

        // console.log("Image removed", selectedImagesGlobal);

        return updatedSelection;
      } else {
        dispatch(imageAdd({ uri }));
        const updatedSelection = [
          ...prevSelectedImages,
          { original: uri, cropped: "" },
        ];

        // //to show how many images are selected
        // onImageSelect(updatedSelection);

        console.log("updatedSelection on add part", updatedSelection);

        // selectedImagesGlobal = selectedImagesGlobal.concat(updatedSelection);
        // selectedImagesGlobal = [...new Set(selectedImagesGlobal)];
        // console.log("Image added", selectedImagesGlobal);

        return updatedSelection;
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
            assets.map((_image) => (
              <TouchableOpacity
                key={_image.id}
                onPress={() => {
                  console.log("are we getting any uri", _image);
                  console.log(
                    "are we getting any uri (saadi image)",
                    image.value
                  );

                  handlePress(_image.uri);
                }}
              >
                <Image
                  style={[
                    styles.imageStyle,
                    image.value != undefined
                      ? image.value.some(
                          (_uri) => _image.uri == _uri.original
                        ) && styles.selectedImage
                      : {},
                  ]}
                  source={{ uri: _image.uri }}
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
  row: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
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
    // textAlign: "center",
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
  unselectStyle: {
    // marginTop: 0,
    marginLeft: "auto",
    marginRight: 30,
    // position: "relative",
    width: 140,
    height: 50,
    backgroundColor: "#EA9B3F",
    textAlign: "center",
    // position: "absolute",
    // alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 7,
  },
});
