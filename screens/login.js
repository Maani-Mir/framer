import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
//import * as Keychain from "react-native-keychain";

//--------Async storage
// const checkLoginStatus = async (navigation, setIsLoading) => {
//   try {
//     const loggedIn = await AsyncStorage.getItem("loggedIn");
//     if (loggedIn) {
//       navigation.navigate("GalleryAccess");
//     }
//   } catch (error) {
//     console.log("Failed to check login status", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

//--------expo-secure-store
const checkLoginStatus = async (navigation, setIsLoading) => {
  try {
    const loggedIn = await SecureStore.getItemAsync("loggedIn");
    if (loggedIn) {
      navigation.navigate("GalleryAccess");
    }
  } catch (error) {
    console.log("Failed to check login status", error);
  } finally {
    setIsLoading(false);
  }
};

//----------react-native-keychain
// const checkLoginStatus = async (navigation, setIsLoading) => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (
//       credentials &&
//       credentials.username === "loggedIn" &&
//       credentials.password === "true"
//     ) {
//       navigation.navigate("GalleryAccess");
//     }
//   } catch (error) {
//     console.log("Failed to check login status", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

export default function LoginPage({ navigation }) {
  //const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus(navigation, setIsLoading);
  }, []);

  const handleLogin = async () => {
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
        setUserId(response.data.id);
        setUserToken(response.data.token);

        // console.log("")
        //navigation.navigate("GalleryAccess");
      })
      .catch(function (error) {
        console.log("error", error.message);
        setErrorMessage("Either username or password is incorrect");
        return;
      });

    //if(errorMessage==="")

    // navigation.navigate("Gallery", { selectedImagesGlobal });
    //saving email, password to asyncstorage
    //-------------------Async storage
    //   try {
    //     await AsyncStorage.setItem("userEmail", email);
    //     await AsyncStorage.setItem("userPassword", password);
    //     await AsyncStorage.setItem("loggedIn", "true");
    //     Alert.alert("Success, Login details saved!");
    //     //login logic
    //     navigation.navigate("GalleryAccess");
    //   } catch (error) {
    //     console.error("Failed to save user data", error);
    //     setErrorMessage("Failed to save login details");
    //   }
    //-------------------expo-secure-store
    try {
      await SecureStore.setItemAsync("userId", userId);
      await SecureStore.setItemAsync("userToken", userToken);
      await SecureStore.setItemAsync("loggedIn", "true");
      Alert.alert("Success, Login details saved!");
      //login logic
      navigation.navigate("GalleryAccess");
    } catch (error) {
      console.error("Failed to save user data", error);
      setErrorMessage("Failed to save login details");
    }
    //-----------------react-native-keychain
    // try {
    //   const existingCredentials = await Keychain.getGenericPassword();
    //   if (!existingCredentials) {
    //     //means first-time login
    //     await Keychain.setGenericPassword(email, password);
    //   }
    //   await Keychain.setGenericPassword("loggedIn", true);
    //   Alert.alert("Success, Login details saved!");
    //   //login logic
    //   navigation.navigate("GalleryAccess");
    // } catch (error) {
    //   console.error("Failed to save user data", error);
    //   setErrorMessage("Failed to save login details");
    // }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EA9B3F" />
      </View>
    );
  }
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
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.textSign}>
        <Text>Don't have an account?</Text>
      </View>
      <Pressable
        style={styles.signupButton}
        onPress={() => navigation.navigate("SignUpPage")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
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
  loginButton: {
    height: 50,
    backgroundColor: "#EA9B3F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 10,
  },
  signupButton: {
    height: 50,
    backgroundColor: "#EA9B3F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textSign: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 120,
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
