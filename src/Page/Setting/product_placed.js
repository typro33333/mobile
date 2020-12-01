import * as React from 'react';
import {View,Text,StyleSheet, ScrollView, ActivityIndicator, FlatList,Button,Image as ImageReact} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons,Entypo } from '@expo/vector-icons';
import { Dialog } from 'react-native-simple-dialogs';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
export default function Product_place(){
    const navigation = useNavigation();
    const [trigger,setTrigger] = React.useState(false);
    const [loading,setloading] =React.useState(false);
    const [data,setData] = React.useState([]);
    const [open,setOpen] = React.useState(false);
    const [open1,setOpen1] = React.useState(false);
    const [index,setIndex] = React.useState();
    React.useEffect(()=> {
        getdata()
    },[]);
    
    React.useEffect(()=> {
        navigation.setOptions({
            headerLeft:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {navigation.goBack()}}>
                    <View style ={{justifyContent:'center'}}>
                        <Text style={{color:"#267EF9",marginLeft:10,fontSize:18}}>Back</Text>
                    </View>
                </TouchableOpacity>
            ),
        })
    },[navigation]);

    const location = (data,type,index) => {
        const latitude = data[index].Destination.split('#')
        if(type === 1){
            return latitude[0]
        }
        else if(type === 2){
            return latitude[1]
        }
    }
    const notData = (data) => {
        if(data.length === 0){
            return(
                <View style={{flex:1,alignSelf:'center',justifyContent:'center'}}>
                    <View style ={{flexDirection:'row'}}>
                        <ImageReact 
                        source ={require('../../../assets/sad.png')}
                        resizeMode='cover'
                        style ={{height:24,width:24}}
                        />
                        <Text style ={{marginTop:2,marginLeft:10,fontSize:15,fontWeight:'600'}}>Không có Đơn Đặt Hàng Nào!</Text>
                    </View>
                </View>
            )
        }else{
            return(<View></View>)
        }
    }

    const getdata = async() => {
        const url = 'http://tdtsv.ddns.net:8000/order_handler/getAllItem';
        const res = await axios.get(url);
        const resjson = res.data;
        resjson.forEach(element => {
            element.active = true
        });
        setloading(true)
        setData(resjson);
    }

    const cancelOrder = async(data,index) => {
        const url = 'http://tdtsv.ddns.net:8000/order_handler/cancellOrder'+data[index].OrderId;
        const res = await axios.get(url)
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.status);
            }
        });
        getdata();
        setOpen(false);
    }

    const doneOrder = async(data,index) => {
        const url = 'http://tdtsv.ddns.net:8000/order_handler/doneOrder'+data[index].OrderId;
        const res = await axios.get(url)
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.status);
            }
        });
        getdata();
    }

    const Price = (data,index) => {
        let total = 0;
        for(var i=0;i<data[index].data.length;i++){
            total = total + Number(data[index].data[i].quantity)*Number(data[index].data[i].Price)
        }
        return(total)
    }

    const Totalprice = (data,index) => {
        let total = 0;
        let rawcode = data[index].code;
        let code = Number(rawcode.slice(2,4));
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
                <View 
                style={{alignSelf:'center'}}>
                    <Text style ={{fontSize:18,fontWeight:'500',marginTop:8}}>Order {index+1}</Text>
                </View>
                <View style ={{flexDirection:"row",marginTop:14,marginLeft:12}}>
                    <View style ={{height:120,width:120,borderWidth:1,borderRadius:4}}>
                        <MapView 
                            provider={PROVIDER_GOOGLE}
                            style ={{flex:1}}
                            region ={{
                            latitude:Number(location(data,1,index)),
                            longitude:Number(location(data,2,index)),
                            latitudeDelta:0.00264195044303443,
                            longitudeDelta:0.000142817690068
                            }}>
                            <MapView.Marker
                            coordinate ={{
                            latitude:10.868294761208908,
                            longitude:106.69310430788435,
                            }}
                            a
                            title='Here'
                            description={"description"}
                            />
                        </MapView>
                    </View>
                    <View style ={[styles.txtorder]}>
                        <View style ={{flexDirection:'row'}}>
                            <Text style ={[styles.txtdetail]}>Name: {item.UserName}</Text>
                        </View>
                        <View style ={{flexDirection:'row',marginLeft:2,marginTop:6}}>
                            <Text style ={[styles.txtdetail]}>Phone: {item.Phone}</Text>
                        </View>
                        <View style ={{flexDirection:'row',marginTop:20}}>
                            <Text style ={[styles.txtdetail,{color:'#116DD7'}]}>Ngày oder: {item.OrderDate}</Text>
                        </View>
                        <View style ={{flexDirection:'row',marginLeft:1,marginTop:3}}>
                            <Text style ={[styles.txtdetail,{color:'#EB4F42'}]}>Ngày giao: {item.RecieveDate}</Text>
                        </View>
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
                <View style ={{alignSelf:'center',borderWidth:0.7,marginTop:24,width:'88%',borderColor:'#C6C6C6'}}></View>
                <View style ={{flexDirection:'row',marginTop:14,justifyContent:'space-between'}}>
                    <View style={{marginLeft:20,marginTop:10,flexDirection:'column',justifyContent:'flex-start'}}>
                        <Text style ={[styles.txttotal]}>Price </Text>
                        <Text style ={[styles.txttotal]}>Sale </Text>
                        <Text style ={[styles.txttotal]}>Total </Text>
                    </View>
                    <View style ={{marginRight:24,marginTop:10,alignItems:'flex-end'}}>
                        <Text style ={[styles.txttotal,{color:'#B4B4B4',fontWeight:'700'}]}>{Price(data,index)}đ</Text>
                        <Text style ={[styles.txttotal,{color:'#B4B4B4',fontWeight:'700'}]}>-{Price(data,index)*item.code/100}đ</Text>
                        <Text style ={[styles.txttotal,{fontWeight:'700'}]}>{(Price(data,index)-Price(data,index) * item.code/100)}đ</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4,marginTop:10}}>
                    <TouchableOpacity
                    onPress ={()=>{setOpen(true),setIndex(index)}}
                    style ={[styles.btn,{backgroundColor:"#DB381E",marginLeft:10}]}>
                        <MaterialCommunityIcons name="delete" size={18} color="#FFF" />
                        <Text style ={{color:'#FFF',marginLeft:2}}>Hủy Đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress ={()=>{setOpen1(true),doneOrder(data,index)}}
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
                <View style ={{marginLeft:16,flexDirection:'column'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style ={{fontSize:16,fontWeight:'600',color:'#8B8B8B'}}>{item.Title} </Text>
                        <Text style ={{fontSize:12.5,marginTop:2,marginLeft:4}}>{item.Rating}
                            <Entypo 
                            name="star" 
                            size={13} 
                            style ={{marginTop:0}} 
                            color="#FDCC0D" 
                            />
                        </Text>
                    </View>
                    <View style ={{marginTop:16}}>
                        <Text>Số lượng: {item.quantity}</Text>
                        <Text style ={{color:'#FE6B47',fontWeight:'600'}}>Giá: {item.Price}đ</Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View style = {{flex:1}}>
            {loading?
            <View></View>
            :
            <View style ={{alignSelf:'center',justifyContent:'center',marginTop:10}}>
                <ActivityIndicator size={30}/>
            </View>}
            {notData(data)}
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
                    <Button title ="Ừm" onPress ={() =>{cancelOrder(data,index)}}/>
                </View>
            </View>} 
            >
            <View style ={{alignSelf:'center',marginTop:10}}>
                <Text>Tính không giao hàng à!. Hủy đơn là mất khách đó</Text>
            </View>
            </Dialog>
            <Dialog
            visible={open1}
            title="Xác Nhận"
            onTouchOutside={() => setOpen1(false)} 
            buttons = {
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style ={{margin:14}}>
                </View>
                <View style ={{margin:14}}>
                    <Button title ="Oke" onPress ={() =>setOpen1(false)}/>
                </View>
            </View>} 
            >
            <View style ={{alignSelf:'center',marginTop:10}}>
                <View style ={{justifyContent:'center'}}>
                    <View style ={{flexDirection:'row'}}>
                        <ImageReact 
                        source ={require('../../../assets/fire-cracker.png')}
                        resizeMode ='cover'
                        style ={{height:20,width:20,marginLeft:10}}
                        />
                        <ImageReact 
                        source ={require('../../../assets/fire-cracker.png')}
                        resizeMode ='cover'
                        style ={{height:20,width:20}}
                        />
                        <View style ={{marginLeft:10,marginRight:10}}><Text>Giao Hàng Thành Công.</Text></View>
                        <ImageReact 
                        source ={require('../../../assets/fire-cracker.png')}
                        resizeMode ='cover'
                        style ={{height:20,width:20}}
                        />
                        <ImageReact 
                        source ={require('../../../assets/fire-cracker.png')}
                        resizeMode ='cover'
                        style ={{height:20,width:20}}
                        />
                    </View>
                </View>
            </View>
            </Dialog>
            <ScrollView style ={{flex:1}}>
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
        marginTop:6,
        borderRadius:11,
        borderColor:'#C6C6C6',
        backgroundColor:'#FFF'
    },
    btn:{
        width:'45%',
        height:38,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
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
        color:'#232323',
    },
    txttotal:{
        fontSize:17,
        fontWeight:'600',
        marginBottom:14,
    }
})
