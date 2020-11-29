import { Entypo } from '@expo/vector-icons'; 
import * as React from 'react';
import {View} from 'react-native';
export const rating = (number) => {
    let arr = []
    for(let i = 0;i<number;i++){
      arr.push(<Entypo name="star" size={14} color="#FDCC0D" key={i}/>)
    }
    return (
      <View style ={{flexDirection:'row'}}>
        {arr}
      </View>
    )
}