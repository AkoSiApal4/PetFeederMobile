import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  signupCard: {
    width: width > 600 ? 400 : "100%", // responsive card width
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputWrapper: {
    width: "100%",
    marginBottom: 15,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },

  button: {
    width: "100%",
    backgroundColor: "#2aa8a1",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  link: {
    marginTop: 15,
    color: "#2aa8a1",
  },
});
