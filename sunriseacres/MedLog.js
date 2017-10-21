import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const MedLog = (props) => {
  return (
    <View>
      <Card
        title='ASPIRIN'>
        <Text style={{width: 300}}>
          Date: 10/21/2017 at 9:00 am
        </Text>
        <Text>
          Dosage: 1 tablet
        </Text>
        <Text style={{marginBottom: 10}}>
          Take with 8 oz of water
        </Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='LOG NOW' />
      </Card>
    </View>
  )
}

export default MedLog;
