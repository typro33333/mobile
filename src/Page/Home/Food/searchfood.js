import React,{useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [value,setValue] = React.useState('');
    const [currentData,setCurrentData] = React.useState(data)
    const [search,setSearch] = React.useState(false);
    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    useEffect(()=>{
        navigation.setOptions({
            title:'',
            headerLeft: () => (
                    <View style ={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity
                        onPress = {()=> navigation.navigate('Food')}
                        >
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
                                },1500)
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
      })},[navigation,value])

      const Items = ({item,index}) => {
        return(
            <View style ={{
            marginTop:10,
            justifyContent:'center',
            alignSelf:'center',
            width:"90%",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,}}>
                <TouchableOpacity 
                key ={index}
                style = {{flexDirection:'row',width:"100%",backgroundColor: '#FFFFFF'}}
                >
                    <Image 
                    source = {item.image}
                    resizeMode="cover"
                    style = {{width:50,height:50}}
                    />
                    <Text style = {{paddingLeft:10,paddingTop:6}}>
                        <Text>{item.title}</Text>
                        <Text>{"\n"}{item.content}</Text>
                    </Text>

                </TouchableOpacity>
            </View>
        )
    }  
    return(
        <ScrollView>
            <View style ={styles.Container}>
                {search? 
                <View style ={styles.txtContent}>
                    <Text>
                        Is searching, please wait...!
                    </Text>
                </View>
                :
                <View style ={styles.isSearch}>
                    <Text style ={{fontSize:20,fontFamily:'Cochin',width:'90%',alignSelf:'center'}}>Result</Text>
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
        flex:1
    },
    txtContent:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
    isSearch:{
        marginTop:16,
    }
})

const data = [
    {id:1,title:'Cake',content:'Bánh ngọt',image:require('../../../../assets/image_1.jpg'),},
    {id:2,title:'Scone',content:'Bánh Mặn',image:require('../../../../assets/image_2.jpg'),},
    {id:3,title:'Fritters',content:'Bánh ngọt',image:require('../../../../assets/image_3.jpg'),},
    {id:4,title:'Cupcake',content:'Bánh ngọt',image:require('../../../../assets/image_4.jpg'),},
    {id:5,title:'Coffee cake',content:'Bánh Mặn',image:require('../../../../assets/image_5.jpg'),},
    {id:6,title:'Cake Donut',content:'Bánh ngọt',image:require('../../../../assets/image_6.jpg'),},
    {id:7,title:'Mousse',content:'Bánh Mặn',image:require('../../../../assets/image_7.jpg'),},
    {id:8,title:'Banh Pie',content:'Bánh Mặn',image:require('../../../../assets/image_8.jpg'),},
    {id:9,title:'Cheesecake',content:'Bánh ngọt',image:require('../../../../assets/image_9.jpg'),},
    {id:10,title:'Lean Yeast Bread',content:'Bánh ngọt',image:require('../../../../assets/image_10.jpg'),},
]

export default SearchScreen;