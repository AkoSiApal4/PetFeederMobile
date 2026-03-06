import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Switch,
  ImageBackground,
} from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

// declare a root stack param list to get proper typing for navigation
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  User: undefined;
};
// the package below may need to be installed along with its types
// npm install @react-native-async-storage/async-storage
// and if TypeScript still complains, add the types with:
// npm install --save-dev @types/react-native-async-storage__async-storage
// or suppress with a ts-ignore
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";

// note: you may need to install the storage package:
// npm install @react-native-async-storage/async-storage

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // suppress navigation typing, or provide your own route param list
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    // Admin login
    if (username === "admin" && password === "1234") {
      await AsyncStorage.setItem("currentUser", "admin");
      await AsyncStorage.setItem("role", "admin");
      navigation.navigate("Dashboard");
      return;
    }

    const usersJson = await AsyncStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    const validUser = users.find(
      (user: any) =>
        user.email.trim() === username.trim() &&
        user.password === password
    );

    if (validUser) {
      await AsyncStorage.setItem("currentUser", validUser.email);
      await AsyncStorage.setItem("role", "user");
      navigation.navigate("User");
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.loginCard}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.title}>Log in to your Account</Text>

        <View style={styles.usernameWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggle}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.rememberRow}>
            <Switch value={remember} onValueChange={setRemember} />
            <Text style={styles.rememberText}>Remember</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}> 
          <Text style={styles.create}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// styles were accidentally removed earlier; re-add them here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  loginCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "white",
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 60,
    elevation: 10,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 35,
    borderRadius: 10,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    marginBottom: 25,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  usernameWrapper: {
    width: "100%",
    marginBottom: 16,
  },
  passwordWrapper: {
    width: "100%",
    marginBottom: 16,
    position: "relative",
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#2aa8a1",
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    backgroundColor: "#ffffff",
  },
  toggleContainer: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  toggle: {
    fontSize: 13,
    color: "#2aa8a1",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberText: {
    marginLeft: 8,
  },
  forgot: {
    color: "#2aa8a1",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#2aa8a1",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  create: {
    textAlign: "center",
    marginTop: 28,
    fontSize: 14,
    color: "#666",
  },
});


