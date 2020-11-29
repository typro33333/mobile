import * as React from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Button, View,Text ,TouchableOpacity, StyleSheet,FlatList,ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import {rating}  from '../../../Component/Star_rating/star';
import axios from 'axios';
import {Image} from 'react-native-elements';
const ListFood = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const textInput = React.useRef(null);
    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.stylefood.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }
    let {title,stylefood} = route.params;
    const [data,setData] = React.useState([]);
    React.useEffect(()=> {
        navigation.setOptions({
            headerLeft:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> navigation.goBack()}>
                    <Ionicons   style={{marginLeft:14,marginTop:12,fontSize:24}} name="ios-arrow-back" color="black"/>
                    <Text style={{fontWeight:'600',marginLeft:20,marginTop:12,fontSize:18}}>List {title}</Text>
                </TouchableOpacity>
            ),
            title:''
        })
    },[navigation]);

    
    React.useEffect(()=> {
        async function getdata(){
            const url = 'http://tdtsv.ddns.net:8000/food/getFood'+stylefood;
            const res = await axios.get(url)
            const resjson = await res.data;
            setData(resjson)
        }
        getdata();
    },[stylefood])

    const CardItem = ({item,index}) => {
        return(
            <TouchableOpacity style ={styles.backgroud_card} onPress = {() => navigation.navigate('Detail',{item})} key ={index}>
                        <View style ={styles.container_card}>
                            <View style ={styles.container_image}>
                                <Image 
                                source = {{uri:item.ImageUrl}}
                                resizeMode = 'cover'
                                style ={styles.style_image}
                                PlaceholderContent ={<ActivityIndicator/>}
                                />
                            </View>
                            <View style ={{marginLeft:14,flexDirection:'column',width:"65%"}}>
                                <Text
                                numberOfLines ={1}
                                style ={{fontSize:15,fontWeight:'500'}}
                                >{item.Title}</Text>
                                <Text
                                numberOfLines = {1}
                                style = {{fontSize:12,fontWeight:'200',marginTop:10}}
                                >
                                {item.Content}
                                </Text>
                                <View style ={{marginTop:10,flexDirection:'row'}}>
                                    <MaterialIcons name="attach-money" size={19} color="#FDCC0D"/>
                                    <Text style ={{fontSize:13,fontWeight:'300'}}>{item.Price}</Text>
                                    <Text style ={{fontSize:11,fontWeight:'400',marginTop:3,marginLeft:4}}>Đồng</Text>
                                </View>
                                <View style = {{flexDirection:'row',marginTop:8,marginLeft:3}}>
                                    {rating(1)}
                                    <Text style ={{fontSize:11,fontWeight:'900',marginTop:1}}> {item.Rating} . 3.4 km</Text>
                                    <Text style ={{fontSize:11,marginTop:2,fontWeight:'200'}}> (something)</Text>
                                </View>
                                <View style ={{borderBottomColor:'black',borderBottomWidth:0.3,marginTop:10}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
        )
    }

    return(
        <View style ={styles.container}>
            <View style = {styles.containerSearch}>
                <TextInput
                style = {styles.txtInput_Search}
                placeholder = "Search food or something..."
                ref = {textInput}
                paddingLeft ={18}
                paddingRight={18}
                />
                <TouchableOpacity style={styles.icon_Seacrch} onPress = {()=> {textInput.current.focus()}}>
                    <Ionicons name="ios-search" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.container_Select}>
                <ScrollView
                horizontal={true}
                style={{flexDirection:'row'}}
                showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity>
                    <View style ={[styles.topPick_select,{marginLeft:12}]}>
                        <Entypo name="star" size={17} color="black" />
                        <Text style={{fontSize:13}}> Rating High </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style ={styles.topPick_select}>
                        <MaterialCommunityIcons name="coffee" size={18} color="black" />
                        <Text style={{fontSize:13}}> Coffee House </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style ={styles.topPick_select}>
                    <MaterialIcons name="location-on" size={18} color="black" />
                        <Text style={{fontSize:13}}> Nearest Location</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style ={styles.topPick_select}>
                        <MaterialCommunityIcons name="run-fast" size={18} color="black" />
                        <Text style={{fontSize:13}}> Fast Foods </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style ={styles.topPick_select}>
                        <MaterialCommunityIcons name="food" size={18} color="black" />
                        <Text style={{fontSize:13}}> Rating High </Text>
                    </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style = {{flex:1}}>
                <ScrollView style = {{flexDirection:'column'}}>
                    <FlatList 
                    data = {data}
                    renderItem = {CardItem}
                    keyExtractor={(i,k) => k.toString()}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#FFF'
    },
    containerSearch:{
        width:"95%",
        flexDirection:'row',
        marginTop:8,
        alignSelf:'center',
        backgroundColor:"#FFF",
        borderRadius:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.25,
        elevation: 5
    },
    txtInput_Search:{
        width:"85%",
        height:45
    },
    icon_Seacrch:{
        marginLeft:24,
        marginTop:10
    },
    container_Select:{
        marginTop:10,
        height:38
    },
    topPick_select:{
        marginLeft:8,
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:"#FFF",
        borderRadius:50,
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7
    },
    backgroud_card:{
        backgroundColor:"#FFF"
    },
    container_card:{
        height:100,
        flexDirection:'row',
        margin:10
    },
    container_image:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2.75,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 2
    },
    style_image:{
        height:100,
        width:120,
        borderRadius:6
    },
})

export default ListFood;