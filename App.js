import { StyleSheet } from "react-native";
import { AppRegistry } from 'react-native';
import Main from "./src/Main";

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Main);

export default function App() {
  return <Main />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

