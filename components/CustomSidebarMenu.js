import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  ImageBackground,
} from "react-native";
/*
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "react-navigation/drawer";
*/
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CustomSidebarMenu(props) {
  const path = "C:/Code/stax-work/02-framer-rework/framer/assets";
  const logoImage = "framer-logo.png";
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../assets/framer-logo.png")}
        styles={styles.topDrawerImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topDrawerImage: {
    marginLeft: 200,
    marginTop: 100,
  },
});

/*
const DrawerList = [
  { icon: "home-outline", label: "Home", navigateTo: "Home" },
  { icon: "account-multiple", label: "AboutUs", navigateTo: "AboutUs" },
  { icon: "account-group", label: "ContactUs", navigateTo: "ContactUs" },
  { icon: "account-group", label: "Orders", navigateTo: "Orders" },
];

const DrawerLayout = ({ icon, label, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      icon={({ color, size }) => <Icon name={icon} color={color} size={size} />}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = (props) => {
  return DrawerList.map((listitem, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={listitem.icon}
        label={listitem.label}
        navigateTo={listitem.navigateTo}
      />
    );
  });
};

export default function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItems />
      </DrawerContentScrollView>
    </View>
  );
}
*/
