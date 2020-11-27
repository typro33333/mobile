import * as React from 'react';
import {View,Text,StyleSheet, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function Product_place(){
    const [trigger,setTrigger] = React.useState(false);
    const [data,setData] = React.useState();
    React.useEffect(()=> {
    async function getorderdata(){
        const url = 'http://tdtsv.ddns.net:8000/order_handler/getAllItem';
        const res = await axios.get(url);
        const resjson = res.data;
        resjson.forEach(element => {
            element.active = false
        });
        setData(resjson);
        }
        getorderdata();
    },[]);
    
    const Price = (data,index) => {
        let total = 0;
        for(var i=0;i<data[index].data.length;i++){
            total = total + Number(data[index].data[i].quantity)*Number(data[index].data[i].Price)
        }
        return(total)
    }

    const Totalprice = (data,index) => {
        let total = 0;
        let code = Number(data[index].code);
        if(isNaN(code) === true){
            code = 0
        }
        for(var i=0;i<data[index].data.length;i++){
            total = total + Number(data[index].data[i].quantity)*Number(data[index].data[i].Price)
        }
        return(total - total*(code/100))
    }

    const Showmore = (active,index) => {
        if(active === true){
            return(
            <TouchableOpacity 
            onPress ={()=>{
                data[index].active = false;
                setTrigger(!trigger)
            }}
            style ={[styles.btnshowmore]}>
                <Ionicons name="ios-arrow-down" size={24} color="#DCDCDC" />
            </TouchableOpacity>)
        }else{
            return(
            <TouchableOpacity
            onPress ={()=>{
                data[index].active = true;
                setTrigger(!trigger)
            }} 
            style ={[styles.btnshowmore]}>
                <Ionicons name="ios-arrow-up" size={24} color="#DCDCDC" />
            </TouchableOpacity>)
        }
    }

    const ContainerItem = ({item,index}) => {
        return(
            <View key={index} 
            style ={styles.containerCard}>
                <View style ={[styles.txtorder]}>
                    <View style={{alignSelf:'center',backgroundColor:'#FFF'}}>
                        <Text style ={{fontSize:18,fontWeight:'500',marginTop:8}}>Order {index+1}</Text>
                    </View>
                    <View style ={{flexDirection:'row'}}>
                        <Ionicons name="ios-person" size={20} color="#858181" />
                        <Text style ={[styles.txtdetail,{marginLeft:11}]}>Name: {item.UserName}</Text>
                    </View>
                    <View style ={{flexDirection:'row',marginLeft:2}}>
                        <Ionicons name="ios-phone-portrait" size={24} color="#858181"/>
                        <Text style ={[styles.txtdetail,{marginLeft:13}]}>Phone: {item.Phone}</Text>
                    </View>
                    <View style ={{flexDirection:'row',marginTop:8}}>
                        <Ionicons name="ios-calendar" size={22} color="#858181" />
                        <Text style ={[styles.txtdetail,{marginLeft:7}]}>Ngày oder: {item.OrderDate}</Text>
                    </View>
                    <View style ={{flexDirection:'row'}}>
                        <Ionicons name="ios-checkmark" size={30} color="#858181" />
                        <Text style ={[styles.txtdetail,{marginLeft:13}]}>Ngày giao: {item.RecieveDate}</Text>
                    </View>
                </View>
                {item.active?
                <View style ={{backgroundColor:'#FFF'}}></View>
                :
                <View style ={{marginTop:20}}>
                    <FlatList 
                    data = {data[index].data}
                    renderItem = {Items}
                    keyExtractor={(i,k) => k.toString()}
                    />
                </View>
                }
                <View style ={{flexDirection:'row',justifyContent:'flex-end',borderTopWidth:0.7,marginTop:18,borderColor:'#858181'}}>
                    <View style={{marginRight:20,marginTop:14,flexDirection:'column'}}>
                        <Text>Price: {Price(data,index)}đ</Text>
                        <Text>Sale: -{Price(data,index) * item.code/100}đ</Text>
                        <Text style ={{color:'#FE6B47',fontSize:17,fontWeight:'700'}}>Total: {Totalprice(data,index)}đ</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4,marginTop:10}}>
                    <TouchableOpacity 
                    style ={[styles.btn,{backgroundColor:"#DB381E",marginLeft:10}]}>
                        <MaterialCommunityIcons name="delete" size={18} color="#FFF" />
                        <Text style ={{color:'#FFF',marginLeft:2}}>Hủy Đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style ={[styles.btn,{backgroundColor:"#2D74E9",marginRight:10}]}>
                        <MaterialCommunityIcons name="truck-delivery" size={20} color="#FFF" />
                        <Text style ={{color:'#FFF',marginLeft:6}}>Đã Giao</Text>
                    </TouchableOpacity>
                </View>
                {item.active?
                <View style ={styles.container_txthide}><Text style ={{fontSize:10,color:'#ABA4A4',marginHorizontal:2}}>Xem chi tiết</Text></View>
                :
                <View style ={styles.container_txthide}><Text style ={{fontSize:10,color:'#ABA4A4',marginHorizontal:2}}>Ẩn</Text></View>
                }
                {Showmore(data[index].active,index)}
            </View>
        )
    }

    const Items = ({item,index}) => {
        return(
            <View key={index} 
            style ={{flexDirection:'row',alignSelf:'center',width:'80%',backgroundColor:'#FFF',margin:4}}>
                <View>
                    <Image 
                    source ={{uri:item.ImageUrl}}
                    resizeMode="cover"
                    style ={{height:90,width:90,borderWidth:0.7,borderRadius:6,borderColor:'#D1D1D1'}}
                    PlaceholderContent ={<ActivityIndicator/>}
                    />
                </View>
                <View style ={{marginLeft:16}}>
                    <Text>{item.Title}</Text>
                    <Text>{item.Price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>FoodType: {item.FoodType}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style = {{flex:1,backgroundColor:'#FFF'}}>
            <ScrollView style ={{backgroundColor:'#FFF',flex:1}}>
                <FlatList 
                data = {data}
                renderItem = {ContainerItem}
                keyExtractor={(i,k) => k.toString()}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerCard:{
        borderWidth:0.5,
        alignSelf:'center',
        width:"95%",
        marginTop:14,
        borderRadius:11,
        borderColor:'#C6C6C6'
    },
    btn:{
        width:'45%',
        height:38,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        flexDirection:'row'
    },
    btnshowmore:{
        alignSelf:'center',
        width:'100%',
        alignItems:'center',
        borderRadius:10
    },
    txtorder:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'#FFF',
        marginLeft:16,
        flexDirection:'column'
    },
    container_txthide:{
        alignSelf:'center',
        marginTop:6
    },
    txtdetail:{
        fontSize:16,
        fontWeight:'500',
        color:'#858181',
    }
})

