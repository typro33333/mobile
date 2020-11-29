import * as React from 'react';
import {View,Text,StyleSheet, ScrollView, Image, FlatList,TouchableOpacity,Button, TextInput} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import { Dialog } from 'react-native-simple-dialogs';
import Clipboard from '@react-native-community/clipboard';

export default function Product_place(){
    const [data,setData] = React.useState([]);
    const navigation = useNavigation();
    const [open,setOpen] = React.useState(false);
    const [value,setValue] = React.useState();
    const [error,setError] = React.useState(false);
    React.useEffect(()=> {
        getdata();
    },[])

    React.useEffect(()=> {
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {setOpen(true)}}>
                    <Text style={{color:"#267EF9",marginRight:20,marginTop:10,fontSize:18}}>Add</Text>
                </TouchableOpacity>
            ),
            headerLeft:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {navigation.goBack()}}>
                    <Text style={{color:"#267EF9",marginLeft:20,marginTop:10,fontSize:18}}>Back</Text>
                </TouchableOpacity>
            ),
            title:'Your Promotion'
        })
    },[navigation]);

    const getdata = async() => {
        const url = 'http://tdtsv.ddns.net:8000/promotion/getAllItem';
        const res = await axios.get(url);
        const resjson = res.data;
        setData(resjson);
    }

    const addpromotion = async(value) => {
        const url = "http://tdtsv.ddns.net:8000/promotion/addPromotion";
        const res = fetch(url,{
            method:'POST',
            body:JSON.stringify(value)
        }).then(res => {
            console.log(res.status)
            if(res.status === 200){
                setOpen(false);
                setError(false);
                getdata();
                console.log('complete')
            }
        })
    }

    const Item =({item,index}) => {
        return(
            <TouchableOpacity 
            key={index} 
            style ={{flexDirection:'row',alignSelf:'center',width:'95%',marginTop:10,borderWidth:0.6,borderRadius:10,backgroundColor:'#FFF'}}>
                    <View style ={{paddingLeft:10,margin:8}}>
                        <Image 
                        source ={require('../../../assets/sale.jpg')}
                        resizeMode='cover'
                        style ={{height:100,width:100,borderRadius:6}}
                        />
                    </View>
                    <View style ={{margin:6,width:'50%'}}>
                        <View style ={{alignItems:'center',marginTop:10}}>
                            <Text style={{fontSize:20,fontWeight:'700'}}>Code #{item.code}</Text>
                        </View>
                        <View style ={{alignItems:'center',marginTop:20}}>
                            <Text style={{fontSize:20,fontWeight:'600',color:"#E55B16"}}>Sale up {item.value}% </Text>
                        </View>
                    </View>
            </TouchableOpacity>
        )
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const add = (value) => {
        if(isNumeric(value) === true){
            if(Number(value)<=100 && Number(value) >0){
                return addpromotion(value)
            }else{
                return setError(true)
            }
        }else{
            setError(true)
        }
    }

    return(
        <View style = {styles.container}>
            <Dialog
            visible={open}
            title="Xác Nhận"
            onTouchOutside={() => setOpen(false)} 
            buttons = {
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style ={{margin:14}}>
                    <Button title ="Hủy" onPress ={() =>setOpen(false)}/>
                </View>
                <View style ={{margin:14}}>
                    <Button title ="Add" onPress ={() =>{add(value)}}/>
                </View>
            </View>} 
            >   
                <View style ={{alignSelf:'center'}}>
                    <View style= {{flexDirection:'row'}}>
                        <Image 
                        source ={require('../../../assets/warning.png')}
                        resizeMode='cover'
                        style ={{width:20,height:20,marginTop:6}}
                        />
                        <Text style ={{color:'#D64322',marginLeft:4}}>Lưu ý: Nhập số và không nhập chữ và phải nhỏ hơn 100</Text>
                    </View>
                    <View style ={{marginTop:10,flexDirection:'row',justifyContent:'center'}}>
                        <Text style ={{fontSize:16,fontWeight:'500'}}>Nhập giá sale </Text>
                        <TextInput
                        onChangeText ={value => {setValue(value)}}
                        style={{width:100,borderBottomWidth:0.7}}
                        />
                        <Text>%</Text>
                    </View>
                    {error?
                    <View style ={{marginTop:10,backgroundColor:'#F56A4B',borderRadius:6}}><Text style ={{margin:4,color:'#FFF'}}>Error: Chỉ nhập số hoặc dưới 100</Text></View>
                    :
                    <View></View>
                    }
                </View>
            </Dialog>
            <ScrollView style ={{flex:1}}>
                <FlatList
                data = {data}
                renderItem ={Item}
                keyExtractor={(i,k) => k.toString()}
                />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})