import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={style.menuContainer}>
      <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate('Courses')}>
        {/* <Text style={style.textStyle}>Course</Text> */}
        <Image
          style={style.iconStyle}
          source={require('./Images/courses.png')}
        />
        {/* <Image
          style={style.iconStyle}
          source={{
            uri: 'https://www.flaticon.com/free-icons/course',
          }}
        /> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate('Users')}>
        {/* <Text style={style.textStyle}>UserData</Text> */}
        <Image style={style.people} source={require('./Images/people.png')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate('Contact')}>
        {/* <Text style={style.textStyle}>Contact</Text> */}
        <Image
          style={style.iconStyle}
          source={require('./Images/contact.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate('About')}>
        {/* <Text style={style.textStyle}>About</Text> */}
        <Image
          style={style.iconStyle}
          source={require('./Images/userdata.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textStyle: {
    color: '#000',
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 'bold',
  },
  iconStyle: {
    height: 25,
    // width: '60%',
    width: 50,
    aspectRatio: 1,
  },
  people: {
    height: 28,
    width: 50,
    aspectRatio: 1,
  },
});

export default Menu;
