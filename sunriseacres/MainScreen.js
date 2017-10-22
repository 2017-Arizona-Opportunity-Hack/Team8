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
  componentDidMount() {
    let formdata = new FormData();

    formdata.append("username", "a-nadig");
    fetch("https://sunshine-acres.herokuapp.com/getallhouses", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          house: response,
          loading: false,
          house_id: response[0].house_id
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  fetchChildren() {
    let formdata = new FormData();
    formdata.append("house_id", this.state.house_id);
    fetch("https://sunshine-acres.herokuapp.com/getchildren", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ child: response, loading: false, showChild: true });
      })
      .catch(error => {
        console.error(error);
      });
  }
  state = {
    house: [],
    child: [],
    house_id: 0,
    child_id: 0,
    showChild: false,
    showOptions: false,
    option1: false,
    option2: false,
    loading: true
  };
  updateHouse = house => {
    this.setState({ house_id, loading: false });
  };
  updateChild = child => {
    this.setState({ child, loading: false });
  };

  showMore() {
    if (!this.state.showChild) {
      this.fetchChildren();
    } else this.setState({ showOptions: true });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{ margin: 10, fontSize: 25 }}>Select a House</Text>
        {this.state.house && (
          <Picker
            selectedValue={this.state.house_id}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ house_id: itemValue, showChild: false })}
            style={{ width: 300, height: 50 }}
            itemStyle={{ height: 50 }}
          >
            {this.state.house.map((l, i) => {
              return <Picker.Item value={l.house_id} label={l.name} key={i} />;
            })}
          </Picker>
        )}
        {this.state.showChild && (
          <Text style={{ margin: 10, fontSize: 25 }}>Select a Child</Text>
        )}
        {this.state.showChild &&
          this.state.child && (
            <Picker
              selectedValue={this.state.child_id}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ child_id: itemValue })}
              style={{ width: 300, height: 50 }}
              itemStyle={{ height: 50 }}
            >
              {this.state.child.map((l, i) => {
                return (
                  <Picker.Item
                    value={l.child_id}
                    label={l.first_name}
                    key={i}
                  />
                );
              })}
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
