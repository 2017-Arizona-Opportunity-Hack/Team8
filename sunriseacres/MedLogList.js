import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ActivityIndicator
} from "react-native";

import MedLog from "./MedLog";

class MedLogList extends Component {
  state = {
    loading: true
  };
  render() {
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
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <MedLog />
          <MedLog />
          <MedLog />
          <MedLog />
          <MedLog />
        </ScrollView>
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
