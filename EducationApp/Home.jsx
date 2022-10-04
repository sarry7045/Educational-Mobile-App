import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Menu from './Menu';

const Home = props => {
  return (
    <View style={style.container}>
      <View style={style.homeTop}>
        <Image
          resizeMode="contain"
          source={require('./Images/Studying.jpeg')}
          style={style.headerImage}
        />

        <Text style={style.mainHeader}>Welcome to</Text>
        <Text
          style={[
            style.mainHeader,
            {fontSize: 26, color: '#6254F3', marginTop: 0},
          ]}>
          {props.channelName}
        </Text>

        <Text style={style.paraStyle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
          eveniet, adipisicing elit. Quas, eveniet, adipisicing?
        </Text>
      </View>
      {/* <Home /> */}
      <View style={style.menuStyle}>
        <View style={style.lineStyle}></View>
        <Menu />
        <View style={[style.lineStyle, {marginVertical: 10}]}></View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  homeTop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerImage: {
    height: undefined,
    width: '100%',
    aspectRatio: 1,
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 70,
    borderRadius: 25,
  },
  mainHeader: {
    fontSize: 20,
    color: '#344055',
    textTransform: 'uppercase',
    marginTop: 60,
  },
  paraStyle: {
    textAlign: 'left',
    fontSize: 17,
    color: '#7d7d7d',
    marginTop: 30,
    paddingBottom: 50,
    lineHeight: 26,
  },
  lineStyle: {
    marginBottom: 5,
    borderWidth: 0.2,
    borderColor: 'grey',
    width: 450,
    marginLeft: -45,
  },
});

export default Home;
