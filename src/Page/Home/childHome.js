import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Food from './Food/food';
import ListFood from './Food/listfood';
import Detail from './detail';
import Order from './order';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodSearch from './Food/searchfood';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const CreateHomeChild = () => {
    const navigation = useNavigation();
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
            headerRight: () => (
                <View style ={{marginLeft:10}}>
                    <Icon.Button 
                    name="ios-search"
                    size = {25}
                    color="#333"
                    backgroundColor="#fff"
                    />
                </View>
            ),
            animationEnabled:true
        }}
        />
        <Stack.Screen 
        name = "SearchFood" 
        component = {FoodSearch} 
        options = {{
            animationEnabled:false,
        }}
        />
        <Stack.Screen name = "ListFood" component = {ListFood}/>
        <Stack.Screen
        name = "Detail" 
        component = {Detail}
        options ={({}) => ({
            headerBackTitleVisible:false,
            headerTitle:false,
            headerTransparent:true,
            headerTintColor:"#FFF"
        })}
        />
        <Stack.Screen name = "Order" component = {Order} /> 
    </Stack.Navigator>
    )
}

export default CreateHomeChild;
