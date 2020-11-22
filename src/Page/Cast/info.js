import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet ,Button} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
export default function Info() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading,setLoading] = useState(true)
  const navigation = useNavigation();
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
      <View style={{flex:1,flexDirection:'column'}}>
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
          <View >
          <Input
            placeholder='Your Name'
          />
          </View>
        <Input
          value ='Ngày Đặt Hàng'
        />
        <Input
          placeholder='Ngày Nhận Hàng'
        />
        <Input
          placeholder='Ghi Chú'
        />
        </View>
        <View style ={{width:"90%",alignSelf:'center',marginTop:20,backgroundColor:'#008FD4'}}>
          <Button 
          title ="Xác Nhận Đặt Hàng"
          color ="white"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});