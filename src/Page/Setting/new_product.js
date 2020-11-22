import React,{useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {getAllFood} from '../../Serviece/serviece';

const axios = require('axios');
export default function Profile(){
    const [data, setData] = React.useState('abc');

    useEffect(() => {
        async function getdata(){
            const url = 'http://25.71.124.112:8000/food/getAllFood';
            const res = await fetch(url);
            const resjson = await res.json();
            console.log(resjson)
        }
        getdata();
    });

    return(
        <View style = {styles.container}>
            <Text>
                this profile screen 
                {data}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignSelf:'center'
    }
})