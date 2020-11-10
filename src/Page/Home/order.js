import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Order = () =>  {
  const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Order Screen</Text>
        <Button 
        title = "Go to Top"
        onPress = {() => navigation.popToTop()}
        />
      </View>
    );
}

export default Order;