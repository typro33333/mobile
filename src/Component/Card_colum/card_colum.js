import * as React from 'react';
import {View,Image,TouchableOpacity,Text,StyleSheet} from 'react-native';
import {rating} from '../Star_rating/star';

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        width:"90%",
        alignSelf:'center',
        marginTop:10,
        backgroundColor:"#FFF",
        borderRadius:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7
    },
    cardImage:{
        height:115,
        width:115,
        justifyContent:'center',
        borderBottomLeftRadius:8,
        borderTopLeftRadius:8
    },
    cardtext:{
        flex:1,
        flexDirection:'collum',
        marginLeft:8
    },
    titleCard:{
        fontFamily:'Cochin',
        fontSize:20,
        fontWeight:'500',
        justifyContent:'center'
    }
})
export const card_colum = ({item,index}) => {
    return(
            <View style = {styles.container}>
              <Image 
              key = {index}
              source= {item.image}
              resizeMode ="cover"
              style = {styles.cardImage}
              />
              <View style = {styles.cardtext}>
                <TouchableOpacity 
                onPress = {() => navigation.navigate('Detail')}
                style = {{flexDirection:'row',width:"100%"}}
                >
                  <Text style = {styles.titleCard}>
                  {item.titleCard}
                  </Text>
                </TouchableOpacity>
                {rating(item.rating)}
                <Text style ={{marginTop:4}}>
                {item.content}
                </Text>
              </View>
            </View>
    )
  }