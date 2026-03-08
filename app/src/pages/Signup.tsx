import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "../styles/SignupStyles";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  User: undefined;
};

export default function Signup() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    const usersJson = await AsyncStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      Alert.alert("Email already registered.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));

    Alert.alert("Account created successfully!", "Please log in.");
    navigation.navigate("Login");
  };

  return (
    /* Backgrund */
    <ImageBackground
      source={require("../assets/Bg.png")}
      style={styles.backgroundImage}
    >
      {/* Main container */}
      <View style={styles.container}>
        <View style={styles.signupCard}>
          {/* Logo */}
          <Image source={require("../assets/Logo.png")} style={styles.logo} />

          {/* Title */}
          <Text style={styles.title}>Create Account</Text>

          {/* Input fields */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
