import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Home from "./app/screens/Home";
import { GlobalContextProvider } from "./app/components/Context/GlobalContext";

export default function App() {
  const [RCHost, setRcHost] = useState(null);
  const [FCHost, setFcHost] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <GlobalContextProvider>
        <Home />
      </GlobalContextProvider>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
