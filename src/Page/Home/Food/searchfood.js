import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import {rating} from '../../../Component/Star_rating/star';
import axios from 'axios';
import {Image} from 'react-native-elements';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [value,setValue] = React.useState('');
    const [data,setData] = React.useState()
    const [currentData,setCurrentData] = React.useState(data)
    const [search,setSearch] = React.useState(false);
    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.Title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    React.useEffect(()=>{
        async function getdata(){
            const url = 'http://tdtsv.ddns.net:8000/food/getAllFood';
            const res = await axios.get(url)
            const resjson = await res.data;
            setData(resjson);
            setCurrentData(resjson);
        }
        getdata();
    },[])
    React.useEffect(()=>{
        LogBox.ignoreAllLogs(); 
        navigation.setOptions({
            title:'',
            headerLeft: () => (
                    <View style ={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity onPress = {()=> navigation.goBack()}>
                            <Text
                            style ={{color:'#6200EE',marginLeft:14,marginTop:12}}
                            >Cancel</Text>
                        </TouchableOpacity>
                        <TextInput
                        placeholder = "Search Food..."
                        autoFocus ={true} 
                        paddingLeft={14}
                        paddingRight ={14}
                        defaultValue={value}
                        style = {{borderWidth:0.2,borderRadius:4,height:30,marginLeft:10,marginTop:7,width:290}}
                        onChangeText = {(text) => {
                            if(text !== ''){
                                setValue(text);
                                setCurrentData(filterItems(data,text));
                                setSearch(true);
                                return setTimeout(()=>{
                                    setSearch(false);
                                },1000)
                            }else{
                                setValue(text);
                                setCurrentData(filterItems(data,text));
                                return setSearch(false);
                            }
                        }}
                        />
                    </View>
            ),
            headerRight: () => (
                <Icon
                name="ios-search"
                size = {25}
                color="#333"
                backgroundColor="#fff"
                onPress={()=>navigation.navigate('SearchFood')}
                style ={{marginRight:18,marginTop:0.5}}
                />
            ),
      })},[navigation,value,data])

      const Items = ({item,index}) => {
        return(
            <View style ={styles.Containerlist}>
                <TouchableOpacity 
                key ={index}
                style = {{flexDirection:'row',width:"100%"}}
                >
                    <Image 
                    source = {{uri:item.ImageUrl}}
                    resizeMode="cover"
                    style = {{width:80,height:80}}
                    PlaceholderContent={<ActivityIndicator />}
                    />
                    <View style = {{paddingLeft:10,paddingTop:6,flexDirection:'column',width:'75%'}}>
                        <Text>{item.Title}</Text>
                        {rating(item.Rating)}
                        <Text
                        numberOfLines ={2}
                        style = {{fontSize:12}}
                        >{item.Content}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }  
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style ={styles.Container}>
                {search? 
                <View style ={styles.txtContent}>
                    <Text>
                        Searching, please wait...!
                    </Text>
                </View>
                :
                <View style ={styles.isSearch}>
                    <FlatList 
                    data = {currentData}
                    renderItem = {Items}
                    keyExtractor={(i,k) => k.toString()}
                    />
                </View>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#FFF'
    },
    txtContent:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        backgroundColor:'#FFF'
    },
    isSearch:{
        marginTop:16,
        backgroundColor:'#FFF'
    },
    Containerlist:{
        marginTop:2,
        justifyContent:'center',
        alignSelf:'center',
        width:"90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0.75,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.75,
        elevation: 7,
        backgroundColor:"#fff",
        marginBottom:10
    }
})


export default SearchScreen;