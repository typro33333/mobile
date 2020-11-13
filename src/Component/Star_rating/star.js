import { Entypo } from '@expo/vector-icons'; 
import * as React from 'react';
import { Entypo } from '@expo/vector-icons'; 
export const Rating = (number) => {
    let star = []
    var starDefault = 5
    var starUnavaible = starDefault - number;
    for(let i = 0; i < number;i++){
        let name = "star"
        star.push(<Entypo name={name} size = {15} color="#FDCC0D" key={i}/>)
    }
    for(let j = 0; i < starUnavaible;j++){
        let name = "star"
        star.push(<Entypo name={name} size = {15} color="#FDCC0D" key={j}/>)
    }
    return(
        <View style={{flex:1,flexDirection:'row'}}>
            {star}
        </View>
    )
}