import * as SecureStore from "expo-secure-store";

export const checkHeader = async () => {
  try {
    const userIdHeader = await SecureStore.getItemAsync("userId");
    const tokenHeader = await SecureStore.getItemAsync("userToken");
    console.log("tokenHeader: ", tokenHeader);
    console.log("userIdHeader: ", userIdHeader);
    return { userid: userIdHeader, Authorization: `Bearer ${tokenHeader}` };
  } catch (error) {
    console.log("No ID or token recieved", error);
  }
};
