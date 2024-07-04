import "react-native-gesture-handler";

import React, { Fragment } from "react";
import "expo-dev-client";
import Icon from "react-native-vector-icons/Entypo";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "react-native";
import ImageSlider from "./components/ImageSlider";
import AboutUs from "./screens/about";
import ContactUs from "./screens/contact";
import MyOrders from "./screens/orders";
import DrawerContent, { DrawerStyles } from "@react-navigation/drawer";
import CustomSidebarMenu from "./components/CustomSidebarMenu";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ImageSliderScreen from "./screens/imageslider";

//const navigation = useNavigation();
//do i really have to make StackNav for every drawer just to get the status bar right?
const StackHome = () => {
  const Stack = createNativeStackNavigator();
  //const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#EA9B3F",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={ImageSliderScreen} />
    </Stack.Navigator>
  );
};

const StackAbout = () => {
  const Stack = createNativeStackNavigator();
  //const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#EA9B3F",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={AboutUs} />
    </Stack.Navigator>
  );
};

const StackContact = () => {
  const Stack = createNativeStackNavigator();
  //const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#EA9B3F",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={ContactUs} />
    </Stack.Navigator>
  );
};

const StackOrders = () => {
  const Stack = createNativeStackNavigator();
  //const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#EA9B3F",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={MyOrders} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#EA9B3F" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        drawerStyle: { backgroundColor: "#EA9B3F" },
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#EA9B3F",
        drawerInactiveTintColor: "white",
      }}
      //drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Framer.pk"
        component={StackHome}
        options={{ drawerLabel: "Home" }}
      />

      <Drawer.Screen
        name="About Us"
        component={StackAbout}
        options={{ drawerLabel: "About Us" }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={StackContact}
        options={{ drawerLabel: "Contact Us" }}
      />
      <Drawer.Screen
        name="My Orders"
        component={StackOrders}
        options={{ drawerLabel: "My Orders" }}
      />
    </Drawer.Navigator>
  );
}

export default App = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

/*
const headerStyle = (navigation) => {
  return {
    drawerPosition: "right",
    headerLeft: false,
    headerRight: () => (
      <Icon
        name="menu"
        size={20}
        color="black"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
  };
};
*/
const styles = StyleSheet.create({});

/*
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to ImageSlider"
        onPress={() => navigation.navigate("ImageSlider")}
      />
    </View>
  );
}
*/
/*
function MyDrawer() {
  return (
    
  );
}
*/
/*




<Stack.Screen name="Feed" component={Feed} />
<Stack.Screen name="Article" component={Article} />

*/

/*
const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={StackNav} />
    </Drawer.Navigator>
  );
};
*/
