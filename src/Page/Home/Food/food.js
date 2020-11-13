import React, { useEffect } from 'react';
import { 
  View,
  Button,
  StyleSheet, 
  Image ,
  Text ,
  ScrollView ,
  TouchableOpacity,
  RefreshControl
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons'; 

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Food = () =>  {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <View style ={{marginLeft:10}}>
            <Icon.Button 
            name="ios-search"
            size = {25}
            color="#333"
            backgroundColor="#fff"
            onPress={()=>navigation.navigate('SearchFood')}
            />
        </View>
    ),
  })},[navigation])
  

  const Card = ({item,index}) => {
    return(
            <View style = {{flex:1,
            flexDirection:'row',
            width:"90%",
            alignSelf:'center',
            marginTop:10,
            backgroundColor:"#FFF",
            borderRadius:8
            }}>
              <Image 
              key = {index}
              source= {item.image}
              resizeMode ="cover"
              style = {styles.cardImage}
              />
              <View style = {{flex:1,flexDirection:'collum',marginLeft:8}}>
                <TouchableOpacity 
                onPress = {() => navigation.navigate('Detail')}
                style = {{flexDirection:'row',width:"100%"}}
                >
                  <Text style = {styles.titleCard}>
                  {item.titleCard}
                  </Text>
                </TouchableOpacity>
                <Entypo name="star" size={18} color="#FDCC0D"/>
                <Text>
                {item.content}
                </Text>
              </View>
            </View>
    )
  }

    return (
    <ScrollView 
    style={styles.container}
    refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
        <View style ={styles.container_slider}>
          <Swiper autoplay={true} horizontal={false} height={200}>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../../assets/image_1.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../../assets/image_2.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../../assets/image_3.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
          </Swiper>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableOpacity 
          style={styles.categoryBtn} 
          onPress = {()=> navigation.navigate('ListFood')}>
            <View style={styles.categoryIcon}>
              <Image 
              source ={require('../../../../assets/food.png')}
              resizeMode="cover"
              style ={styles.iconsize}
              />
            </View>
            <Text style ={styles.categoryBtnTxt}>Restaurent</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.categoryBtn,{marginLeft:20}]}
          onPress = {()=> navigation.navigate('Detail')}
          >
            <View style={styles.categoryIcon}>
              <Image 
              source ={require('../../../../assets/food_1.png')}
              resizeMode="cover"
              style ={styles.iconsize}
              />
            </View>
            <Text style ={styles.categoryBtnTxt}>Classic</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.categoryBtn,{marginLeft:20}]}
          onPress = {()=> navigation.navigate('Detail')}
          >
            <View style={styles.categoryIcon}>
              <Image 
              source ={require('../../../../assets/fast-food-color.png')}
              resizeMode="cover"
              style ={styles.iconsize}
              />
            </View>
            <Text style ={styles.categoryBtnTxt}>F-Food</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
        <TouchableOpacity 
        style={styles.categoryBtn}
        onPress = {()=> navigation.navigate('Detail')}
        >
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../../assets/food_2.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Fruits</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.categoryBtn,{marginLeft:20}]}
        onPress = {()=> navigation.navigate('Detail')}
        >
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../../assets/soft-drink.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Drinks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.categoryBtn,{marginLeft:20}]}
        onPress = {()=> navigation.navigate('Detail')}
        >
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../../assets/food_4.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Cakes</Text>
        </TouchableOpacity>
      </View>
        <View style ={{alignSelf:'center',marginTop:15,justifyContent:'center'}}>
          <Text>
            _____________________________________
          </Text>
        </View>
        <View style = {styles.containerToprecent}>
          <Text style = {styles.txtrecent}>Top recent</Text>
        </View>
      <FlatList 
      data = {data}
      renderItem = {Card}
      keyExtractor={(i,k) => k.toString()}
      />
    </ScrollView>
    );
}

const data = [
{
  id:1,
  image:require('../../../../assets/image_1.jpg'), 
  titleCard:'Tiramisu', 
  content: 'Tiramisu là loại bánh ngọt tráng miệng vị cà phê rất nổi tiếng của Italy bột cacao...',
  rating:3.4
},
{
  id:2,
  image:require('../../../../assets/image_5.jpg'), 
  titleCard:'Coffee Cake', 
  content: 'Coffee Cake là loại bánh ngọt tráng miệng vị cà phê rất nổi tiếng của American bột cacao...',
  rating:4.4
},
{
  id:3,
  image:require('../../../../assets/image_4.jpg'), 
  titleCard:'Phở', 
  content: '- Phở or pho is a Vietnamese soup consisting of broth, rice noodles, herbs, and meat.',
  rating:2.7
}
];



const styles = StyleSheet.create({
  container:{
    flex:1
  },
  container_slider:{
    width:"90%",
    justifyContent:'center',
    marginTop:10,
    height:200,
    borderRadius:8,
    alignSelf:'center',
    borderWidth:0.5,
  },
  slide:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'transparent',
    borderRadius:8
  },
  slideImage:{
    width:'100%',
    height:'100%',
    borderRadius:8,
    alignSelf:'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    width: '90%',
    marginTop: 15,
    marginBottom: 10,
    alignSelf:'center'
  },
  categoryBtn: {
    width:100,
    justifyContent: 'center',
  },
  categoryIcon: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  categoryBtnTxt: {
    marginTop: 7,
    color: 'black',
    alignSelf:'center',
    fontWeight:'500',
    fontSize:13,
    fontFamily:'Cochin'
  },
  iconsize:{
    width:40,
    height:40,
  },
  containerToprecent:{
    alignSelf:'center',
    width:"90%",
    marginTop:15,
  },
  txtrecent:{
    fontSize:28,
    fontWeight:'700',
    fontFamily:"Cochin"
  },
  containerCardfood:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:10,
  },
  cardImage:{
    height:110,
    width:110,
    justifyContent:'center',
    borderRadius:8
  },
  txtCard:{
    marginLeft:14,
    marginTop:8,
    justifyContent:'center',
    alignSelf:'center',
  },
  titleCard:{
    fontFamily:'Cochin',
    fontSize:20,
    fontWeight:'500',
    justifyContent:'center'
  }
})

export default Food;

