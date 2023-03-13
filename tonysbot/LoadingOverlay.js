import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

function LoadingOverlay() {
  return (
    <View style={styles.loadContainer}>
      <ActivityIndicator size={20} color="grey"></ActivityIndicator>
      <Text>LOADING...</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
});