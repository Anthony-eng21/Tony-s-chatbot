import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ChatGPT from "./src/index";

export default function App() {
  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ChatGPT />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
