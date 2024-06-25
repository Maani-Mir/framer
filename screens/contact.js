import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default function ContactUs() {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.contactImage}
          source={require("../assets/contact.png")}
        />
      </View>
      <View style={styles.textPad}>
        <Text style={styles.textYellow}>
          Email:
          <Text style={styles.textBlack}>{"\n"}info@framer.pk</Text>
          <Text style={styles.textYellow}>{"\n"}Phone: </Text>
          <Text style={styles.textBlack}>{"\n"}0300-8441864</Text>
          <Text style={styles.textYellow}>{"\n"}Address: </Text>
          <Text style={styles.textBlack}>
            {"\n"}Suite No. 403-D, 4th Floor City Towers Main Boulevard Road,
            Gulberg II, Lahore, Pakistan
          </Text>
        </Text>
      </View>
    </View>

    /*
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Contact Us Screen</Text>
    </View>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EA9B3F",
  },
  contactImage: {
    height: 240,
    width: 240,
    marginBottom: 10,
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textPad: {
    marginLeft: 8,
  },
  textYellow: {
    color: "#EA9B3F",
    fontWeight: "bold",
    fontWeight: "20px",
  },
  textBlack: {
    color: "grey",
  },
});
