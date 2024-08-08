import ImageSlider from "../components/ImageSlider";
import GalleryAccess from "./GalleryAccess";
import PhotoStyling from "./photostyling";
import AddressScreenEdit from "./addressscreenedit";
import ImageAdjustScreen from "./imageadjust";
import MyOrders from "./orders";
import LoginPage from "./login";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUpPage from "./signup";
import OrderDetails from "./orderdetails";
import { useEffect, useState } from "react";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
// import * as Keychain from "react-native-keychain";

import { View, ActivityIndicator } from "react-native";
import TabViewExp from "./tabview";
import AddressList from "./addresslist";
import AddressScreenAddNew from "./addressscreenaddnew";
import ReduxExp from "../components/ReduxExp";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

//------Async Storage
// const checkLoginStatus = async (setInitialRoute, setIsLoading) => {
//   try {
//     const loggedIn = await AsyncStorage.getItem("loggedIn");
//     if (loggedIn) {
//       setInitialRoute("GalleryAccess");
//     }
//   } catch (error) {
//     console.error("Failed to check login status", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

//--------expo-secure-store

//---------react-native-keychain
// const checkLoginStatus = async (setInitialRoute, setIsLoading) => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (
//       credentials &&
//       credentials.username === "loggedIn" &&
//       credentials.password === "true"
//     ) {
//       setInitialRoute("GalleryAccess");
//     }
//   } catch (error) {
//     console.error("Failed to check login status", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

export default function ImageSliderScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("ImageSlider");

  const auth = useSelector((state) => {
    console.log(
      "consoling auth state in selector within navigator",
      state.auth
    );
    return state.auth;
  });

  // const dispatch = useDispatch();

  useEffect(() => {
    console.log("auth outside selector in navigator", auth);
  }, [auth]);

  //loggedInStore = SecureStore.getItem("loggedIn");

  const checkLoginStatus = async (setIsLoading) => {
    try {
      if (auth.userId != "") {
        // setInitialRoute("GalleryAccess");
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.log("Failed to log in", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(setIsLoading);
  }, [auth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#EA9B3F" />
      </View>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {auth.userId == "" ? (
        <>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
        </>
      ) : (
        <>
          <Stack.Screen name="ImageSlider" component={ImageSlider} />
          <Stack.Screen name="GalleryAccess" component={GalleryAccess} />
          <Stack.Screen name="PhotoStyling" component={PhotoStyling} />
          <Stack.Screen
            name="AddressScreenEdit"
            component={AddressScreenEdit}
          />
          <Stack.Screen
            name="ImageAdjustScreen"
            component={ImageAdjustScreen}
          />
          <Stack.Screen name="OrdersScreen" component={MyOrders} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          {/* <Stack.Screen name="TabViewExp" component={TabViewExp} /> */}
          <Stack.Screen name="AddressList" component={AddressList} />
          <Stack.Screen
            name="AddressScreenAddNew"
            component={AddressScreenAddNew}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

// export default function ImageSliderScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState("ReduxExp");

//   useEffect(() => {
//     checkLoginStatus(setInitialRoute, setIsLoading);
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#EA9B3F" />
//       </View>
//     );
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName={ReduxExp}
//       screenOptions={{ headerShown: false }}
//     >
//       {/* {loggedIn?} */}
//       {/* <Stack.Screen name="ImageSlider" component={ImageSlider} />
//       <Stack.Screen name="LoginPage" component={LoginPage} />
//       <Stack.Screen name="SignUpPage" component={SignUpPage} />
//       <Stack.Screen name="GalleryAccess" component={GalleryAccess} />
//       <Stack.Screen name="PhotoStyling" component={PhotoStyling} />
//       <Stack.Screen name="AddressScreenEdit" component={AddressScreenEdit} />
//       <Stack.Screen name="ImageAdjustScreen" component={ImageAdjustScreen} />
//       <Stack.Screen name="OrdersScreen" component={MyOrders} />
//       <Stack.Screen name="OrderDetails" component={OrderDetails} />
//       {/* <Stack.Screen name="TabViewExp" component={TabViewExp} /> */}
//       {/* <Stack.Screen name="AddressList" component={AddressList} /> */}
//       {/*
//       <Stack.Screen
//         name="AddressScreenAddNew"
//         component={AddressScreenAddNew}
//       /> */}
//       <Stack.Screen name="ReduxExp" component={ReduxExp} />
//     </Stack.Navigator>
//   );
// }
