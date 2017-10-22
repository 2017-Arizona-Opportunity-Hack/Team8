import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  Alert,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";

export default class MainScreen extends Component<{}> {
  state = {
    house: "",
    child: "",
    showChild: false,
    showOptions: false,
    option1: false,
    option2: false,
    loading: true
  };
  updateHouse = house => {
    this.setState({ house, loading: false });
  };
  updateChild = child => {
    this.setState({ child, loading: false });
  };

  showMore() {
    if (!this.state.showChild) this.setState({ showChild: true });
    else this.setState({ showOptions: true });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{ margin: 10, fontSize: 25 }}>Select a House</Text>
        <Picker
          selectedValue={this.state.house}
          onValueChange={this.updateHouse}
          style={{ width: 300, height: 50 }}
          itemStyle={{ height: 50 }}
        >
          <Picker.Item label="Steve" value="steve" />
          <Picker.Item label="Ellen" value="ellen" />
          <Picker.Item label="Maria" value="maria" />
        </Picker>
        {this.state.showChild && (
          <Text style={{ margin: 10, fontSize: 25 }}>Select a Child</Text>
        )}
        {this.state.showChild && (
          <Picker
            selectedValue={this.state.child}
            onValueChange={this.updateChild}
            style={{ width: 300, height: 50 }}
            itemStyle={{ height: 50 }}
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
              marginTop: 20,
              marginRight: 20,
              marginLeft: 20,
              fontSize: 30
            }}
            onPress={() => navigate("List")}
            title="Log Medicine"
          />
        )}
        {this.state.showOptions && (
          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              margin: 20
            }}
            onPress={() => this.showAlert()}
            title="Record Home Visit"
          />
        )}

        {!this.state.showOptions &&
          !this.state.loading && (
            <Button
              buttonStyle={{ marginTop: 30 }}
              onPress={() => this.showMore()}
              title="Next"
            />
          )}
        <ActivityIndicator
          animating={this.state.loading}
          color="#03A9F4"
          size="large"
          style={{ marginTop: 40 }}
        />
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
    alignItems: "center",
    backgroundColor: "#ffffff"
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
