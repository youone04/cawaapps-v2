import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// import * as SecureStore from "expo-secure-store"; // for storing your API URL securely

export default function ChatOnline(props) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = 'http://192.168.1.5:8800/api'; // Replace with your API URL

  useEffect(() => {
    const getFriends = async () => {
      // Fetch your friends list
      try {
        // const token = localStorage.getItem; // Replace with your method of storing and retrieving a token
        const response = await fetch(`${PF}/users/friends/${props?.currentId}`, {
          method: 'GET',
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // }
        });
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error(error);
      }
    };

    getFriends();
  }, [props.currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => props?.onlineUsers.includes(f?._id))
    );
  }, [friends, props?.onlineUsers]);

  const handleClick = async (user) => {
    try {
      const response = await fetch(`${PF}/conversations/find/${props.currentId}/${user._id}`, {
        method: 'GET',
      });
      const data = await response.json();
      props.setCurrentChat(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {onlineFriends.map((o) => (
        <TouchableOpacity
          key={o._id}
          style={styles.chatOnlineFriend}
          onPress={() => handleClick(o)}
        >
          <View style={styles.chatOnlineImgContainer}>
            <Image
              style={styles.chatOnlineImg}
              source={{ uri: o.profilePicture ? PF + o.profilePicture : PF + "person/noAvatar.png" }}
            />
            <View style={styles.chatOnlineBadge}></View>
          </View>
          <Text style={styles.chatOnlineName}>{o.username}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = {
  chatOnlineFriend: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '500',
    marginVertical: 10,
  },
  chatOnlineImgContainer: {
    position: 'relative',
    marginRight: 10,
  },
  chatOnlineImg: {
    width: 32,
    height: 32,
    borderRadius: 16, // Adjust to your needs
    borderWidth: 1,
    borderColor: 'white',
  },
  chatOnlineBadge: {
    width: 10,
    height: 10,
    borderRadius: 5, // Adjust to your needs
    position: 'absolute',
    backgroundColor: 'lightgreen',
    top: 2,
    right: 2,
  },
  chatOnlineName: {
    fontWeight: '500',
  },
};
