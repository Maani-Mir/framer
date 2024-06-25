import ImageSlider from "../components/ImageSlider";
import GalleryAccess from "./GalleryAccess";
import PhotoStyling from "./photostyling";
import AddressScreen from "./addressscreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function ImageSliderScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ImageSlider"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ImageSlider" component={ImageSlider} />
      <Stack.Screen name="GalleryAccess" component={GalleryAccess} />
      <Stack.Screen name="PhotoStyling" component={PhotoStyling} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
    </Stack.Navigator>
  );
}
