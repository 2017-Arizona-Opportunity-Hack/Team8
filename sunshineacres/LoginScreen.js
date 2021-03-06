import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      keyboard: { height: 0 }
    }
  }

  updateState = (state, obj) => this.setState(prev => Object.assign(prev[state], obj))

  handleSignIn(navigate) {
    let formdata = new FormData();
    formdata.append("email", this.state.username);
    formdata.append("password", this.state.password);
    fetch("https://stormy-gorge-54252.herokuapp.com/parentLogin", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(response => response.json())
      .then(response => {
        if (response.errorMessage === '')
          navigate("MainS", { username: response.parent._id });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Card containerStyle={{ borderRadius: 10 }}>
          <Image
            source={require("./images/logo.png")}
            style={{
              marginTop: 30,
              marginBottom: 30
            }}
          />
          <View style={{position: 'relative', bottom: this.state.keyboard.height}}>
          <FormLabel>Username</FormLabel>
          <FormInput
            placeholder="Please enter your username"
            onChangeText={username => this.setState({ username })}
            onFocus={() => this.updateState('keyboard', {height: 60})}
            onBlur={() => this.updateState('keyboard', {height: 0})}
            autoCapitalize="none"
            value={this.state.email}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Please enter your password"
            onChangeText={password => this.setState({ password })}
            onFocus={() => this.updateState('keyboard', {height: 80})}
            onBlur={() => this.updateState('keyboard', {height: 0})}
            value={this.state.password}
          />
          </View>
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
      </ScrollView>
    );
  }

}

export default LoginScreen;
