import { useState, useEffect, useMemo, memo, useRef } from "react";
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
  Animated,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PhotoStyling from "./photostyling";
import { useRoute } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
import { imageAdd, imageRemove, flushImages } from "../redux/imagesslice";
import { useDispatch, useSelector } from "react-redux";
import DynamicTabView from "react-native-dynamic-tab-view";
// import { FlatList } from "react-native-gesture-handler";

// store.subscribe(() => console.log(store.getState()))

const initialLayout = { width: Dimensions.get("window").width };

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
          <Text style={styles.unselectText} allowFontScaling={false}>
            UNSELECT ALL
          </Text>
        </Pressable>
      </View>

      {/* <ScrollView>
        {albums &&
          albums.map((album) => (
            <AlbumEntry key={album.id} album={album} image={image} />
          ))}
      </ScrollView> */}
      <AlbumTabs
        // style={{ marginTop: -350 }}
        albums={albums}
        image={image}
      />
      <Pressable style={styles.buttonStyle} onPress={handleProceed}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          STYLE YOUR PHOTO
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

function AlbumTabs({ albums, image }) {
  const [index, setIndex] = useState(0);
  const [sceneAssets, setSceneAssets] = useState([]);
  const [routes, setRoutes] = useState([]);

  data = [
    { title: "Tab1", key: "item1", color: "blue" },
    { title: "Tab2", key: "item2", color: "yellow" },
  ];
  let defaultIndex = 0;

  // const renderScene = () => {
  //   console.log("albums: ", albums);

  //   let scenes = {};
  //   if (albums.length > 0) {
  //     albums.reduce((test, album) => {
  //       console.log("album: ", album);
  //       console.log("scenes: ", scenes);
  //       scenes[album.id] = () => {
  //         <AlbumEntry album={album} image={image} />;
  //       };

  //       setSceneAssets(scenes);
  //     }, {});
  //   }
  // };

  // async function sceneMapFunc() {
  //   let sceneMapping = await SceneMap(sceneAssets);
  //   console.log("SCENESSSSSSSS", sceneMapping);
  // }

  // useEffect(() => {
  //   sceneMapFunc();
  // }, [sceneAssets]);

  useEffect(() => {
    console.log("are we getting into render scene");
    //renderScene();

    const routeArray = albums.map((album) => {
      console.log("album.id: ", album.id);
      console.log("album.title: ", album.title);

      return {
        key: album.id,
        title: album.title,
      };
    });
    console.log("album length", albums.length);

    setRoutes(routeArray);
  }, [albums]);

  // useEffect

  const renderItem = (item, index) => {
    //console.log("renderItem", index);
    //console.log("renderItem for item", item);

    return (
      <AlbumEntry album={item} image={image} />
      // <View key={index} style={{ backgroundColor: item["color"], flex: 1 }} />
      // <View>
      /* key={index} */

      /* style={{ backgroundColor: item["color"], flex: 1 }} */
      /* </View> */
    );
  };

  const onChangeTab = (index) => {
    // getAlbumAssets();
    // useEffect(() => {
    //   console.log("album assets");
    //   getAlbumAssets();
    // }, []);
  };

  return (
    // <View style={styles.tabViewContainer}>
    routes.length > 0 ? (
      <DynamicTabView
        data={albums}
        renderTab={renderItem}
        defaultIndex={defaultIndex}
        containerStyle={styles.tabContainer}
        headerBackgroundColor={"black"}
        headerTextStyle={styles.headerText}
        onChangeTab={onChangeTab}
        headerUnderlayColor={"#EA9B3F"}
        // viewabilityConfig={viewabilityConfig}
      />
    ) : (
      // <Text>Else body</Text>
      // ---------------------------USE LOADER HERE
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#EA9B3F" }}
            style={{ backgroundColor: "white", height: 50 }}
            scrollEnabled={true}
            renderLabel={({ route, color }) => (
              <Text style={{ color: "black", fontSize: 15, fontWeight: "500" }}>
                {route.title}
              </Text>
            )}
            // onTabPress={}
          />
        )}
        navigationState={{ index, routes }}
        // console doesn't work here

        // renderScene={SceneMap(
        //   albums.reduce((scenes, album) => {
        //     scenes[album.id] = () => {
        //       <AlbumEntry album={album} image={image} />;
        //     };

        //     console.log("scenes: ", scenes);

        //     return scenes;
        //   }, {})
        // )}
        renderScene={SceneMap(sceneAssets)}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        lazy={true}
        style={styles.tabView}
      />
    )

    // </View>
  );
}

