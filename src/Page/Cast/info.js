import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet ,Button, ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation,useRoute } from "@react-navigation/native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { AntDesign,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


export default function Info() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const date = new Date();
  const datenow = (date.getDate()+"/"+(Number(date.getMonth())+1))+"/"+ date.getFullYear();
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  },[]);
  let data = null;
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    data = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00864195044303443,
      longitudeDelta: 0.000142817690068,
    }
  }
  const checked = (location) => {
    if(location === null)
      return null
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
  }

  return (
    <View style={[styles.container,{backgroundColor:"#FFF"}]}>
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset = {Platform.OS === 'ios' ? 100 : 0}
      style ={{flex:1}}
      >
      <ScrollView style={{flexDirection:'column'}}>
        {loading? 
        <View style = {{
          height:300,
          width:"95%",
          borderWidth:1,
          alignSelf:'center',
          marginTop:20,
          justifyContent:'center',
          backgroundColor:'#CDCDCD'}}
        >
            <ActivityIndicator size ="large" color="#FFF"/>
        </View>
        :
        <View style = {{height:300,width:"95%",borderWidth:1,alignSelf:'center',marginTop:20}}>
        <MapView 
            provider={PROVIDER_GOOGLE}
            style ={{flex:1}}
            region ={data}>
            <MapView.Marker
            coordinate ={checked(location)}
            title ={"This is your location"}s
            description={"Món hàng sẽ được giao vào vị trí này"}
            />
            </MapView>
        </View>}
        <View style ={{width:"90%",alignSelf:'center',marginTop:20,backgroundColor:'#FFF'}}>
        <Input
          label = 'Your Name'
          placeholder='Nguyễn Văn A'
          leftIcon ={<AntDesign name="idcard" size={24} color="black" />}
        />
        <Input
          label = 'Phone'
          placeholder='0988844440'
          leftIcon ={<MaterialCommunityIcons name="cellphone" size={24} color="black" />}
        />
        <Input
          label = 'Order Day'
          value = {datenow}
          leftIcon ={<MaterialCommunityIcons name="calendar-today" size={24} color="black" />}
        />
        <Input
          label = 'Received Date'
          placeholder={datenow}
          leftIcon = {<FontAwesome name="calendar-check-o" size={22} color="black" />}
        />
          <Input
            label = "Note"
            placeholder='Some thing...'
            leftIcon = {<SimpleLineIcons name="note" size={24} color="black" />}
          />
        </View>
        <View style ={{width:"90%",alignSelf:'center',marginTop:10,backgroundColor:'#008FD4',marginBottom:30,borderRadius:100}}>
          <View style ={{justifyContent:'center',flexDirection:'row'}}>
            <AntDesign name="shoppingcart" size={24} color="#FFF" style={{marginTop:8}}/>
            <Button 
            title ="Xác Nhận Đặt Hàng"
            color ="white"
            onPress ={()=>{}}
            />
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});