/*const data =[
    {   active:false,
        Destination:"10.8774661188252#106.8087347319842",
        OrderDate: "26/11/2020",
        OrderId: "6361130",
        Phone: "0373882",
        RecieveDate: "27/11/2020",
        UserName: "Thịnh",
        code: "30",
        note: "string",
        status: "Processing",
        data:[{
                Content: "Phở là một món ăn truyền thống của Việt Nam, được cho là có nguồn gốc từ Nam Định, cũng có thể xem là một trong những món ăn tiêu biểu cho nền ẩm thực Việt Nam",
                FoodId: 1,
                FoodType: "classic",
                ImageUrl: "http://tdtsv.ddns.net:8000/getImage/Pho1.png",
                Price: "30000",
                Rating: "5",
                Title: "Phở",
                quantity: 5,
            },
            {
                Content: "Coffee cake is any cake flavored with or intended to be eaten with coffee.",
                FoodId: 12,
                FoodType: "Cakes",
                ImageUrl: "http://tdtsv.ddns.net:8000/getImage/CakesCoffee Cake827.png",
                Price: "30",
                Rating: "3.7",
                Title: "Coffee Cake",
                quantity: 5,
            }]
    },
    {   active:true,
        Destination:"10.8774661188252#106.8087347319842",
        OrderDate: "26/11/2020",
        OrderId: "6361130",
        Phone: "0373882",
        RecieveDate: "27/11/2020",
        UserName: "Trieu",
        code: "30",
        note: "string",
        status: "Processing",
        data:[{
                Content: "Phở là một món ăn truyền thống của Việt Nam, được cho là có nguồn gốc từ Nam Định, cũng có thể xem là một trong những món ăn tiêu biểu cho nền ẩm thực Việt Nam",
                FoodId: 1,
                FoodType: "classic",
                ImageUrl: "http://tdtsv.ddns.net:8000/getImage/Pho1.png",
                Price: "30000",
                Rating: "5",
                Title: "Phở",
                quantity: 5,
            },
            {
                Content: "Coffee cake is any cake flavored with or intended to be eaten with coffee.",
                FoodId: 12,
                FoodType: "Cakes",
                ImageUrl: "http://tdtsv.ddns.net:8000/getImage/CakesCoffee Cake827.png",
                Price: "30",
                Rating: "3.7",
                Title: "Coffee Cake",
                quantity: 5,
            }]
    },
]*/