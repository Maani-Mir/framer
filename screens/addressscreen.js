import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
//import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";

export default function AddressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { onDone } = route.params;
  //const { address: initialAddress, handleAddressChange } = route.params;
  const [address, setAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    country: "",
    emailAddress: "",
    phoneNumber: "",
    zip: "",
  });

  const countries = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "UAE", value: "UAE" },
  ];

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countries}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Country"
            value={address.country}
            onChange={(item) => {
              handleChange("country", item.value);
            }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={address.zip}
          onChangeText={(text) => handleChange("zip", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={address.emailAddress}
          onChangeText={(text) => handleChange("emailAddress", text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={address.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
          keyboardType="phone-pad"
        />
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>PLACE ORDER</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 7,
  },
  dropdownContainer: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    // paddingHorizontal: 10,
    borderRadius: 7,
    justifyContent: "center",
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  pickerContainer: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    justifyContent: "center",
  },
  doneButton: {
    backgroundColor: "#EA9B3F",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
