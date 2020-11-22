import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cast from './cast';
import Info from './info';
import Complete from './complete';

const Stack = createStackNavigator();

const CreateHomeChild = () => {
    
return(
    <Stack.Navigator>
        <Stack.Screen 
        name = "Cast" 
        component = {Cast}
        options ={{
            title:"Giỏ Hàng",
            headerStyle :{
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        }}
        />
        <Stack.Screen 
        name = "Info" 
        component = {Info}
        options ={{
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            title : "Information"
        }}
        />
        <Stack.Screen name = "Complete" component = {Complete}/>
    </Stack.Navigator>  
    )
}

export default CreateHomeChild;