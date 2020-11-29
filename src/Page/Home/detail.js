import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button,Dimensions,StyleSheet,StatusBar, TouchableOpacity,ActivityIndicator} from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';
import HeaderImageScrollView,{TriggeringView} from 'react-native-image-header-scroll-view';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import {Image} from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import axios from 'axios';

const Detail = () =>  {
  const navigation = useNavigation();
  const route = useRoute();
  const Stateprice = Number(route.params.item.Price);
  const [price,setPrice] = React.useState(Number(route.params.item.Price));
  const [quatity,setQuatity] = React.useState(1)
  const navTitleView = useRef(null);
  const foodid = route.params.item.FoodId
  const _Addproduct = () => {
    setQuatity(quatity+1);
    setPrice(Number(price)+Number(Stateprice))
  }
  const [open,setOpen] = React.useState(false)
  const _Delproduct = () => {
    setQuatity(quatity-1);
    setPrice(Number(price)-Number(Stateprice));
  }
  React.useEffect(()=> {
    async function rencent(){
      const url = 'http://tdtsv.ddns.net:8000/topRecent/updateTopRecent'+foodid;
      return await axios.get(url)
    }
    rencent();
  },[foodid])

  const addtocast = async(foodid,quatity) => {
    const url = 'http://tdtsv.ddns.net:8000/bag/addItem'+foodid+'-'+quatity;
    return await axios.get(url);
  }

  const btndelete = (quatity) => {
    if(quatity >=2)
      return(
        <TouchableOpacity style = {{marginLeft:'10%'}} onPress ={_Delproduct}>
          <Ionicons name="ios-remove-circle" size={36} color="#C0392B" />
        </TouchableOpacity>
      )
    return(
      <Ionicons name="ios-remove-circle" size={36} color="#D5D8DC" style = {{marginLeft:'10%'}}/>
    )
  }

    return (
      <View style ={styles.container}>
        <StatusBar barStyle='light-content'/>
        <Dialog
          visible={open}
          title="Xác Nhận"
          onTouchOutside={() => setOpen(false)} 
          buttons = {
          <View style={{flexDirection:'row-reverse',marginLeft:10}}>
              <Button title ="Đồng ý" onPress ={() =>setOpen(false)}/>
          </View>} 
          >
          <View>
            <Text>{route.params.item.Title} đã được thêm vào giỏ hàng</Text>
            <Text>Số lượng: {quatity}</Text>
          </View>
        </Dialog>
        <HeaderImageScrollView
        maxOverlayOpacity={0.8}
        minOverlayOpacity={0.2}
        maxHeight = {350}
        minHeight = {90}
        renderHeader ={() =>(
          <Image 
          source ={{uri:route.params.item.ImageUrl}} 
          style ={styles.image}
          PlaceholderContent = {<ActivityIndicator/>}
          />
        )}
        renderForeground ={() => (
          <View style = {styles.titleContainer}>
            <Text style = {styles.imageTitle}>{route.params.item.Title}</Text>
          </View>
        )}
        renderFixedForeground={()=>(
          <Animatable.View style ={styles.navTitleView} ref={navTitleView}>
            <Text style ={styles.navTitle}>{route.params.item.Title}</Text>
          </Animatable.View>
        )}
        >
        <TriggeringView
        style={styles.section}
        onHide ={()=>navTitleView.current.fadeInUp(100)}
        onDisplay ={()=>navTitleView.current.fadeOut(100)}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style ={{flexDirection:'row'}}>
              <Ionicons name="ios-information-circle" size={26} color="#3498DB" />
              <Text style={[styles.title,{marginLeft:10,fontWeight:'600'}]}>
                OverView
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Entypo name="star" size={19} color="#FDCC0D"/>
              <Text style={{marginHorizontal: 2,fontSize:13,fontWeight:'700'}}>{route.params.item.Rating}</Text>
              <Text style={{fontSize:12,fontWeight:'300'}}> (23)</Text>
            </View>
          </View>
        </TriggeringView>
        <View style ={[styles.section,styles.sectionLarge]}>
        <Text style ={styles.sectionContent}>{route.params.item.Content}</Text>
        </View>
        <View style={[styles.section,{flexDirection:'row'}]}>
            <MaterialIcons name="payment" size={27} color="#3498DB" />
            <Text style={[styles.title,{marginLeft:10,fontWeight:'600'}]}>
              Order Product
            </Text>
        </View>
        <View style = {[styles.section,{flex:1}]}>
          <View style ={{flexDirection:'row'}}>
            <View style ={{flexDirection:'row'}}>
            {btndelete(quatity)}
            <Text
            paddingLeft = {4}
            paddingRight = {4}
            style ={{marginLeft:'16%',width:40,fontSize:18,marginTop:6,color:'#DC7633'}}
            >
              {quatity}
            </Text>
            <TouchableOpacity style = {{marginLeft:'4%'}} onPress ={_Addproduct}>
              <Ionicons name="ios-add-circle" size={36} color="#3498DB" />
            </TouchableOpacity>
            </View>
            <TouchableOpacity 
            onPress ={() => {addtocast(route.params.item.FoodId,quatity);setOpen(true)}}
            style = {{flex:1,flexDirection:'row',marginLeft:'8%',borderWidth:2.1,borderRadius:50,alignItems:'center',borderColor:'#52BE80'}}>
              <MaterialIcons name="add-shopping-cart" size={19} color="#52BE80" style ={{marginLeft:24,marginRight:4}}/>
              <Text style ={{color:'#52BE80',fontSize:14}}>Comfirm</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flex:1,alignItems:'flex-end', marginTop:30,marginHorizontal:3}}>
            <View style ={{flexDirection:'row'}}>
              <MaterialIcons name="attach-money" size={25} color="#F4D03F" />
              <Text style ={{fontSize:20,fontWeight:'400'}}> Total: </Text>
              <Text style ={{fontSize:17,fontWeight:'400',marginTop:2}}> {price} Đồng</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section,{flexDirection:'row'}]}>
            <Ionicons name="ios-pricetags" size={27} color="#3498DB" style ={{marginLeft:6}}/>
            <Text style={[styles.title,{marginLeft:14,fontWeight:'600'}]}>
               Tag
            </Text>
        </View>
        <View style ={[styles.section,{flex:1}]}>
          <View style ={{flexDirection:'row',height:30,alignSelf:'center',width:'90%',alignItems:'center'}}>
            <View style ={{paddingLeft:10,paddingRight:10,paddingTop:6,paddingBottom:6,borderRadius:50,backgroundColor:'#5DADE2'}}>
              <Text style={{fontSize:12,color:'white'}}>#{route.params.item.Title}</Text>
            </View>
            <View style ={{paddingLeft:10,paddingRight:10,paddingTop:6,paddingBottom:6,borderRadius:50,backgroundColor:'#5DADE2',marginLeft:10}}>
              <Text style={{fontSize:12,color:'white'}}>#{route.params.item.Title}</Text>
            </View>
            <View style ={{paddingLeft:10,paddingRight:10,paddingTop:6,paddingBottom:6,borderRadius:50,backgroundColor:'#5DADE2',marginLeft:10}}>
              <Text style={{fontSize:12,color:'white'}}>#{route.params.item.Title}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section,{flexDirection:'row'}]}>
            <Ionicons name="md-map" size={27} color="#3498DB" style ={{marginLeft:10}}/>
            <Text style={[styles.title,{marginLeft:14,fontWeight:'600'}]}>
               Address Product
            </Text>
        </View>
        <View style = {{flex:1,height:300,width:"95%",borderWidth:1,alignSelf:'center',marginTop:20}}>
            <MapView 
            provider={PROVIDER_GOOGLE}
            style ={{flex:1}}
            region ={{
              latitude:10.86829476120890,
              longitude:106.6931043078843,
              latitudeDelta:0.00864195044303443,
              longitudeDelta:0.000142817690068
            }}>
            <MapView.Marker
            coordinate ={{
              latitude:10.868294761208908,
              longitude:106.69310430788435,
            }}
            a
            title={route.params.item.title}
            description={"description"}
            />
            </MapView>
        </View>
        </HeaderImageScrollView>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 350,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:40,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 150,
  },
});
export default Detail;