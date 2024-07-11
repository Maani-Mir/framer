import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage({ navigation }) {
  //const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    //email validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    //clearing any existing error messages before local storage
    setErrorMessage("");

    axios
      .post("https://backend.framer.pk/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log("response", response.data);
        navigation.navigate("GalleryAccess");
      })
      .catch(function (error) {
        console.log("error", error.message);
        setErrorMessage("Either username or password is incorrect");
        return;
      });

    //if(errorMessage==="")

    // navigation.navigate("Gallery", { selectedImagesGlobal });
    //saving email, password to asyncstorage
    // try {
    //   await AsyncStorage.setItem("userEmail", email);
    //   await AsyncStorage.setItem("userPassword", password);
    //   Alert.alert("Success, Login details saved!");
    //   //login logic
    // } catch (error) {
    //   console.error("Failed to save user data", error);
    //   setErrorMessage("Failed to save login details");
    // }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.textSign}>
        <Text>Don't have an account? Register Now! </Text>
        <Pressable onPress={() => navigation.navigate("SignUpPage")}>
          <Text style={styles.buttonSign}>Sign up here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  button: {
    height: 50,
    backgroundColor: "#EA9B3F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textSign: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 30,
  },
  buttonSign: {
    color: "#EA9B3F",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
