import ImageSlider from "../components/ImageSlider";
import GalleryAccess from "./GalleryAccess";
import PhotoStyling from "./photostyling";
import AddressScreen from "./addressscreen";
import ImageAdjustScreen from "./imageadjust";
import MyOrders from "./orders";
import LoginPage from "./login";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUpPage from "./signup";

export default function ImageSliderScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ImageSlider"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ImageSlider" component={ImageSlider} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="GalleryAccess" component={GalleryAccess} />
      <Stack.Screen name="PhotoStyling" component={PhotoStyling} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="ImageAdjustScreen" component={ImageAdjustScreen} />
      <Stack.Screen name="OrdersScreen" component={MyOrders} />
    </Stack.Navigator>
  );
}
