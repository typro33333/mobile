import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,FlatList,Image,Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { Dialog } from 'react-native-simple-dialogs';
import {  Slider } from 'react-native-elements';
export default function Product_place(){
    const navigation = useNavigation();
    const [data,setData] = React.useState([]);
    const [quantity,setQuantity] = React.useState(0);
    const [open,setOpen] = React.useState(false);
    const [clear,setclear] = React.useState(false);
    React.useEffect(()=> {
        navigation.setOptions({
            headerLeft:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {navigation.goBack()}}>
                    <Text style={{color:"#267EF9",marginLeft:20,marginTop:8,fontSize:18}}>Back</Text>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {setOpen(true)}}>
                    <Text style={{color:"#267EF9",marginRight:20,marginTop:8,fontSize:18}}>Clear</Text>
                </TouchableOpacity>
            ),
        })
    },[navigation]);

    React.useEffect(()=>{
        getdata();
    },[])

    const getdata = async() => {
        const url = 'http://tdtsv.ddns.net:8000/history/getAllItem';
        const res = await axios.get(url);
        const resjson = res.data;
        setData(resjson);
        setOpen(false);
    }

    const deleteall = async() => {
        const url = 'http://tdtsv.ddns.net:8000/history/deleteAllItem';
        const res = await axios.get(url);
        getdata();
    }

    const Price = (data,index) => {
        let total = 0;
        for(var i=0;i<data[index].data.length;i++){
            total = total + Number(data[index].data[i].quantity)*Number(data[index].data[i].Price)
        }
        return(total)
    }

    const image =(data,index) =>{
        const image = require('../../../assets/success.jpg');
        const image2 = require('../../../assets/canceled.jpg')
        if(data[index].status === "Successed"){
            return image;
        }else{
            return image2;
        }
    }

    const borderCard = (data,index) => {
        if(data[index].status === "Successed"){
            return {
                borderColor:'#67AB4D' 
            }
        }else{
            return {
                borderColor:'#E04B3F'
            }
        }
    }

    const btnclear = (quantity) => {
        if(quantity === 100){
            return(
                <View style ={{margin:14}}>
                    <Button title ="Clear" onPress ={() =>{deleteall()}}/>
                </View>
            )
        }else{
            <View style ={{margin:14}}>
                    <Button title ="Clear" style={{color:'#A9A6A6'}}/>
            </View>
        }
    }

    const Item =({item,index}) => {
        return(
            <TouchableOpacity 
            key={index} 
            style ={[borderCard(data,index),{flexDirection:'row',alignSelf:'center',width:'95%',marginTop:10,borderWidth:1.5,borderRadius:10,backgroundColor:'#FFF'}]}>
                    <View style ={{paddingLeft:10,margin:12,justifyContent:'center'}}>
                        <Image 
                        source ={image(data,index)}
                        resizeMode='cover'
                        style ={{height:110,width:110,borderRadius:6}}
                        />
                    </View>
                    <View style ={{margin:6,width:'50%'}}>
                        <View style ={{alignItems:'center',marginTop:8,marginBottom:8}}>
                            <Text style={{fontSize:20,fontWeight:'700',color:'#383838'}}>Name: {item.UserName}</Text>
                        </View>
                        <Text style={{fontSize:14,fontWeight:'600',color:'#918E8C'}}>Order: {item.OrderDate}</Text>
                        <Text style={{fontSize:14,fontWeight:'600',color:'#918E8C'}}>RecieveDate: {item.RecieveDate}</Text>
                        <Text style={{fontSize:14,fontWeight:'600',color:'#918E8C'}}>Phone: {item.Phone}</Text>
                        <Text style={{fontSize:14,fontWeight:'600',marginTop:10,color:"#E55B16"}}>Total: {Price(data,index)-Price(data,index)*item.code/100}</Text>
                    </View>
            </TouchableOpacity>
        )
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
                {btnclear(quantity)}
            </View>} 
            >   
                <View style ={{alignSelf:'center'}}>
                    <View style= {{flexDirection:'row'}}>
                        <Image 
                        source ={require('../../../assets/warning.png')}
                        resizeMode='cover'
                        style ={{width:20,height:20}}
                        />
                        <Text style ={{color:'#D64322',marginLeft:4}}>Lưu ý: Dữ liệu không thể khôi phục</Text>
                        
                    </View>
                    <View style={{alignItems: 'stretch', justifyContent: 'center',marginTop:20}}>
                        <Slider
                            value={quantity}
                            onValueChange={(text)=>{setQuantity(text)}}
                            maximumValue={100}
                            minimumValue={0}
                            step={1}
                            trackStyle={{ height: 10, backgroundColor:'#FE6B47' }}
                            thumbStyle={{ height: 18, width: 18, backgroundColor: '#FE6B47' }}
                        />
                        </View>
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