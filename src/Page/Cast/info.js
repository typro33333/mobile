import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Info = () =>  {
  const route = useRoute();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Info Screen</Text>
      </View>
    );
}

export default Info;