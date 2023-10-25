import React, {useContext, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store"; // for storing your API URL securely
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
// const PF = 'http://192.168.1.5:8800/api'; // Replace with your API URL


export default function Login({navigation}) {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    // Handle the login call here using your authentication context
    // You can use the 'dispatch' function to initiate the login action.
    const payload ={ email: email.current.value, password: password.current.value }
    loginCall(payload, dispatch)
  };

  // const loginCall = async (payload) => {
  //   try {
  //     const res = await axios.post(`${PF}/auth/login`, payload);
  //     if(res.status === 200){
  //       await sessionStorage.setItem("user", JSON.stringify(res.data))
  //       navigation.navigate("homeuser")
  //     }
  //     } catch (err) {
  //       console.log(err)
  //   }
  // };


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f0f2f5" }}>
      <View style={{ width: "70%", height: "70%", flexDirection: "row" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.loginLogo}>Lamasocial</Text>
          <Text style={styles.loginDesc}>Connect with friends and the world around you on Lamasocial.</Text>
        </View> 
        <View style={{ flex: 1 }}>
          <View style={styles.loginBox}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.loginInput}
              ref={email}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.loginInput}
              ref={password}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleClick}
              disabled={isFetching}
            >
              {isFetching ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>Log In</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.loginForgot}>Forgot Password?</Text>
            <TouchableOpacity style={styles.loginRegisterButton}>
              {isFetching ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>Create a New Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {
  loginLogo: {
    fontSize: 50,
    fontWeight: "800",
    color: "#1775ee",
    marginBottom: 10,
  },
  loginDesc: {
    fontSize: 24,
  },
  loginBox: {
    height: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  loginInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 18,
    paddingLeft: 20,
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#1775ee",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  loginForgot: {
    textAlign: "center",
    color: "#1775ee",
  },
  loginRegisterButton: {
    width: "60%",
    alignSelf: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#42b72a",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};
