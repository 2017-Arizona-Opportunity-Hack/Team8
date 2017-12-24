import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, View, Text, Image, Alert } from 'react-native';
import { Card, Button } from "react-native-elements";

class MedLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      done: this.props.data.done
    };
  }

  setStatus() {
    if (!this.props.data.toggle) return "ON LEAVE";
    if (this.state.done) return "DONE";
    else return "LOG";
  }

  processLog(id) {
    Alert.alert(
      "Confirm",
      "Are you sure you want to log the medication?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          this.setState({ done: true });
          this.props.updateListItems(id);
        }}
      ],
      { cancelable: false }
    );
  }

  render() {
    // console.log('in MedLog >>> state', this.state);
    // console.log('in MedLog >>> props', this.props);
    let { med_name,
      date,
      time,
      dosage,
      reason,
      toggle,
      schedule_id,
      special_instructions } = this.props.data;
    return (
      <ScrollView>
        <Card title={med_name}>
          <Text style={{ width: 300 }}>Date: {date}</Text>
          <Text style={{ width: 300 }}>Time: {time}</Text>
          <Text>Dosage: {dosage}</Text>
          <Text style={{ width: 300 }}>Reason: {reason}</Text>
          <Text style={{ marginBottom: 10 }}>
            {special_instructions}
          </Text>
          <Button
            icon={{ name: "check" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            disabled={!toggle}
            onPress={() => {
              let formdata = new FormData();
              formdata.append("schedule_id", schedule_id);
              fetch("https://stormy-gorge-54252.herokuapp.com/logMedicineGiven", {
                method: "POST",
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                body: formdata
              })
                .then(response => response.json())
                .then(response => this.processLog(response._id))
                .catch(error => {
                  console.error(error);
                });
            }}
            title={this.setStatus()}
          />
        </Card>
      </ScrollView>
    );
  }

}

export default MedLog;
