import React, { useEffect, useState, createContext, useContext } from "react";
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
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { userIdAdd } from "../redux/authslice";

//import AsyncStorage from "@react-native-async-storage/async-storage";

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
      // navigation.navigate("GalleryAccess");
    }
  } catch (error) {
    console.log("Failed to check login status", error);
  }
  // finally {
  //   setIsLoading(false);
  // }
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
  // let userToken = "";

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const auth = useSelector((state) => {
    console.log("consoling state auth in selector (login.js)", state.auth);

    return state.auth;
  });
  console.log("set auth slice in login.js", auth);

  const dispatch = useDispatch();

  const verifyToken = async () => {
    let userTokenSecure = await SecureStore.getItemAsync("userToken");
    let userIdSecure = await SecureStore.getItemAsync("userId");
    console.log("What's in here? do we have token", userTokenSecure);

    const headers = {
      userid: userIdSecure,
      Authorization: `Bearer ${userTokenSecure}`,
      // Authorization: `Bearer ${userTokenSecure}`,
    };

    if (userTokenSecure) {
      console.log("userTokenSecure is valid", userTokenSecure);
      console.log("this is my id right now", userIdSecure);
      console.log("this is my token right now", userTokenSecure);
      console.log("can i get my headers consoled too?", headers);

      axios
        .post(
          "https://backend.framer.pk/verify-token",
          {},
          { headers: headers }
        )
        .then(function (response) {
          console.log("are we even getting here?");
          console.log(
            "should be getting something like a token maybe?",
            response.config.headers.userid
          );

          //during the session we need to make sure the user stays logged in
          //otherwise he may get timed out based on expiration of token

          dispatch(userIdAdd({ id: response.config.headers.userid }));
        })
        .catch(async function (error) {
          console.log("Error, can't verify token", error);
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("userId");
          handleLogin();
        });
    } else {
      console.log("userTokenSecure is invalid", userTokenSecure);
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userId");
      handleLogin();
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  console.log("user token before handleLogin", userToken);

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
      .then(async function (response) {
        console.log("response token", response.data);

        // setUserId(response.data.id);
        dispatch(userIdAdd({ id: response.data.id }));
        console.log("did we get the user? (we should tho): ", auth.userId);

        setUserToken(response.data.token);
        //console.log("userToken before setting: ", userToken);

        // sole purpose to have them is when user reloads its app again,
        // the app knows it's that user since secure store doesn't get empty
        // like redux store when relaunching the app

        await SecureStore.setItemAsync("userToken", response.data.token);
        await SecureStore.setItemAsync("userId", response.data.id);
        // console.log("userToken after setting: ", userToken);

        // console.log(
        //   "user token before setItemAsync but after handleLogin: ",
        //   userTokenSecure
        // );

        // console.log("")
        //navigation.navigate("GalleryAccess");
      })
      .catch(function (error) {
        console.log("error", error.message);
        setErrorMessage("Either username or password is incorrect");
        return;
      });

    // if (userToken)

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
    // try {
    //   await SecureStore.setItemAsync("userId", userId);
    //   await SecureStore.setItemAsync("userToken", userToken);
    //   await SecureStore.setItemAsync("loggedIn", "true");
    //   //Alert.alert("Success, Login details saved!");
    //   //login logic

    //   // navigation.navigate("GalleryAccess");
    // } catch (error) {
    //   console.error("Failed to save user data", error);
    //   setErrorMessage("Failed to save login details");
    // }

    //console.log("user token after setItemAsync", userToken);

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

  // useEffect(() => {
  //   console.log("userToken are we getting it??!?", userToken);
  // }, [userToken]);
  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#EA9B3F" />
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>
        Login
      </Text>
      {errorMessage ? (
        <Text allowFontScaling={false} style={styles.error}>
          {errorMessage}
        </Text>
      ) : null}
      <TextInput
        allowFontScaling={false}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        allowFontScaling={false}
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          Login
        </Text>
      </Pressable>
      <View style={styles.textSign}>
        <Text allowFontScaling={false}>Don't have an account?</Text>
      </View>
      <Pressable
        style={styles.signupButton}
        onPress={() => navigation.navigate("SignUpPage")}
      >
        <Text allowFontScaling={false} style={styles.buttonText}>
          Sign up
        </Text>
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
