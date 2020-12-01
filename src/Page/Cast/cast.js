import React, { useEffect } from 'react';
import { View, Text,TouchableOpacity, FlatList, StatusBar, TextInput,Button,RefreshControl} from 'react-native';
import {  Slider , Image,Input } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Dialog } from 'react-native-simple-dialogs';
import { MaterialIcons, Octicons } from '@expo/vector-icons'; 

import axios from 'axios';
const Cart = () =>  {
  const navigation = useNavigation();
  const [data,setData] = React.useState([]);
  const [open,setOpen] = React.useState(false);
  const [openDel,setopenDel] = React.useState(false);
  const [openEdit,setOpenEdit] = React.useState(false);
  const [quantity,setQuantity] = React.useState(1)
  const [title,setTitle] = React.useState('');
  const [id,setId] = React.useState();
  const [promotion,setPromotion] =React.useState(0);
  const [value,setValue] = React.useState(0);
  const [check,setCheck] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function getdata(){
      const url = 'http://tdtsv.ddns.net:8000/bag/getAllItem';
      const res = await axios.get(url)
      const resjson = await res.data;
      setData(resjson);
    }
    getdata();
    wait(500).then(() => setRefreshing(false));
  },[]);

  React.useEffect(()=>{
      async function getdata(){
        const url = 'http://tdtsv.ddns.net:8000/bag/getAllItem';
        const res = await axios.get(url)
        const resjson = await res.data;
        setData(resjson);
      }
      getdata();
  },[])

  const deleteFood = async(id) => {
    const url = 'http://tdtsv.ddns.net:8000/bag/addItem'+id+'-0';
    const res = await axios.get(url);
    if(res.status === 200){
      setopenDel(false);
    }
  }

  const UpdateQuantity = async(id,quantity)  => {
    const url = 'http://tdtsv.ddns.net:8000/bag/addItem'+id+'-'+quantity;
    const res = await axios.get(url);
    if(res.status === 200){
      setOpenEdit(false);
    }
  }

  const getPromotion = async(id_promotion) => {
    const url = 'http://tdtsv.ddns.net:8000/promotion/getItem'+id_promotion;
    const res = await axios.get(url)
    .catch(function (error) {
      if (error.response) {
        setCheck(true);
        setPromotion('Nhập mã khuyến mãi');
      }
    });
    if(res.status === 200){
      const resjson = await res.data;
      setValue(Number(resjson.value))
      setOpen(false);
      setCheck(false)
    }
  }
  const card = ({item,index}) => {
    return(
      <View 
      key ={index}
      style ={{
        flexDirection:'row',
        height:110,
        alignItems:'center',
        alignSelf:'center',
        width:"95%",
        borderBottomColor:'#E1E1E1',
        borderBottomWidth:0.7,
        paddingBottom:10,
        marginTop:10}}>
          <Image 
          source = {{uri:item.ImageUrl}}
          style ={{height:100,width:90}}
          resizeMode ="cover"
          PlaceholderContent ={<ActivityIndicator/>}
          />
          <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
            <Text style ={{fontSize:14,fontWeight:'600'}}>{item.Title}</Text>
            <Text style={{marginTop:4,color:'#929292'}}>#{item.FoodType}</Text>
            <View style ={{flexDirection:'row',marginTop:10}}>
              <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price:{item.Price}</Text>
            </View>
            <View style ={{flexDirection:'row',marginTop:10}}>
              <Text style ={{color:'#DC7633',fontSize:15,fontWeight:'600'}}>Quatity: {item.quantity}</Text>
              <TouchableOpacity
              onPress = {() => {setOpenEdit(true);setTitle(item.Title);setId(item.FoodId);setQuantity(item.quantity)}}
              style ={{marginLeft:10,marginTop:2}}>
                <MaterialIcons name="edit" size={16} color="#9A9A9A" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
          onPress = {() =>{setopenDel(true);setTitle(item.Title);setId(item.FoodId)}}
          style ={{width:"15%"}}>
          <View style ={{height:110,backgroundColor:'#FF4F24',flexDirection:'row',justifyContent:'center'}}>
            <View style ={{alignSelf:'center'}}>
              <Text style ={{color:"#FFF"}}>Xóa</Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
    )
  }
  let total = 0;
  for(var i = 0;i<data.length;i++){
    total += (Number(data[i].quantity)*Number(data[i].Price)) 
  }
    return (
      <View style={{ flex: 1}}>
        <StatusBar barStyle='dark-content'/>
        <Dialog
          visible={open}
          title="Nhập Mã Khuyến Mãi"
          onTouchOutside={() => setOpen(false)} 
          buttons = {
          <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style ={{margin:12}}>
              <Button title ="Hủy" onPress ={() =>{setOpen(false),setCheck(false)}}/>
            </View>
            <View style ={{margin:12}}>
              <Button title ="Xác Nhận" onPress ={() =>getPromotion(promotion)}/>
            </View>
          </View>}
          >
          <View>
            <View>
              <Input
              label ="Promotion Code"
              placeholder='23172...'
              autoFocus ={true}
              onChangeText ={(text) => setPromotion(text)}
              leftIcon ={<Octicons name="code" size={20} color="black" />}
              />
              {check?
              <View style ={{borderRadius:50,backgroundColor:'#FF4949',width:"95%",alignItems:'center',alignSelf:'center',height:30,justifyContent:'center'}}>
                <View style ={{flexDirection:'row'}}>
                  <MaterialIcons name="error-outline" size={20} color="#FFF" />
                  <Text style ={{color:'#FFF',marginLeft:4}}>Mã khuyến mãi không tồn tại!</Text>
                </View>
              </View>
              :
              <View></View>
              }
            </View>
          </View>
        </Dialog>
        <Dialog
          visible={openDel}
          title="Xóa Khỏi Giỏ Hàng?"
          onTouchOutside={() => setopenDel(false)} 
          buttons = {
          <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style ={{margin:12}}>
              <Button title ="Hủy" onPress ={() =>setopenDel(false)}/>
            </View>
            <View style ={{margin:12}}>
              <Button title ="Xác Nhận" onPress ={() =>deleteFood(id)}/>
            </View>
          </View>}
          >
          <View>
            <Text>Khi đã xóa không thể hoàn tác lại!</Text>
            <Text>Món ăn sẽ xóa: {title}</Text>
          </View>
        </Dialog>
        <Dialog
          visible={openEdit}
          dia
          title = {'Chỉnh sửa số lượng '+ title}
          onTouchOutside={() => setOpenEdit(false)} 
          buttons = {
          <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style ={{margin:12}}>
              <Button title ="Hủy" onPress ={() =>setOpenEdit(false)}/>
            </View>
            <View style ={{margin:12}}>
              <Button title ="Xác Nhận" onPress ={() =>UpdateQuantity(id,quantity)}/>
            </View>
          </View>}
          >
          <View style={{alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            value={quantity}
            onValueChange={(text)=>{setQuantity(text)}}
            maximumValue={50}
            minimumValue={1}
            step={1}
            trackStyle={{ height: 10, backgroundColor:'#FE6B47' }}
            thumbStyle={{ height: 18, width: 18, backgroundColor: '#FE6B47' }}
          />
          <View>
            <Text>Số lượng được chọn: {quantity}</Text>
          </View>
          </View>
        </Dialog>
        <View style ={{backgroundColor:'#FFEEC7'}}>
          <View style ={{flexDirection:'row',alignItems:'center',height:50,alignSelf:'center',width:'90%'}}>
            <FontAwesome5 name="shipping-fast" size={24} color="#28B463"/>
            <Text style ={{fontSize:12,marginLeft:10,width:"87%"}}>
              Tất cả các mặt hàng được đã đặt sẽ nằm ở đây và đồng ý sẽ được vận chuyển đi nha!
            </Text>
          </View>
        </View>
        <View style ={{flex:1,flexDirection:'column'}}>
          <ScrollView 
          style ={{flexDirection:'column',backgroundColor:'#FFF',paddingTop:10}}
          refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <FlatList 
            data = {data}
            renderItem = {card}
            keyExtractor={(i,k) => k.toString()}
            />
          </ScrollView>
          <View style ={{height:36,borderTopWidth:0.5,borderColor:'#F0F0F0',backgroundColor:'#FFF',flexDirection:'row',justifyContent:'space-between'}}>
            <View style ={{justifyContent:'center',marginLeft:10}}>
              <View style ={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="cash" size={30} color="#45AE3E" />
                <Text style ={{fontSize:16,marginTop:4,marginLeft:8,fontWeight:'500'}}>Shop Voucher</Text>
              </View>
            </View>
            <TouchableOpacity 
            onPress = {() => setOpen(true)}
            style ={{alignItems:'flex-end',justifyContent:'center'}}>
              <View style ={{flexDirection:'row',marginRight:8}}>
                <Text style ={{color:'#A3A3A3',fontSize:13}}>Nhập mã khuyến mãi</Text>

                <AntDesign name="right" size={16} color="#A3A3A3" style={{marginTop:1}}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style ={{height:53,width:'100%',backgroundColor:'white',borderTopWidth:0.6,borderColor:'#F0F0F0'}}>
            <View style ={{flexDirection:'row-reverse',height:'100%'}}>
              <TouchableOpacity
              onPress = {()=> navigation.navigate('Info',{data,value,promotion})}
              style ={{width:100,backgroundColor:'#FE6B47',justifyContent:'center'}}
              >
                <View style ={{alignItems:'center'}}>
                  <Text style ={{color:'#FFF',fontWeight:'600',fontSize:14}}>Đặt Hàng</Text>
                </View>
              </TouchableOpacity>
              <View style ={{marginRight:10,justifyContent:'center'}}>
                <View style ={{flexDirection:'row'}}>
                  <View style ={{flexDirection:'column'}}>
                    <Text style ={{fontSize:16,fontWeight:'500'}}>Tổng Tiền: </Text>
                    <Text style ={{fontSize:12,fontWeight:'500',marginLeft:18}}>Đã Giảm: </Text>
                  </View>
                  <View>
                    <View style ={{flexDirection:'row'}}>
                      <Text style ={{textDecorationLine:'underline',color:'#FE6B47',fontWeight:'700',marginHorizontal:1}}>đ</Text>
                      <Text style ={{color:'#FE6B47',fontWeight:'700'}}>{Number(total-(value/100*total))}</Text>
                    </View>
                    <View style ={{flexDirection:'row',marginTop:4}}>
                      <Text style ={{textDecorationLine:'underline',color:'#FE6B47',fontWeight:'700',marginHorizontal:1,fontSize:12}}>đ</Text>
                      <Text style ={{color:'#FE6B47',fontWeight:'700',fontSize:12}}>{Number((value/100*total))}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style ={{justifyContent:'center',marginRight:10}}>
                <FontAwesome5 name="coins" size={26} color="#FFC327" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
}

export default Cart;