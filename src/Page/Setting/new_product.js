import React, { useState, useEffect } from 'react';
import {Image, View, Platform,Text, ScrollView ,KeyboardAvoidingView,ImageBackground,StatusBar,Button,ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import {Input} from 'react-native-elements';
import { AntDesign,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { Dialog } from 'react-native-simple-dialogs';
import { FlatList } from 'react-native-gesture-handler';
export default function ImagePickerExample() {
  const navigation = useNavigation();
  const [plholder,setPlhoder] = useState();
  const [image, setImage] = useState(null);
  const [base64,setBase64] = useState();
  const [trigger,setTrigger] = useState(false);
  const [typefood,setTypefood] = useState();
  const [rating,setRating] = useState(3);
  const [content,setContent] = useState();
  const [price,setPrice]=useState();
  const [title,setTitle] =useState()
  const [tag,setTag] = useState();
  const [open,setOpen] = React.useState(false);
  const [loading,setLoading] = useState(false)
  const [error,setError] = React.useState(false);
  const [type,setType] =useState([
    {id:1,active:false},
    {id:2,active:false},
    {id:3,active:false},
    {id:4,active:false},
    {id:5,active:false},
    {id:6,active:false}
  ]);
  const Uploadfile = async(base64,typefood,rating,price,title,tag,content)  => {
    setOpen(true)
    setLoading(true);
    const url = 'http://tdtsv.ddns.net:8000/food/addNewFood';
    const stringdata = ("data:image/png;base64,"+base64);
    const data = {
      file:stringdata,
      FoodType:typefood,
      Rating:rating,
      Price:price,
      Title:title,
      TagContent:tag,
      Content:content
    }
    const res = await fetch(url,{
      method:'POST',
      body:JSON.stringify(data)
    }).then(res => {
      console.log(res.status)
      if(res.status === 200){
        setLoading(false)
        setOpen(true);
      }
      else if(res.status === 422){

      }
    })
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality:1,
      aspect:[3,4],
      base64:true
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setBase64(result.base64);
      setPlhoder(true)
    };
  }
  const click = (id) => {
    for(var i =0;i<type.length;i++){
      type[i].active=false
    }
    for(var i =0;i<type.length;i++){
      if(id === type[i].id){
        type[i].active=true
      }
    }
    setTrigger(!trigger)
  }

  const remove = (rating) => {
    if(rating === 1){
      return(
        <TouchableOpacity>
          <Ionicons name="ios-remove-circle" size={30} color="#D5D8DC" />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity
        onPress = {()=>{
          setRating(rating-1)
        }}>
          <Ionicons name="ios-remove-circle" size={30} color="#609FFF" />
        </TouchableOpacity>
      )
    }
  }
  const add = (rating) => {
    if(rating===5){
      return(
        <View>
          <Ionicons name="ios-add-circle" size={30} color="#D5D8DC" />
        </View>
      )
    }else{
      return(
        <TouchableOpacity
        onPress = {()=>{
          setRating(rating+1)
        }}
        >
          <Ionicons name="ios-add-circle" size={30} color="#609FFF" />
        </TouchableOpacity>
      )
    }
  }

  const starRating = (rating) => {
    let arr = []
    for(var i =0;i<rating;i++){
      arr.push(<Entypo name="star" size={24} color="#FDCC0D" key={i} />)
    }
    return(
      <View style ={{marginLeft:"14%",flexDirection:'row'}}>
        {arr}
      </View>
    )
  }

  const loadingbtn = (loading) => {
    console.log(loading)
    if(loading === true){
      return 
    }else if(loading === false){
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <View style ={{margin:14}}>
                <Button title ="Done" onPress ={() =>{setOpen(false);navigation.navigate('Profile')}}/>
            </View>
        </View>
    }
  }

  return (
    <View style={{ flex:1,backgroundColor:'#FFF'}}>
      <StatusBar barStyle='dark-content'/>
      <Dialog
        visible={open}
        title="Comfirm"
        onTouchOutside={() => setOpen(false)} 
        buttons = {loading? <View></View>:<View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <View style ={{margin:14}}>
            <Button title ="Done" onPress ={() =>{setOpen(false);navigation.navigate('Profile')}}/>
        </View>
      </View>}
        >   
          {loading? <ActivityIndicator size="small" color="#0000ff"/>:<View style ={{alignSelf:'center'}}>
                <View style= {{flexDirection:'row'}}>
                    <Text style ={{marginLeft:4}}>Add new product complete!!</Text>
                </View>
            </View>}
            
      </Dialog>
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset = {Platform.OS === 'ios' ? 100 : 0}
      style ={{flex:1}}
      >
      <ScrollView>
      <TouchableOpacity 
      onPress ={pickImage}
      style ={{alignSelf:'center',height:300,width:380,marginTop:10,backgroundColor:'#FFF'}}>
      {plholder?
        <View>
          <ImageBackground 
          source={{ uri: image }} style={{ width:380, height: 300 }}
          resizeMode ="cover"
          />
        </View>
      :
      <View>
        <View style ={{position:'absolute',zIndex:999,top: 0,left: 0,right: 0,bottom: 0,justifyContent: 'center', alignItems: 'center'}}>
          <View style ={{flexDirection:'row',width:180,justifyContent:'center',alignItems:'center',height:34,borderRadius:100,backgroundColor:'#72B3FF'}}>
            <AntDesign name="upload" size={20} color="#FFF" />
            <Text style ={{color:'#FFF',marginLeft:6}}>Upload Image</Text>
          </View>
        </View>
        <ImageBackground
        source = {require('../../../assets/upload_1.jpg')}
        resizeMode = "cover"
        style ={{height:300,width:380,resizeMode:'cover'}}
        imageStyle = {{opacity:0.4}}
        />
      </View>}
      </TouchableOpacity>
      <View style ={{marginTop:20}}>
        <Input
          onChangeText = {(text)=>setTitle(text)}
          label = 'Title'
          placeholder='123456...'
          leftIcon ={<MaterialCommunityIcons name="format-title" size={24} color="black" />}
        />
      </View>
      <View style ={{marginTop:8}}>
        <View style ={{flexDirection:'column'}}>
          <View style ={{flexDirection:'row',alignSelf:'center',marginBottom:15}}>
            <MaterialCommunityIcons name="food" size={22} color="black" />
            <Text style={{fontSize:18,fontWeight:'600',marginLeft:3}}>Food Type</Text>
          </View>
          <View style ={{flexDirection:'column'}}>
            <View style ={{flexDirection:"row",alignItems:'center',justifyContent:'center',marginBottom:10}}>
              {type[0].active?
                <TouchableOpacity
                style ={{backgroundColor:'#76D565',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}
                >
                  <Text style={{color:'#FFF',fontSize:13}}>Restaurant</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                onPress = {()=>{click(1),setTypefood('restaurant')}}
                style ={{backgroundColor:'#609FFF',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}
                >
                  <Text style={{color:'#FFF',fontSize:13}}>Restaurant</Text>
                </TouchableOpacity>
              }
              {type[1].active?
              <TouchableOpacity
              style ={{backgroundColor:'#76D565',marginLeft:30,marginRight:30,borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>Classic</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
              onPress = {()=>{click(2),setTypefood('classic')}}
              style ={{backgroundColor:'#609FFF',marginLeft:30,marginRight:30,borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>Classic</Text>
              </TouchableOpacity>
              }
              {type[2].active?
              <TouchableOpacity
              style ={{backgroundColor:'#76D565',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>F-Food</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
              onPress = {()=>{click(3);setTypefood('fastfood')}}
              style ={{backgroundColor:'#609FFF',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>F-Food</Text>
              </TouchableOpacity>
              }
            </View>
            <View style ={{flexDirection:"row",alignItems:'center',justifyContent:'center',marginBottom:10}}>
              {type[3].active?
              <TouchableOpacity
              style ={{backgroundColor:'#76D565',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}
              >
                <Text style={{color:'#FFF',fontSize:13}}>Fruits</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
              onPress = {()=>{click(4);setTypefood('fruits')}}
              style ={{backgroundColor:'#609FFF',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}
              >
                <Text style={{color:'#FFF',fontSize:13}}>Fruits</Text>
              </TouchableOpacity>
              }
              {type[4].active?
              <TouchableOpacity
              style ={{backgroundColor:'#76D565',marginLeft:30,marginRight:30,borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>Drinks</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
              onPress = {()=>{click(5);setTypefood('drinks')}}
              style ={{backgroundColor:'#609FFF',marginLeft:30,marginRight:30,borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>Drinks</Text>
              </TouchableOpacity>
              }
              {type[5].active?
              <TouchableOpacity
              style ={{backgroundColor:'#76D565',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>Cakes</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
              onPress = {()=>{click(6);setTypefood('Cakes')}}
              style ={{backgroundColor:'#609FFF',borderRadius:100,width:100,alignItems:'center',height:30,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:13}}>Cakes</Text>
              </TouchableOpacity>
              }
            </View>
          </View>
        </View>
      </View>
      <View style ={{marginTop:20}}>
        <Input
          onChangeText = {(text)=>setPrice(text)}
          label = 'Price'
          placeholder='1234567890...'
          leftIcon ={<MaterialCommunityIcons name="cash-usd" size={24} color="black" />}
        />
      </View>
      <View style ={{marginTop:10,flexDirection:'column'}}>
        <View style ={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
          <MaterialCommunityIcons name="google-analytics" size={20} color="black"/>
          <Text style ={{fontSize:18,fontWeight:'500',marginLeft:4}}>Rating</Text>
        </View>
        <View style ={{flexDirection:'row',justifyContent:'space-between',marginTop:16}}>
          {starRating(rating)}
          <View style ={{marginRight:40,width:130}}>
            <View style ={{flexDirection:'row'}}>
              {remove(rating)}
              <View style ={{marginLeft:30,marginRight:30}}>
                <Text style={{fontSize:22}}>{rating}</Text>
              </View>
              {add(rating)}
            </View>
          </View>
        </View>
      </View>
      <View style ={{marginTop:20}}>
        <Input
          onChangeText = {(text)=>setTag(text)}
          label = '#Tag'
          placeholder='#food,sugar,...'
          leftIcon ={<AntDesign name="tago" size={24} color="black" />}
        />
      </View>
      <View style ={{marginTop:10}}>
        <Input
          onChangeText = {(text)=>setContent(text)}
          label = 'Content'
          placeholder='Abcxyz...'
          leftIcon ={<FontAwesome5 name="edit" size={24} color="black" />}
        />
      </View>
      {plholder?
      <View style ={{alignSelf:'center',width:'93%',backgroundColor:'#458CFF'}}>
        <TouchableOpacity
        style ={{height:40,justifyContent:'center',alignItems:'center'}}
        onPress ={()=>Uploadfile(base64,typefood,rating,price,title,tag,content)}>
            <Text style ={{color:'#FFF',fontSize:15.5,fontWeight:'500'}}>Add New Food</Text>
        </TouchableOpacity>
      </View>
      :
      <View style ={{alignSelf:'center',width:'93%',backgroundColor:'#B3B3B3'}}>
        <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
            <Text style ={{color:'#FFF',fontSize:15.5,fontWeight:'500'}}>Add New Food</Text>
        </View>
      </View>
      }
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}