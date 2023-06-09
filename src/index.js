import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import LoadingOverlay from "../LoadingOverlay";
import APIKey from "../key";
//DO NOT USE PRETTIER CONFIG ON THIS FILE

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const apiKey = APIKey; //replace this value with your key.
  const apiUrlEndpoint =
    "https://api.openai.com/v1/engines/text-davinci-002/completions"; //endpoint
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //makes api call => updates app state
  const handleSend = async () => {
    const prompt = textInput;
    setIsLoading(true);
    try {
      const response = await axios.post(
        apiUrlEndpoint,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const text = response.data.choices[0].text; //data extraction
      //spread all the current data then add two new objects
      //with type user then text with the text field of the current textInput state
      //and on of type bot with the extracted data form the api response
      setData([
        ...data,
        { type: "user", text: textInput }, //you
        { type: "bot", text: text }, //bot
      ]);
      setIsLoading(false);
      setTextInput(""); //clears input string for next input
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key === "Enter" || window.pressed) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hailey's Chatbot</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} //react convention for indexing our items
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "column", padding: 15 }}>
            <View
              style={{
                width: "90%",
                backgroundColor: "black",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  color: item.type === "user" ? "lightblue" : "goldenrod",
                }}
              >
                {item.type === "user" ? "User" : "OpenAI"}
              </Text>
            </View>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          multiline={true}
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder={"ask anything powered by OpenAI"}
          placeholderTextColor="#fff"
          onSubmitEditing={handleSend}
          keyboardType="default"
          onKeyPress={handleKeyDown}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatGPT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    marginHorizontal: 17,
    marginVertical: 42,
    borderRadius: "45%",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 70,
    marginBottom: 20,
  },
  body: {
    backgroundColor: "#fff",
    width: "90%",
    margin: 30,
    marginHorizontal: 30,
    borderBottomRightRadius: "38%",
    borderBottomLeftRadius: "38%",
    borderTopRightRadius: "38%",
    borderTopLeftRadius: "38%",
    overflow: "hidden",
  },
  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    width: "90%",
    height: 90,
    marginBottom: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
    padding: 15,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "white",
    width: "70%",
    height: 60,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#fff",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
