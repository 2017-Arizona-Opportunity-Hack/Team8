/**
 * Sunshine Acres
 * Medication Log
 */

import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";

import MainScreen from "./MainScreen";
import MedLogList from "./MedLogList";
import LoginScreen from "./LoginScreen";

const instructions = "Sunshine Acres";

const Stack = StackNavigator({
  Login: { screen: LoginScreen },
  MainS: { screen: MainScreen },
  List: { screen: MedLogList }
});

export default class App extends Component<{}> {
  render() {
    return <Stack />;
  }
}
