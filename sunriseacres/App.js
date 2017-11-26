/**
 * Sunshine Acres
 * Medication Log
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import MainScreen from "./MainScreen";
import MedLogList from "./MedLogList";
import LoginScreen from "./LoginScreen";
import { StackNavigator } from "react-navigation";

class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>
        <MedLogList />
        <Button
          onPress={() => navigate("Login")}
          title="link for creating login screen"
        />
        <Button
          onPress={() => navigate("MainS")}
          title="link for creating Welcome Screen"
        />
      </View>
    );
  }
}

const Stack = StackNavigator({
  Login: { screen: LoginScreen },
  MainS: { screen: MainScreen },
  List: { screen: MedLogList }
});

const instructions = "Sunshine Acres";

export default class App extends Component<{}> {
  render() {
    return <Stack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
