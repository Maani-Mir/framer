import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AddressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { address, handleAddressChange } = route.params;

  const handleDone = () => {
    if (Object.values(address).some((val) => val.trim() === "")) {
      Alert.alert("Error, Please fill in all fields.");
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={StyleSheet.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.addressImage}
          source={require("../assets/address-bike.png")}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={address.fullName}
        onChangeText={(text) => handleAddressChange("fullName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address.addressLine}
        onChargeText={(text) => handleAddressChange("addressLine", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => handleAddressChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={address.emailAddress}
        onChangeText={(text) => handleAddressChange("emailAddress", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={address.phoneNumber}
        onChangeText={(text) => handleAddressChange("phoneNumber", text)}
      />
      <Pressable style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>DONE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    backgroundColor: "#EA9B3F",
  },
  addressImage: {
    height: 240,
    width: 240,
    marginBottom: 10,
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  doneButton: {
    backgroundColor: "#EA9B3F",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
