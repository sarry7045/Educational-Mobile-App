import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CourseAPI from './CoursAPI';

const Course = () => {
  const courseCard = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.courseContainer}>
          <View>
            <Image
              style={styles.cardImage}
              source={item.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.mainHeader}>{item.title}</Text>

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('CourseDetails', {
                  courseId: item.id,
                })
              }>
              <Text style={styles.buttonText}> course Details </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={CourseAPI}
      renderItem={courseCard}
    />
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.1,
  },
  mainContainer: {
    paddingHorizontal: 25,
  },
  courseContainer: {
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    textAlign: 'center',
    borderRadius: 7,
    shadowColor: 'grey',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    marginVertical: 30,
  },
  mainHeader: {
    fontSize: 20,
    color: '#344055',
    textTransform: 'uppercase',
    // fontWeight: 500,
    paddingBottom: 13,
    textAlign: 'center',
    fontFamily: 'Nunito_600SemiBold',
  },
  description: {
    textAlign: 'left',
    fontFamily: 'JosefinSans_400Regular',
    paddingBottom: 27,
    lineHeight: 20,
    fontSize: 15.5,
    color: '#7d7d7d',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#6254F3',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'JosefinSans_500Medium',
    textTransform: 'capitalize',
  },
});

export default Course;
