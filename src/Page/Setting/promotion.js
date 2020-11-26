import * as React from 'react';
import {View,Text,StyleSheet} from 'react-native';


export default function Product_place(){



    return(
        <View style = {styles.container}>
            <Text>
                this Promotion% screen
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignSelf:'center',
        justifyContent:'center'
    }
})