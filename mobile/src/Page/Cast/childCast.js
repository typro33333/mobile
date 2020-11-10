import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cast from './cast';
import Info from './info';
import Complete from './complete';

const Stack = createStackNavigator();

const CreateHomeChild = () => {
    
return(
    <Stack.Navigator>
        <Stack.Screen name = "Cast" component = {Cast}/>
        <Stack.Screen name = "Info" component = {Info}/>
        <Stack.Screen name = "Complete" component = {Complete}/>
    </Stack.Navigator>  
    )
}

export default CreateHomeChild;