import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class LoginScreen extends Component<{}> {
  state = {
    username: "",
    password: ""
  };

  handleSignIn(navigate) {
    let formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("password", this.state.password);

    fetch("https://sunshine-acres.herokuapp.com/parentlogin", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(response => {
        console.log(response._bodyText);
        if (response._bodyText === "true")
          navigate("MainS", { username: this.state.username });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ paddingVertical: 50 }}>
        <Card containerStyle={{ borderRadius: 10 }}>
          <Image
            source={require("./images/logo.png")}
            style={{
              marginTop: 50,
              marginBottom: 50
            }}
          />
          <FormLabel>Username</FormLabel>
          <FormInput
            placeholder="Please enter your username"
            onChangeText={username => this.setState({ username })}
            autoCapitalize="none"
            value={this.state.email}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Please enter your password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <Button
            buttonStyle={{
              marginTop: 30,
              marginBottom: 50
            }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => this.handleSignIn(navigate)}
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
