import React, { useState, useEffect } from 'react';
import {Image, View, Platform,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [base64,setBase64] = useState();

  const Uploadfile = async(imageurl)  => {
    const url = 'http://tdtsv.ddns.net:8000/UploadIMG';
    const res = await axios.post(url,JSON.parse({file:(imageurl)}))
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
      }
    });
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
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality:0,
      aspect:[2,2],
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setBase64(result.base64);
    };
  }
  console.log(image)
  return (
    <View style={{ flex: 1}}>
      <TouchableOpacity 
      onPress ={pickImage}
      style ={{alignSelf:'center',height:300,width:400}}>
      {image && 
        <Image 
        source={{ uri: image }} style={{ width:400, height: 300 }}
        resizeMode ="cover"
        />}
      </TouchableOpacity>
      <TouchableOpacity 
      style ={{}}
      >
        <View style ={{height:200,width:200,borderWidth:1}}>
          <Image 
          source = {{uri:'data:image/png;base64,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'}}
          style ={{height:200,width:200}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress ={()=>Uploadfile(image)}>
        <View>
          <Text>Upload image</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}