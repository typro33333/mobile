import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Food from './Food/food';
import ListFood from './Food/listfood';
import Detail from './detail';
import Order from './order';
import {Text, View,Image} from 'react-native';
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
            title:<View style ={{flexDirection:'row'}}>
                <Image 
                source ={require('../../../assets/home.png')}
                style ={{height:19,width:19,marginTop:2}}
                resizeMode="cover"
                />
                <Text style ={{fontSize:18,fontWeight:'700',marginLeft:6,color:'#5C5B5A'}}>Home</Text>
            </View>,
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
