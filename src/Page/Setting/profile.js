import * as React from 'react';
import {View,Text,StyleSheet, Image,AsyncStorage, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import {useNavigation,useRoute} from '@react-navigation/native';
export default function Profile(){
    const navigation = useNavigation();
    const route = useRoute();

    const [check,setCheck] = React.useState(false);
    const [avatar,setAvatar] = React.useState();
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        await AsyncStorage.setItem("My_image",pickerResult.uri);
        getData();
    }

    
    const getData = async () => {
        const value = await AsyncStorage.getItem('My_image');
        if(value === null){
            return setCheck(false);;
        }
        else{
            setCheck(true);
            setAvatar(value);
        }
    }

    const removeAsyncStronge = async() => {
        await AsyncStorage.removeItem('My_image');
        getData()
    }

    React.useEffect(()=>{
        getData()
    },[])
    return(
        <View style = {styles.container}>
            {check?
            <View></View>
            :
            <View style ={[styles.constainer_notice,{backgroundColor:'#FF7366'}]}>
                <View style ={styles.notice}>
                    <Ionicons 
                    name="ios-warning" 
                    size={22} 
                    color="#FDCC0D" />
                    <Text style ={{fontSize:12.5,color:'white',marginTop:3,marginLeft:8}}>
                        Please! Update your avatar, click avatar to upload !!
                    </Text>
                </View>
            </View>
            }
            <View style ={{backgroundColor:"#FFF"}}>
                <View style = {styles.container_cardprofile}>
                    <View style = {styles.cardImage}>
                        <TouchableOpacity onPress ={openImagePickerAsync}>
                        {check? 
                        <Image
                        source = {{uri:avatar}}
                        resizeMode = "cover"
                        style = {styles.image_avatar}
                        />
                        :
                        <Image
                        source = {require('../../../assets/upload.jpg')}
                        resizeMode = "cover"
                        style = {styles.image_avatar}
                        />
                        }
                        </TouchableOpacity>
                    </View>
                    <View style = {{marginLeft:14,marginTop:10,width:"70%"}}>
                        <View style ={{flexDirection:'column'}}>
                            <View style ={{flexDirection:'row'}}>
                                <Text>Thái Hoàng Thịnh</Text>
                                <TouchableOpacity 
                                onPress ={()=>{}}
                                style ={{marginLeft:10}} >
                                    <AntDesign name="edit" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop:24}}>
                                <Text>Số người the dõi: 1000</Text>
                            </View>
                            <View>
                                <Text>Số Bài Viết: 1000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style ={{flexDirection:'column',backgroundColor:'#FFF',marginTop:10}}>
                <TouchableOpacity 
                onPress = {()=>navigation.navigate('New Product')}
                style ={{borderBottomWidth:0.5,borderTopWidth:0.5}}>
                    <View 
                    style ={{margin:14}}>
                        <Text style={{fontSize:16,color:'#2478FF'}}>New Product</Text>
                    </View>
                </TouchableOpacity>
                <View style ={{borderBottomWidth:0.5}}>
                    <Button
                    title = 'Manage Post'
                    onPress = {() => navigation.navigate('New Product')}
                    />
                </View>
                <View style ={{borderBottomWidth:0.5}}>
                    <Button
                    title = 'General New Promotion%'
                    onPress = {() => navigation.navigate('New Product')}
                    />
                </View>
                <Button
                title = 'Orders not yet delivered'
                onPress = {() => navigation.navigate('New Product')}
                />
                <Button
                title = 'History Complete'
                onPress = {() => navigation.navigate('New Product')}
                />
                <Button
                title = 'Remove asyncStronge'
                onPress = {() => removeAsyncStronge('My_image')}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    constainer_notice:{
        height:30,
        justifyContent:'center'
    },
    notice:{
        flexDirection:'row',
        marginLeft:"5%"
    },
    container_cardprofile:{
        flexDirection:'row',
        height:100,
        alignSelf:'center',
        width:'95%',
    },
    cardImage:{
        justifyContent:'center',
        marginLeft:8
    },
    image_avatar: {
        height:90,
        width:90,
        borderRadius:100,
        borderWidth:0.5
    },
})