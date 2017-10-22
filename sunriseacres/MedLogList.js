import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ListView,
  Text,
  View,
  ActivityIndicator
} from "react-native";

import MedLog from "./MedLog";

class MedLogList extends Component {
  state = {
    loading: true,
    child_id: null,
    dataSource: null,
    med_details: []
  };
  componentDidMount() {
    this.setState({ child_id: this.props.navigation.state.params.child_id });

    let formdata = new FormData();

    formdata.append("child_id", this.props.navigation.state.params.child_id);
    fetch("https://sunshine-acres.herokuapp.com/getMedicationDetails", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then(response => response.json())
      .then(response => {
        this.generateListItems(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  generateListItems(arr) {
    meds = [];
    for (i = 0; i < arr.length; i++) {
      med = {
        med_name: arr[i].med_name,
        special_instructions: arr[i].special_instructions,
        dosage: arr[i].Dosage,
        schedule_id: arr[i]._id.$oid,
        done: arr[i].done,
        toggle: arr[i].toggle_inhouse,
        time: new Date(arr[i].AdministrationTime.$date).toString()
      };
      meds.push(med);
    }
    this.setState({ med_details: meds, loading: false });
  }
  render() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          color="#03A9F4"
          size="large"
          style={{ marginTop: 40 }}
        />
      );
    } else {
      console.log(this.state.med_details);
      return (
        <ListView
          style={styles.contentContainer}
          dataSource={ds.cloneWithRows(this.state.med_details)}
          renderRow={data => <MedLog {...data} />}
        />
      );
    }
  }
}

export default MedLogList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
