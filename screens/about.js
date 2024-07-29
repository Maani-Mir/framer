import React, { useCallback } from "react";
import { Text, View, StyleSheet, Linking, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AboutUs() {
  const url = "https://framer.pk/";
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Can't open the website");
    }
  });
  return (
    <Text allowFontScaling={false} style={styles.aboutUsDescription}>
      Capture your favorite memories forever and decorate your house with them
      in a simple and easy way.
      <Text
        allowFontScaling={false}
        style={styles.framerLink}
        onPress={handlePress}
      >
        {" "}
        Framer.pk
      </Text>
      <Text allowFontScaling={false}>
        {" "}
        prints your pictures into high quality frames that you ca put on your
        walls or clean surface. {"\n"} {"\n"}
        Mix and match in a way you desire. Give your house a touch of home.
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  aboutUsDescription: {
    fontSize: 20,
    marginLeft: 8,
  },
  framerLink: {
    fontSize: 20,
    color: "#EA9B3F",
  },
});
