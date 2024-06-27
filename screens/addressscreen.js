import React, { useState, useEffect } from "react";
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
  const { onDone } = route.params;
  //const { address: initialAddress, handleAddressChange } = route.params;
  const [address, setAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const handleDone = () => {
    if (Object.values(address).some((val) => val.trim() === "")) {
      Alert.alert("Error, Please fill in all fields.");
      return;
    }
    onDone(address);
    navigation.goBack();
  };

  const handleChange = (field, value) => {
    console.log(`Changing ${field} to ${value}`);
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  console.log("Rerendering AddressScreen");

  useEffect(() => {
    console.log("State of the address screen", address);
  }, [address]);

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
        onChangeText={(text) => handleChange("fullName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address.addressLine}
        onChangeText={(text) => handleChange("addressLine", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={address.emailAddress}
        onChangeText={(text) => handleChange("emailAddress", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={address.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
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
