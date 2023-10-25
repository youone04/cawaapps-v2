import React, { useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function Register({navigation}) {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async () => {
    if (passwordAgain.current.value !== password.current.value) {
      // Handle password mismatch error here
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        // Replace with your API call using Axios
        // await axios.post("/auth/register", user);
        // Redirect to another page on successful registration
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <TextInput
          placeholder="Username"
          ref={username}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          ref={email}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          ref={password}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Password Again"
          ref={passwordAgain}
          style={styles.input}
          secureTextEntry={true}
        />
        <Button title="Sign Up" onPress={handleClick} />
        <Button title="Log into Account" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  loginBox: {
    height: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 18,
    paddingLeft: 20,
    marginBottom: 10,
  },
});
