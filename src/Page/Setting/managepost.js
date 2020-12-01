import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Button, FlatList,ActivityIndicator, ScrollView,Image as ImageReact,ImageBackground, KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import { Ionicons ,MaterialIcons,AntDesign} from '@expo/vector-icons';
import {CheckBox, Image} from 'react-native-elements';
import {rating} from '../../Component/Star_rating/star';
import { Dialog } from 'react-native-simple-dialogs';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
export default function Product_place(){
    const [rawdata,setRawdata] = React.useState([]);
    const [image, setImage] = React.useState(null);
    const [open,setOpen] = React.useState(false);
    const [opendel,setOpendel] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [query,setQuery] = React.useState('');
    const [dtaEdit,setDtaEdit] =React.useState([])
    const [data,setData] = React.useState([]);
    const [checked,setChecked] = React.useState([])
    const navigation = useNavigation();
    const [comple,setComplete] = React.useState(false);
    const textInput = React.useRef(null);
    const [trigger,setTrigger] = React.useState(false);
    const [btnComfim,setbtnComfim] = React.useState(false);
    const [base64,setBase64] = React.useState(null);
    const [plholder,setPlhoder] = React.useState();
    const [ratingfood,setRatingfood] = React.useState();
    const [content,setContent] = React.useState();
    const [price,setPrice]=React.useState();
    const [title,setTitle] =React.useState()
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
    React.useEffect(()=> {
        navigation.setOptions({
            headerLeft:()=>(
                <TouchableOpacity style = {{flex:1,flexDirection:'row'}} onPress = {()=> {navigation.goBack()}}>
                    <Text style={{color:"#267EF9",marginLeft:20,marginTop:8,fontSize:18}}>Back</Text>
                </TouchableOpacity>
            ),
        })
      },[navigation]);

    React.useEffect(()=>{
        getdata();
    },[])

    const editfood = async() => {
        let image = '';
        if(base64 === null){
            image = dtaEdit.ImageUrl
        }else{
            image = base64
        }
        const data ={
            FoodId:dtaEdit.FoodId,
            ImageUrl:image,
            FoodType:dtaEdit.FoodType,
            Rating:ratingfood,
            Price:price,
            Title:title,
            Content:content
        }
        const url = "http://tdtsv.ddns.net:8000/food/editFood";
        return await fetch(url,{
            method:'POST',
            body:JSON.stringify(data)
        }).then(res => {
            console.log(res.status)
            if(res.status === 200){
                console.log(oke)
            }
        })
    }

    const deletePost = async(checked) => {
        setLoading(true);
        const url = "http://tdtsv.ddns.net:8000/food/deleteFood";
        const res = await fetch(url,{
            method:'POST',
            body:JSON.stringify(checked)
        }).then(res => {
            console.log(res.status)
            if(res.status === 200){
                getdata();
                setChecked([]);
                setLoading(false);
                setComplete(true);
                setTimeout(()=>{
                    setOpendel(false);
                    setComplete(false);
                    setbtnComfim(false)
                },3000);
            }else{
                setLoading(false);
                setbtnComfim(false);
                setComplete(false);
                console.log('request error')
            }
        })
    }

    const IndexEdit = (checked) => {
        for(var i=0;i<data.length;i++){
            if(String(data[i].FoodId) === checked[0]){
                return i;
            }
        }
    }

    const dataEdit = (index) => {
        return setDtaEdit(data[index]);
    }

    const getdata = async() => {
        const url ="http://tdtsv.ddns.net:8000/food/getAllFood";
        const res = await axios.get(url)
        const resjson = await res.data;
        resjson.forEach(element => {
            element.active = false;
        });
        setRawdata(resjson);
        setData(resjson);
    }

    const checkbox = (data,index) => {
        data[index].active = !data[index].active;
        setTrigger(!trigger);
        if(data[index].active === true){
            return checked.push(String(data[index].FoodId))
        }else if(data[index].active === false){
            return checked.splice(checked.indexOf(data[index].FoodId),1)
        }
    }

    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.Title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        });
    }

    const CardItem = ({item,index}) => {
        return(
            <View 
            style ={styles.backgroud_card} 
            onPress = {() => navigation.navigate('Detail',{item})} 
            key ={index}>
                        <View style ={styles.container_card}>
                            <View 
                            style ={{marginLeft:-8,justifyContent:'center'}}
                            >
                                <CheckBox 
                                checked ={item.active}
                                onPress = {()=> {checkbox(data,index)}}
                                />
                            </View>
                            <View style ={styles.container_image}>
                                <Image 
                                source = {{uri:item.ImageUrl}}
                                resizeMode = 'cover'
                                style ={styles.style_image}
                                PlaceholderContent ={<ActivityIndicator/>}
                                />
                            </View>
                            <View style ={{marginLeft:14,flexDirection:'column',width:"55%"}}>
                                <Text
                                numberOfLines ={1}
                                style ={{fontSize:15,fontWeight:'500'}}
                                >{item.Title}</Text>
                                <Text
                                numberOfLines = {1}
                                style = {{fontSize:12,fontWeight:'200',marginTop:10}}
                                >
                                {item.Content}
                                </Text>
                                <View style ={{marginTop:10,flexDirection:'row'}}>
                                    <MaterialIcons name="attach-money" size={19} color="#FDCC0D"/>
                                    <Text style ={{fontSize:13,fontWeight:'300'}}>{item.Price}</Text>
                                    <Text style ={{fontSize:11,fontWeight:'400',marginTop:3,marginLeft:4}}>Đồng</Text>
                                </View>
                                <View style = {{flexDirection:'row',marginTop:8,marginLeft:3}}>
                                    {rating(1)}
                                    <Text style ={{fontSize:11,fontWeight:'900',marginTop:1}}> {item.Rating} . 3.4 km</Text>
                                    <Text style ={{fontSize:11,marginTop:2,fontWeight:'200'}}> (something)</Text>
                                </View>
                            <View style ={{borderBottomColor:'black',borderBottomWidth:0.3,marginTop:10,borderColor:'#9D9F9B'}}/>
                        </View>
                    </View>
            </View>
        )
    }

    const btnDelete = (checked) => {
        if(checked.length === 0){
            return(
                <View style ={{justifyContent:'center',width:'48%',backgroundColor:'#A3A6A0',borderRadius:30,flexDirection:'row',alignItems:'center'}}>
                    <View style ={{justifyContent:'center',marginLeft:-10}}>
                        <EvilIcons name="trash" size={24} color="#FFF" />
                    </View>
                    <Text style ={{color:"#FFF",alignSelf:'center'}}>Delete</Text>
                </View>
            )
        }else{
            return(
                <TouchableOpacity 
                onPress ={()=>{setOpendel(true)}}
                style ={{justifyContent:'center',width:'48%',backgroundColor:'#F72424',borderRadius:30,flexDirection:'row',alignItems:'center'}}>
                    <View style ={{justifyContent:'center',marginLeft:-10}}>
                        <EvilIcons name="trash" size={24} color="#FFF" />
                    </View>
                    <Text style ={{color:"#FFF",alignSelf:'center'}}>Delete</Text>
                </TouchableOpacity>
            )
        }
    }

    const btnEdit = () =>{
        if(checked.length === 1){
            return(
                <TouchableOpacity 
                onPress ={()=>{setOpen(true);dataEdit(IndexEdit(checked))}}
                style ={{justifyContent:'center',width:'48%',backgroundColor:'#267EF9',borderRadius:30,flexDirection:'row',alignItems:'center'}}>
                    <Feather name="edit" size={18} color="#FFF" />
                    <Text style ={{color:'#FFF',alignSelf:'center',marginLeft:4}}>Edit</Text>
                </TouchableOpacity>
            )
        }else{
            return(
                <View style ={{justifyContent:'center',width:'48%',backgroundColor:'#A3A6A0',borderRadius:30,flexDirection:'row',alignItems:'center'}}>
                    <Feather name="edit" size={18} color="#FFF" />
                    <Text style ={{color:'#FFF',alignSelf:'center',marginLeft:4}}>Edit</Text>
                </View>
            )
        }
    }

    const search = () => {
        return(
            <View style ={{backgroundColor:"#FFF",paddingBottom:10}}>
                <View style = {styles.containerSearch}>
                        <TextInput
                        style = {styles.txtInput_Search}
                        placeholder = "Search food or something..."
                        paddingLeft ={18}
                        paddingRight={18}
                        ref = {textInput}
                        onChangeText={(text)=>{
                            if(text !== ''){
                            setQuery(text);
                            return setData(filterItems(rawdata,text));
                            }
                            else{
                                setQuery(text)
                                setData(rawdata);
                            }
                        }}
                        />
                        <TouchableOpacity 
                        style={styles.icon_Seacrch}
                        onPress = {()=> {textInput.current.focus()}}
                        >
                            <Ionicons name="ios-search" size={24} color="black"/>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }

    const load = (loading) => {
        if(loading === true){
            return(
                <View style ={{marginTop:30,marginBottom:30}}>
                        <ActivityIndicator/>
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }
    }

    React.useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    },[]);

    return(
        <View style = {styles.container}>
            <Dialog
                visible={open}
                title="Comfirm"
                onTouchOutside={() => setOpen(false)} 
                buttons = {<View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style ={{margin:14}}>
                    <Button title ="Hủy" onPress ={() =>{setOpen(false)}}/>
                </View>
                <View style ={{margin:14}}>
                    <Button title ="Thay Đổi" onPress ={() =>{editfood()}}/>
                </View>
            </View>}
                >
                <View>
                <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset = {Platform.OS === 'ios' ? 100 : 20}
                >
                <ScrollView style ={{height:400}}>
                <View style ={{alignSelf:'center',width:'100%'}}>
                    <TouchableOpacity 
                    onPress ={pickImage}
                    style ={{height:250,width:320,marginTop:10,backgroundColor:'#FFF'}}>
                    {plholder?
                        <View>
                        <ImageBackground 
                        source={{ uri: image }} style={{ height:250,width:320 }}
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
                        style ={{height:250,width:320,resizeMode:'cover'}}
                        imageStyle = {{opacity:0.4}}
                        />
                    </View>}
                    </TouchableOpacity>
                    <View style ={{marginTop:10}}>
                        <Input
                        onChangeText = {(text)=> {setTitle(text)}}
                        label = 'Title'
                        placeholder={dtaEdit.Title}
                        leftIcon ={<FontAwesome5 name="edit" size={24} color="black" />}
                        />
                    </View>
                    <View style ={{marginTop:10}}>
                        <Input
                        onChangeText = {(text)=>setRatingfood(text)}
                        label = 'Rating'
                        placeholder={dtaEdit.Rating}
                        leftIcon ={<FontAwesome5 name="edit" size={24} color="black" />}
                        />
                    </View>
                    <View style ={{marginTop:10}}>
                        <Input
                        onChangeText = {(text)=>setPrice(text)}
                        label = 'Price'
                        placeholder={dtaEdit.Price}
                        leftIcon ={<FontAwesome5 name="edit" size={24} color="black" />}
                        />
                    </View>
                    <View style ={{marginTop:10}}>
                        <Input
                        onChangeText = {(text)=>setContent(text)}
                        label = 'Content'
                        placeholder={dtaEdit.Content}
                        leftIcon ={<FontAwesome5 name="edit" size={24} color="black" />}
                        />
                    </View>
                    <View style={{marginTop:70}}>

                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView> 
                </View>
            </Dialog>
            <Dialog
                visible={opendel}
                title="Xác Nhận Xóa"
                onTouchOutside={() => setOpendel(false)} 
                buttons = {
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    {btnComfim?
                    <View></View>
                    :
                    <View style ={{margin:14}}>
                        <Button title ="Hủy" onPress ={() =>{setOpendel(false)}}/>
                    </View>
                    }
                    {btnComfim?
                    <View></View>
                    :
                    <View style ={{margin:14}}>
                        <Button title ="Xác Nhận" onPress ={() =>{deletePost(checked);setbtnComfim(true)}}/>
                    </View>}
                </View>
                }>
                <View style ={{alignSelf:'center'}}>
                    <View style= {{flexDirection:'row',justifyContent:'center'}}>
                        <ImageReact 
                        source ={require('../../../assets/warning.png')}
                        resizeMode='cover'
                        style ={{width:20,height:20,marginTop:6}}
                        />
                        <Text style ={{color:'#D64322',marginLeft:10}}>Lưu ý: Món ăn sẽ bị xóa không thể hoàn tác!!</Text>
                    </View>
                    {comple?
                    <View style ={{alignItems:'center',marginTop:30,marginBottom:30}}>
                        <Text style ={{color:'#5BB800'}}>
                            Xóa Thành Công!! Waitt...(2s)
                        </Text>
                    </View>
                    :
                    <View></View>}
                    {load(loading)}
                </View>
            </Dialog>
            {search()}
            <ScrollView style ={{alignSelf:'center',width:'98%'}}>
                <FlatList
                data = {data}
                renderItem ={CardItem}
                keyExtractor={(i,k) => k.toString()}
                />
            </ScrollView>
            <View style ={{backgroundColor:'#FFF'}}>
                <View style ={{height:40,justifyContent:'space-between',flexDirection:'row',width:'95%',alignSelf:'center',marginBottom:8,marginTop:6}}>
                    {btnDelete(checked)}
                    {btnEdit(checked)}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerSearch:{
        width:"98%",
        flexDirection:'row',
        marginTop:6,
        alignSelf:'center',
        backgroundColor:"#FFF",
        borderRadius:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.25,
        elevation: 5
    },
    txtInput_Search:{
        width:"85%",
        height:45
    },
    icon_Seacrch:{
        marginLeft:24,
        marginTop:10
    },
    backgroud_card:{
        backgroundColor:"#FFF"
    },
    container_card:{
        height:100,
        flexDirection:'row',
        margin:10,
        alignSelf:'center',
        width:'100%'
    },
    container_image:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2.75,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 2,
        marginLeft:-12
    },
    style_image:{
        height:100,
        width:120,
        borderRadius:8
    },
})