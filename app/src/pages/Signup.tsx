import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
	Dashboard: undefined;
	User: undefined;
};

export default function Signup() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Signup placeholder screen</Text>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}> 
				<Text style={styles.link}>Back to Login</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	text: { fontSize: 18, marginBottom: 20 },
	link: { color: "#2aa8a1" },
});
