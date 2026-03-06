import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";

// define route params
type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
	Dashboard: undefined;
	User: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Dashboard" component={Dashboard} />
				<Stack.Screen name="User" component={User} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
