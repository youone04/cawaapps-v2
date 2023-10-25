
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { View, TextInput, TouchableOpacity, ScrollView,Text } from "react-native";
import Message from "../../components/Message";
import Conversation from "../../components/Conversation";
import ChatOnline from "../../components/ChatOnline";
const PF = 'http://192.168.1.5:8800/api'; // Replace with your API URL

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      socket.current = io('http://192.168.1.5:8900');
      socket.current.on('getMessage', (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);
  
    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
  
    useEffect(() => {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(
          user.followings.filter((f) => users.some((u) => u.userId === f))
        );
      });

      // setOnlineUsers(
      //   user.followings.filter((f) => '652b517e5eeda54b9c393bb0' === f))
    }, [user]);
  
    useEffect(() => {
      const getConversations = async () => {
        try {
          const res = await axios.get(`${PF}/conversations/` + user._id);
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }, [user._id]);
  
    useEffect(() => {
      const getMessages = async () => {
        try {
          const res = await axios.get(`${PF}/messages/` + currentChat?._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, [currentChat]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
  
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
  
      try {
        const res = await axios.post(`${PF}/messages`, message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    return (
      <>
        <View style={styles.messenger}>
          <View style={styles.chatMenu}>
            <View style={styles.chatMenuWrapper}>
              <TextInput
                style={styles.chatMenuInput}
                placeholder="Search for friends"
              />
              {conversations.map((c) => (
                
                <TouchableOpacity key={c._id} 
                >
                  <Conversation setCurrentChat={setCurrentChat} conversation={c} currentUser={user} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.chatBox}>
            <View style={styles.chatBoxWrapper}>
              
              {currentChat ? (
                <>
                  <ScrollView style={styles.chatBoxTop}>
                    {messages.map((m) => (
                      <View key={m._id} ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                      </View>
                    ))}
                  </ScrollView>
                  <View style={styles.chatBoxBottom}>
                    <TextInput
                      style={styles.chatMessageInput}
                      placeholder="write something..."
                      onChangeText={(text) => setNewMessage(text)}
                      value={newMessage}
                    />
                    <TouchableOpacity
                      style={styles.chatSubmitButton}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.chatSubmitButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={styles.noConversationText}>
                  Open a conversation to start a chat.
                </Text>
              )}
            </View>
          </View>
          <View style={styles.chatOnline}>
            <View style={styles.chatOnlineWrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
            </View>
          </View>
        </View>
      </>
    );
  }
  
  const styles = {
    messenger: {
      flex: 1,
    },
    chatMenu: {
      flex: 3.5,
    },
    chatMenuInput: {
      width: '90%',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    chatBox: {
      flex: 5.5,
    },
    chatBoxWrapper: {
      flex: 1,
      flexDirection: 'column',
    },
    chatBoxTop: {
      flex: 1,
      overflow: 'scroll',
      paddingRight: 10,
    },
    chatBoxBottom: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    chatMessageInput: {
      width: '80%',
      height: 90,
      padding: 10,
    },
    chatSubmitButton: {
      width: 70,
      height: 40,
      borderRadius: 5,
      backgroundColor: 'teal',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatSubmitButtonText: {
      color: 'white',
    },
    chatOnline: {
      flex: 3,
    },
    chatMenuWrapper: {
      padding: 10,
      flex: 1,
    },
    chatBoxWrapper: {
      padding: 10,
      flex: 1,
    },
    chatOnlineWrapper: {
      padding: 10,
      flex: 1,
    },
    noConversationText: {
      position: 'absolute',
      top: '10%',
      fontSize: 50,
      color: 'rgb(224, 220, 220)',
    },
  };
  