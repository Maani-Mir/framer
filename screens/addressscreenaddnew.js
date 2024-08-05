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
import axios from "axios";
import CustomText from "../components/customtext";
export default function AddressScreenAddNew() {
  const route = useRoute();
  const navigation = useNavigation();
  let addressFilter = [];
  //   const { onDone } = route.params;

  const [address, setAddress] = useState([]);

  console.log("address coming from address list behind to addnew", address);

  // if (route.params.address) {
  //   addressFilter = [
  //     address.name,
  //     address.addr,
  //     address.city,
  //     address.country,
  //     address.email,
  //     address.pnum,
  //     address.zip,
  //   ];

  //   console.log("Filtered part of address", addressFilter);
  // }

  //const { address: initialAddress, handleAddressChange } = route.params;
  // const [address, setAddress] = useState({
  //   fullName: address.name,
  //   addressLine: address.addr,
  //   city: address.city,
  //   country: address.country,
  //   emailAddress: address.email,
  //   phoneNumber: address.pnum,
  //   zip: address.zip,
  // });

  const countries = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "UAE", value: "UAE" },
  ];

  const handleDone = () => {
    console.log("address after pressing done in address screen", address);
    // console.log("This is the address object values", Object.values(address));

    if (
      Object.values(address).some(
        (val) => typeof val !== "string" || val.trim() === ""
      )
    ) {
      Alert.alert("Error, Please fill in all fields.");
      return;
    }

    const headers = {
      userid: "668e636cdfb7272abd65a759",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2MzZjZGZiNzI3MmFiZDY1YTc1OSIsImlhdCI6MTcyMjg0ODc4OSwiZXhwIjoxNzIzNDUzNTg5fQ.hjb3vgDdThKK7eZSl6fB9APBMzybUXX0PPhTfOQsdN8",
    };
    const data = {
      name: address.name,
      email: address.email,
      country: address.country,
      pnum: address.pnum,
      zip: address.zip,
      addr: address.addr,
      city: address.city,
      notes: address.notes,
    };
    axios
      .post("https://backend.framer.pk/address", data, {
        headers: headers,
      })
      .then(function (response) {
        console.log("response", response.data);
        navigation.goBack();
      })
      .catch(function (error) {
        console.log("error from photostyling", error.message);
      });

    // onDone(address);
    // route.params.address = address;
  };

  const handleChange = (field, value) => {
    console.log(`Changing ${field} to ${value}`);
    //console.log("before setAddress", { ...address, [field]: value });
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  console.log("Rerendering AddressScreenEdit");

  useEffect(() => {
    console.log("State of the address screen", address);
  }, [address]);

  const renderItem = (item) => {
    return (
      <View>
        <Text allowFontScaling={false} style={styles.input}>
          {item.label}
        </Text>
      </View>
    );
  };

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
          allowFontScaling={false}
          style={styles.input}
          placeholder="Full Name"
          value={address.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder="Address"
          value={address.addr}
          onChangeText={(text) => handleChange("addr", text)}
        />
        <TextInput
          allowFontScaling={false}
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
            placeholder={
              <CustomText
                style={styles.placeholderStyle}
                children={"Country"}
              />
            }
            // placeholder="Country"
            value={address.country}
            onChange={(item) => {
              handleChange("country", item.value);
            }}
            renderItem={renderItem}
            renderSelectedItem={(item) => (
              <CustomText
                style={styles.selectedTextStyle}
                children={item.label}
              />
            )}
          />
        </View>
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder="Zip Code"
          value={address.zip}
          onChangeText={(text) => handleChange("zip", text)}
        />
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder="Email Address"
          value={address.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder="Phone Number"
          value={address.pnum}
          onChangeText={(text) => handleChange("pnum", text)}
          keyboardType="phone-pad"
        />
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder="Notes"
          value={address.notes}
          onChangeText={(text) => handleChange("notes", text)}
        />

        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text allowFontScaling={false} style={styles.doneButtonText}>
            SAVE ADDRESS
          </Text>
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
    height: 200,
    width: 200,
    marginBottom: 10,
    marginLeft: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
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
    // borderWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
    allowFontScaling: false,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
    allowFontScaling: false,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
