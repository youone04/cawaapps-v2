import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

export default function Conversation({setCurrentChat, conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = 'http://192.168.1.5:8800/api'; // Replace with your API URL

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        // Replace with your API call using Axios
        const res = await axios(`${PF}/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <TouchableOpacity  onPress={() => setCurrentChat(conversation)} style={styles.conversation}>
      {/* <Image
        source={
          user?.profilePicture
            ? { uri: PF + user.profilePicture }
            : require("../assets/noAvatar.png")
        }
        style={styles.conversationImg}
      /> */}
      <Text style={styles.conversationName}>{user?.username}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conversation: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  conversationImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20,
  },
  conversationName: {
    fontWeight: "500",
  },
});
