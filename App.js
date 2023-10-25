import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// import Messenger from "./pages/messenger/Messenger";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login/Login";
import { AuthContext, AuthContextProvider } from "./src/context/AuthContext";
import Register from "./src/pages/register/Register";
import Messenger from "./src/pages/messager/Messenger";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import Register from "./pages/register/Register";

const Stack = createNativeStackNavigator()

function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthContextProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="messager" component={Messenger} />
      <Stack.Screen name="home" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
    </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;

