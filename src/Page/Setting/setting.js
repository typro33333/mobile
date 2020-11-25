import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './profile';
import Product_placed from './product_placed';
import New_product from './new_product';
const Stack = createStackNavigator();

const CreateHomeChild = () => {
    
return(
    <Stack.Navigator>
      
        <Stack.Screen 
        name = "Profile" 
        component = {Profile}
        options ={{
            title:"Setting && Profile",
            headerStyle :{
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        }}
        />

        <Stack.Screen 
        name = "Product_is_placed" 
        component = {Product_placed}
        options ={{
            title : "Product_is_placed"
        }}
        />

        <Stack.Screen 
        name = "New Product" 
        component = {New_product}
        />
    </Stack.Navigator>  
    )
}

export default CreateHomeChild;