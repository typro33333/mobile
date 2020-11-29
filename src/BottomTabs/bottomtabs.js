import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildHome from '../Page/Home/childHome';
import ChildCast from '../Page/Cast/childCast';
import Setting from '../Page/Setting/setting';;
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabs = () =>  {
    return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <FontAwesome name="home" size={size} color={color} />
          } 
          else if (route.name === 'Cast') {
            return <Ionicons name="md-cart" size={size} color={color} />;
          } 
          else if(route.name === 'Setting'){
            return <Ionicons name="md-settings" size={size} color={color} />
          }
        },
      })}
    >
        <Tab.Screen 
        name="Home" 
        component={ChildHome}
        />
        <Tab.Screen 
        name="Cast" 
        component={ChildCast}
        options={{ tabBarBadge: 2 }}
        />
        <Tab.Screen name="Setting" component={Setting}/>
    </Tab.Navigator>
    );
}

export default BottomTabs;