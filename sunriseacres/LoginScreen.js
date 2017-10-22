import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class LoginScreen extends Component<{}> {
  handleSignIn() {
    console.log('handleLogin');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ paddingVertical: 50 }}>
        <Card
          containerStyle={{ borderRadius: 10 }}>
          <Image
            source={require('./images/logo.png')}
            style={{
              marginTop: 50,
              marginBottom: 50}}
          />
          <FormLabel>Email</FormLabel>
          <FormInput placeholder="Please enter your email address" />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Please enter your password" />

          <Button
            buttonStyle={{
              marginTop: 30,
              marginBottom: 50
            }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => {
              navigate("MainS");
            }}
          />
        </Card>
      </View>
    );
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
