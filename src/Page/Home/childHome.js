import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Food from './food';
import Detail from './detail';
import Order from './order';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();

const CreateHomeChild = () => {
    
return(
    <Stack.Navigator
    screenOptions={{
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitleStyle:{
            fontWeight:'bold'
        }
    }}
    >
        <Stack.Screen 
        name = "Food" 
        component = {Food}
        options ={{
            title:'Over View',
            headerLeft: () => (
                <View style ={{marginLeft:10}}>
                    <Icon.Button 
                    name="ios-menu"
                    size = {25}
                    color="#333"
                    backgroundColor="#fff"
                    onPress={()=>{}}
                    />
                </View>
            ),
            headerRight: () => (
                <View style ={{marginLeft:10}}>
                    <Icon.Button 
                    name="ios-search"
                    size = {25}
                    color="#333"
                    backgroundColor="#fff"
                    onPress={()=>{}}
                    />
                </View>
            )
        }}
        />
        <Stack.Screen name = "Detail" component = {Detail}/>
        <Stack.Screen name = "Order" component = {Order} /> 
    </Stack.Navigator>
    )
}

export default CreateHomeChild;