function AlbumEntry({ album, image }) {
  const [assets, setAssets] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

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
    // const pageSize = 20;
    // const [lastItemID, setLastItemID] = useState("");
    // const firstPage = await MediaLibrary.getAssetsAsync({
    //   album,
    //   first: 20,
    //   sortBy: MediaLibrary.SortBy.default,
    //   after: undefined,
    // });

    // // console.log("firstPage?: ", firstPage);

    // // const secondPage = await MediaLibrary.getAssetsAsync({
    // //   album,
    // //   first: 25,
    // //   // sortBy: MediaLibrary.SortBy.modificationTime,
    // //   after: "25",
    // // });

    // // setAssets(secondPage.assets);

    // setLastItemID(firstPage.endCursor); // for iOS

    // let n = 2; // page number, starting from 1
    // setLoading(true);

    // const nthPage = await MediaLibrary.getAssetsAsync({
    //   album,
    //   first: pageSize,
    //   // sortBy: MediaLibrary.SortBy.modificationTime,
    //   after: Platform.OS === "android" ? `${(n - 1) * pageSize}` : lastItemID,
    // });
    // setLastItemID(nthPage.endCursor);

    // // const simple = nthPage.assets.map((asset) => {
    // //   return `ID: ${asset.id} Path: ${asset.uri}`;
    // // });

    // setAssets(nthPage.assets);

    //---------------

    setLoading(true);
    const albumAssets = await MediaLibrary.getAssetsAsync({
      album,
      first: 100,
      // after: endCursor,
      sortBy: MediaLibrary.SortBy.creationTime,
    });
    // albumAssets.endCursor;
    setAssets(albumAssets.assets);

    console.log("album assets on getAlbumAssets", albumAssets.assets);
    setLoading(false);
  }

  useEffect(() => {
    console.log("album assets getting??");
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

  // const AssetItem = ({ asset, image }) => {
  //   return (
  //     <TouchableOpacity
  //       key={asset.id}
  //       onPress={() => {
  //         console.log("are we getting any uri", asset);
  //         console.log("are we getting any uri (saadi image)", image.value);

  //         handlePress(asset.uri);
  //       }}
  //     >
  //       <Image
  //         style={[
  //           styles.imageStyle,
  //           image.value != undefined
  //             ? image.value.some((_uri) => asset.uri == _uri.original) &&
  //               styles.selectedImage
  //             : {},
  //         ]}
  //         source={{ uri: asset.uri }}
  //         width={100}
  //         height={100}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  // const renderItemAssets = (item) => {
  //   console.log("item for assets item", item);
  //   // console.log("item.id: ", item.id);
  //   console.log("item.item.id: ", item.item.id);

  //   // console.log("index for assets index", index);
  //   return (
  //     // <View style={styles.tabContainer}>
  //     <TouchableOpacity
  //       key={item.item.id}
  //       onPress={() => {
  //         console.log("are we getting any uri", item);
  //         console.log("are we getting any uri (saadi image)", image.value);

  //         handlePress(item.item.uri);
  //       }}
  //     >
  //       <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
  //         <Image
  //           style={[
  //             styles.imageStyle,
  //             image.value != undefined
  //               ? image.value.some((_uri) => item.item.uri == _uri.original) &&
  //                 styles.selectedImage
  //               : {},
  //           ]}
  //           source={{ uri: item.item.uri }}
  //           width={100}
  //           height={100}
  //         />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const viewabilityConfig = {
  //   // waitforInteraction: true,
  //   viewAreaCoveragePercentThreshold: 80,
  // };

  // const onViewableItemsChanged = useRef(({ viewableItems }) => {
  //   if (viewableItems && viewableItems.length > 0) {
  //     console.log(
  //       "viewable items, can we get uri here????",
  //       viewableItems[0].item
  //     );
  //     //setUri(viewableItems[0].item);
  //     //setIndexForStyle(viewableItems[0].index);
  //   }
  // }).current;

  // function scrollerEndDrag() {
  //   console.log("What's happening in this scroll");

  //   //getAlbumAssets();
  // }

  return (
    <View key={album.id} style={styles.albumContainer}>
      {/* <Text allowFontScaling={false} style={styles.albumNameStyle}>
        {album.title}
      </Text> */}
      {loading ? (
        <ActivityIndicator size="small" color="#EA9B3F" />
      ) : (
        //pagingEnabled={true} onScrollEndDrag={scrollerEndDrag()}
        <ScrollView>
          <View style={styles.albumAssetsContainer}>
            {assets.length === 0 ? (
              <Text allowFontScaling={false} style={styles.noResultsText}>
                0 results
              </Text>
            ) : (
              assets &&
              assets.map((_image) => (
                // <ScrollView style={{ flex: 1 }}>
                // // <View style={{ height: "100%" }}>
                // // <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
                // // <FlatList
                //   data={assets}
                //   renderItem={renderItemAssets}
                //   // columnWrapperStyle={{ flexWrap: "wrap" }}
                //   // contentContainerStyle={{ flexGrow: 1 }}
                //   numColumns={4}
                //   keyExtractor={(item) => item.id}
                //   onViewableItemsChanged={onViewableItemsChanged}
                //   viewabilityConfig={viewabilityConfig}
                //   // removeClippedSubviews={true}
                //   onEndReached={({ distanceFromEnd }) => {
                //     if (!onEndReachedCalledDuringMomentum) {
                //       getAlbumAssets();
                //       setOnEndReachedCalledDuringMomentum(true);
                //     }
                //     console.log(distanceFromEnd);
                //     console.log("we have reached the end");
                //     // onEndReachedThreshold();
                //   }}
                //   onEndReachedThreshold={0.7}
                //   onMomentumScrollBegin={() => {
                //     setOnEndReachedCalledDuringMomentum(false);
                //   }}
                //   // horizontal
                //   // scrollEnabled={true}
                //   // pagingEnabled={true}
                //   // style={styles.tabContainer}

                //   // {console.log('item: ', item)}
                //   // <AssetItem asset={item} image={image} />
                // />
                // </SafeAreaView>

                // </View>
                //</ScrollView>

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

              // assets &&
              // assets.map((_image) => (

              // ))
            )}
          </View>
        </ScrollView>
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
  tabContainer: {
    flex: 1,
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
    // flex: 1,
    paddingHorizontal: 5,
    marginBottom: 5,
    gap: 4,
  },
  albumAssetsContainer: {
    flex: 1,
    // flexGrow: 1,
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
    // flex: 1,
    // flexDirection: "row",
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
  unselectText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    paddingTop: 2,
    paddingLeft: 4,
    // paddingBottom: 2,
  },

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
    paddingVertical: 15,
    borderRadius: 7,
  },
  headerText: {
    color: "black",
    // borderColor: "black",
  },
});
