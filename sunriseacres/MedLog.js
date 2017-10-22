import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, Button } from "react-native-elements";

class MedLog extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    done: this.props.done
  };

  setStatus() {
    if (!this.props.toggle) return "ON LEAVE";
    if (this.state.done) return "DONE";
    else return "LOG";
  }
  render() {
    return (
      <View>
        <Card title={this.props.med_name}>
          <Text style={{ width: 300 }}>Date: {this.props.time}</Text>
          <Text>Dosage: {this.props.dosage}</Text>
          <Text style={{ marginBottom: 10 }}>
            {this.props.special_instructions}
          </Text>
          <Button
            icon={{ name: "code" }}
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
              fetch("https://sunshine-acres.herokuapp.com/logMedicineGiven", {
                method: "POST",
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                body: formdata
              })
                .then(response => this.setState({ done: true }))
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
