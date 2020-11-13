import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View,Text } from 'react-native';

const ListFood = () => {
    const navigation = useNavigation();
        
    return(
        <View style ={{flex:1,alignSelf:'center',justifyContent:'center'}}>
            <Text>
                Screen listfood
            </Text>
            <Button
            title = "Back to home"
            onPress = {()=> navigation.goBack()}
            />
        </View>
    )
}

export default ListFood;