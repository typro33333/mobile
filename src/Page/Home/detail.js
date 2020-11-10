import React from 'react';
import { View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Detail = () =>  {
  const navigation = useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Detail Screen</Text>
        <Button 
        title = "Go to Order"
        onPress = {() => navigation.navigate('Order')}
        />
      </View>
    );
}

export default Detail;