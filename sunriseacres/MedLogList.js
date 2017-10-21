import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import MedLog from './MedLog';

class MedLogList extends Component {
  // constructor() {
  //   super();
  // }
  render () {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <MedLog />
        <MedLog />
        <MedLog />
        <MedLog />
        <MedLog />
      </ScrollView>
    )
  }
}

export default MedLogList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
