import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildHome from '../Page/Home/childHome';
import ChildCast from '../Page/Cast/childCast';
import Setting from '../Page/Setting/setting';

const Tab = createBottomTabNavigator();

const BottomTabs = () =>  {
    return (
    <Tab.Navigator>
        <Tab.Screen name="Home" children={ChildHome}/>
        <Tab.Screen name="Cast" component={ChildCast}/>
        <Tab.Screen name="Setting" component={Setting}/>
    </Tab.Navigator>
    );
}

export default BottomTabs;