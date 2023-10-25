import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <View style={own ? styles.ownMessage : styles.message}>
      <View style={styles.messageTop}>
        <Image
          source={{ uri: "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }}
          style={styles.messageImg}
        />
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      <Text style={styles.messageBottom}>{format(message.createdAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    flexDirection: "column",
    marginTop: 20,
  },
  messageTop: {
    flexDirection: "row",
  },
  messageImg: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginRight: 10,
  },
  messageText: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#1877f2",
    color: "white",
    maxWidth: 300,
  },
  messageBottom: {
    fontSize: 12,
    marginTop: 10,
  },
  ownMessage: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "flex-end",
  },
  ownMessageText: {
    backgroundColor: "rgb(245, 241, 241)",
    color: "black",
  },
});
