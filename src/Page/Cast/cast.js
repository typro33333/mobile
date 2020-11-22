import React, { useEffect } from 'react';
import { View, Text,TouchableOpacity} from 'react-native';
import {CheckBox, Image} from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
const Cart = () =>  {
  const navigation = useNavigation();
  React.useEffect(()=> {
    navigation.setOptions({
        headerRight:()=>(
            <TouchableOpacity onPress = {()=> navigation.navigate('Info')}>
                <Text style={{fontWeight:'400',fontSize:18,marginRight:14,color:'blue'}}>List</Text>
            </TouchableOpacity>
        ),
    })
},[navigation])
    return (
      <View style={{ flex: 1}}>
        <View style ={{backgroundColor:'#FFEEC7'}}>
          <View style ={{flexDirection:'row',alignItems:'center',height:50,alignSelf:'center',width:'90%'}}>
            <FontAwesome5 name="shipping-fast" size={24} color="#28B463"/>
            <Text style ={{fontSize:12,marginLeft:10,width:"87%"}}>
              Tất cả các mặt hàng được đã đặt sẽ nằm ở đây và đồng ý sẽ được vận chuyển đi nha!
            </Text>
          </View>
        </View>
        <View style ={{flex:1}}>
          <ScrollView style ={{flexDirection:'column',backgroundColor:'#FFF',paddingTop:10}}>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style ={{
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
              source = {{uri:'http://tdtsv.ddns.net:8000/getImage/img1.png'}}
              style ={{height:100,width:90}}
              resizeMode ="cover"
              PlaceholderContent ={<ActivityIndicator/>}
              />
              <View style ={{height:105,marginLeft:18,flexDirection:'column',width:"58%"}}>
                <Text>Title</Text>
                <Text style={{marginTop:4}}>Tags</Text>
                <View style ={{flexDirection:'row',marginTop:10}}>
                  <Text>Icon: </Text>
                  <Text style ={{marginLeft:2,color:'#DC7633',fontWeight:'700'}}>Price</Text>
                </View>
                <Text style={{marginTop:8}}>Quatity: 2</Text>
              </View>
              <TouchableOpacity style ={{width:"15%"}}>
              <View style ={{height:110,backgroundColor:'#FF633D',flexDirection:'row',justifyContent:'center'}}>
                <View style ={{alignSelf:'center'}}>
                  <Text style ={{color:"#FFF"}}>Xóa</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
}

export default Cart;