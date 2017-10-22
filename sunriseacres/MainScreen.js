import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Picker, Alert } from "react-native";
import { Button } from "react-native-elements";
var op1 = false;
var op2 = false;
export default class MainScreen extends Component<{}> {
  state = {
    house: "",
    child: "",
    showChild: false,
    showOptions: false,
    option1: false,
    option2: false
  };
  updateHouse = house => {
    this.setState({ house });
  };
  updateChild = child => {
    this.setState({ child });
  };

  showMore() {
    if (!this.state.showChild) this.setState({ showChild: true });
    else this.setState({ showOptions: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Select a House</Text>
        <Picker
          selectedValue={this.state.house}
          onValueChange={this.updateHouse}
          style={{ width: 200, height: 44 }}
          itemStyle={{ height: 44 }}
        >
          <Picker.Item label="Steve" value="steve" />
          <Picker.Item label="Ellen" value="ellen" />
          <Picker.Item label="Maria" value="maria" />
        </Picker>
        {this.state.showChild && (
          <Text style={{ margin: 20 }}>Select a Child</Text>
        )}
        {this.state.showChild && (
          <Picker
            selectedValue={this.state.child}
            onValueChange={this.updateChild}
            style={{ width: 200, height: 44, margin: 10 }}
            itemStyle={{ height: 44 }}
          >
            <Picker.Item label="Steve2" value="steve" />
            <Picker.Item label="Ellen1" value="ellen" />
            <Picker.Item label="Maria1" value="maria" />
          </Picker>
        )}
        {this.state.showOptions && (
          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="Log Medicine"
          />
        )}
        {this.state.showOptions && (
          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            onPress={() => this.showAlert()}
            title="Record Home Visit"
          />
        )}

        {!this.state.showOptions && (
          <Button onPress={() => this.showMore()} title="Next" />
        )}
      </View>
    );
  }
  showAlert() {
    Alert.alert(
      "Confirm",
      "Are you sure you want to change the home visit status? Current status is - " +
        "blah",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
