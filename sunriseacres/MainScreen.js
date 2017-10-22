import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Picker,
  Alert,
  ActivityIndicator
} from "react-native";
import { Button, Header, Icon, Card } from "react-native-elements";

export default class MainScreen extends Component<{}> {
  componentDidMount() {
    let formdata = new FormData();

    formdata.append("username", this.props.navigation.state.params.username);
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
        console.log(error);
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
        console.log("response", response);
        this.setState({
          child: response,
          loading: false,
          showChild: true,
          child_id: response[0].child_id,
          child_name: response[0].first_name,
          child_toggle: response[0].toggle_inhouse
        });
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
    child_name: "",
    showChild: false,
    showOptions: false,
    option1: false,
    option2: false,
    loading: true,
    child_toggle: null
  };
  updateHouse = house => {
    this.setState({ house_id, loading: false });
  };
  updateChild = child => {
    this.setState({ child, loading: false });
    console.log("child", child);
  };

  showMore() {
    if (!this.state.showChild) {
      this.fetchChildren();
    } else this.setState({ showOptions: true });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("state", this.state);

    return (
      <View style={{ paddingVertical: 10 }}>
        <Card containerStyle={{ borderRadius: 10 }}>
          <Image
            source={require("./images/logo.png")}
            style={{
              marginTop: 30,
              marginBottom: 30
            }}
          />

          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "#726F6F",
              marginTop: 10
            }}
          >
            Select a House
          </Text>
          {this.state.house && (
            <View style={styles.container}>
              <Picker
                selectedValue={this.state.house_id}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    house_id: itemValue,
                    showChild: false,
                    showOptions: false
                  })}
                style={{ width: 300, height: 50 }}
                itemStyle={{ height: 50 }}
              >
                {this.state.house.map((l, i) => {
                  return (
                    <Picker.Item value={l.house_id} label={l.name} key={i} />
                  );
                })}
              </Picker>
            </View>
          )}
          {this.state.showChild && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#726F6F",
                marginTop: 10
              }}
            >
              Select a Child
            </Text>
          )}
          {this.state.showChild &&
            this.state.child && (
              <Picker
                selectedValue={this.state.child_id}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    child_id: itemValue,
                    child_toggle: this.state.child[itemIndex].toggle_inhouse,
                    child_name: this.state.child[itemIndex].first_name
                  })}
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
                marginLeft: 20
              }}
              onPress={() =>
                navigate("List", {
                  child_id: this.state.child_id,
                  child_name: this.state.child_name
                })}
              title="Log Medicine"
            />
          )}
          {this.state.showOptions && (
            <Button
              icon={{ name: "block" }}
              backgroundColor="#F54D29"
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
        </Card>
      </View>
    );
  }
  showAlert() {
    var status = "At Foster Care";
    if (!this.state.child_toggle) status = "Home Visit";
    Alert.alert(
      "Confirm",
      "Are you sure you want to change the home visit status? Current status is - " +
        status,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.changeToggle() }
      ],
      { cancelable: false }
    );
  }
  changeToggle() {
    let formdata = new FormData();
    formdata.append("child_id", this.state.child_id);
    fetch("https://sunshine-acres.herokuapp.com/togglechild", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(response => this.fetchChildren())
      .catch(error => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#ffffff"
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
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#9809F7"
  },
  heading: {
    color: "white",
    marginTop: 10,
    fontSize: 22
  }
});
