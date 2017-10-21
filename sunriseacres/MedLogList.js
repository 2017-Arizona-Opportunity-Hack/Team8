import React, { Component } from 'react';
import { Text, View } from 'react-native';

import MedLog from './MedLog';

class MedLogList extends Component {
  constructor() {
    super();
  }
  render () {
    return (
      <View>
        <MedLog />
        <MedLog />
        <MedLog />
        <MedLog />
        <MedLog />
      </View>
    )
  }
}

export default MedLogList;
