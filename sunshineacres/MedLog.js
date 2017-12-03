import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import { Card, Button } from "react-native-elements";

class MedLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      done: this.props.done
    };
  }

  setStatus() {
    if (!this.props.toggle) return "ON LEAVE";
    if (this.state.done) return "DONE";
    else return "LOG";
  }

  render() {
    console.log('in MedLog >>> props', this.props);
    let { med_name,
      date,
      time,
      dosage,
      reason,
      special_instructions } = this.props.data;
    return (
      <View>
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
            disabled={!this.props.toggle}
            onPress={() => {
              let formdata = new FormData();
              formdata.append("schedule_id", this.props.schedule_id);
              console.log('in MedLog >>> formdata', formdata);
              fetch("https://stormy-gorge-54252.herokuapp.com/logMedicineGiven", {
                method: "POST",
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                body: formdata
              })
                .then(response => {
                  this.setState({ done: true })
              })
                .catch(error => {
                  console.error(error);
                });
            }}
            title={this.setStatus()}
          />
        </Card>
      </View>
    );
  }

}

export default MedLog;
