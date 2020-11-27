import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './profile';
import Product_placed from './product_placed';
import New_product from './new_product';
import ManagePost from './managepost';
import Promotion from './promotion';
const Stack = createStackNavigator();

const CreateHomeChild = () => {
    
return(
    <Stack.Navigator>
      
        <Stack.Screen 
        name = "Profile" 
        component = {Profile}
        options ={{
            title:"Profile",
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
            title : "Orders"
        }}
        />

        <Stack.Screen 
        name = "New Product" 
        component = {New_product}
        />

        <Stack.Screen 
        name = "Managepost" 
        component = {ManagePost}
        />

        <Stack.Screen 
        name = "Promotion" 
        component = {Promotion}
        />
    </Stack.Navigator>  
    )
}

export default CreateHomeChild;