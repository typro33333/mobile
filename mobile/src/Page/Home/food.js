import React from 'react';
import { View,Button,StyleSheet, Image ,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Food = () =>  {
  const navigation = useNavigation();

    return (
      <ScrollView>
      <View style={styles.container}>
        <View style ={styles.container_slider}>
          <Swiper autoplay={true} horizontal={false} height={200}>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../assets/image_1.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../assets/image_2.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../assets/image_3.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
          </Swiper>
        </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity 
        style={styles.categoryBtn} 
        onPress = {()=> navigation.navigate('Detail')}>
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../assets/food.png')}
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
            source ={require('../../../assets/food_1.png')}
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
            source ={require('../../../assets/fast-food-color.png')}
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
            source ={require('../../../assets/food_2.png')}
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
            source ={require('../../../assets/soft-drink.png')}
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
            source ={require('../../../assets/food_4.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Cakes</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style ={{alignSelf:'center',marginTop:15}}>
      <Text>
        _____________________________________
      </Text>
    </View>
    <View style = {styles.containerToprecent}>
      <Text style = {styles.txtrecent}>Top recent</Text>
    </View>
    <View style = {styles.containerCardfood}>
        <View style = {{flexDirection:'row',width:260}}>
          <Image 
          source= {require('../../../assets/image_1.jpg')}
          resizeMode ="cover"
          style = {styles.cardImage}
          />
          <Text style ={styles.txtCard}>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('Detail')}
            >
              <Text style = {styles.titleCard}>
              Tiramisu, Italy
              </Text>
            </TouchableOpacity>
            <Text>
              {"\n"}
              - Tiramisu là loại bánh ngọt tráng miệng vị cà phê rất nổi tiếng của Italy bột cacao...
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
    );
}

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
    alignSelf:'center'
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
    width: '90%',
    marginTop: 15,
    marginBottom: 10,
    marginLeft:40
  },
  categoryBtn: {
    width:100,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
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
    marginTop:15,
    marginLeft:30
  },
  txtrecent:{
    fontSize:28,
    fontWeight:'700',
    fontFamily:"Cochin"
  },
  containerCardfood:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center',
    width:'90%',
    height:130,
  },
  cardImage:{
    height:100,
    width:100,
    borderRadius:10
  },
  txtCard:{
    marginLeft:14,
  },
  titleCard:{
    fontFamily:'Cochin',
    fontSize:20,
    fontWeight:'500'
  }
})

export default Food;

