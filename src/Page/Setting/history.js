import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Product_place(){
    const navigation = useNavigation();
    React.useEffect(()=> {
        navigation.setOptions({
            headerLeft:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {navigation.goBack()}}>
                    <Text style={{color:"#267EF9",marginLeft:20,marginTop:8,fontSize:18}}>Back</Text>
                </TouchableOpacity>
            ),
        })
    },[navigation]);

    return(
        <View style = {styles.container}>
            <Text>
                this History transaction screen
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