import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  PermissionsAndroid,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  Animated,
  SafeAreaView,
  Dimensions,
  Linking,
  Pressable,
  Modal,
  PixelRatio,
  RefreshControl,
  useWindowDimensions,
  ImageBackground,
  Switch,
  Share,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScrollToTop} from '@react-navigation/native';

const customStyle = StyleSheet.create({
  counter: {
    marginTop: 30,
    backgroundColor: '#28282B',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#28282B',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  modalView: {
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpace: {
    marginBottom: 100,
  },
});

const height = Dimensions.get('screen');
const width = Dimensions.get('screen');

const size = 30;
const cat = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: size,
  height: size,
};

const images = new Array(6).fill('https://reactnative.dev/img/tiny_logo.png');

const Page1 = ({navigation}) => {
  const [count, setcount] = useState(0);

  const handleIncrement = () => {
    setcount(count + 1);
  };
  const handleDecrement = () => {
    setcount(count - 1);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Toasted Message',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const fadeAnim = useRef(new Animated.Value(0).current);

  const ref = useRef(null);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
    }).start();
  };

  const supportedURL = 'https://surajyadav.vercel.app/';

  const unsupportedURL = 'slack://open?team=123456';

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  const OpenSettingsButton = ({children}) => {
    const handlePress = useCallback(async () => {
      // Open the custom settings if the app has one
      await Linking.openSettings();
    }, []);

    return <Button title={children} onPress={handlePress} />;
  };

  const SendIntentButton = ({action, extras, children}) => {
    const handlePress = useCallback(async () => {
      try {
        await Linking.sendIntent(action, extras);
      } catch (e) {
        Alert.alert(e.message);
      }
    }, [action, extras]);

    return <Button title={children} onPress={handlePress} />;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setrefreshing] = useState(false);

  const onRefresh = () => {
    setrefreshing(true);

    setTimeout(() => setrefreshing(false), 2000);
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const {width: windowWidth} = useWindowDimensions();

  const [isEnabled, setisEnabled] = useState(false);
  const toggleSwitched = () => {
    setisEnabled(prevState => !prevState);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native Test',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  function handleNavigation(screenName) {
    navigation.navigate(screenName);
  }

  const [value, setvalue] = useState('');

  const handleSubmit = () => {
    navigation.navigate('DrawerCompo', {
      value: value,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        ref={ref}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{backgroundColor: '#000'}}
          />
        }>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#28282B',
          }}>
          <Text>Hello World {count} Times.</Text>
          <View style={customStyle.counter}>
            <TouchableOpacity>
              <Button
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={handleIncrement}
                title="Increment"></Button>
            </TouchableOpacity>
          </View>
          <View style={customStyle.counter}>
            <TouchableOpacity>
              <Button onPress={handleDecrement} title="Decrement"></Button>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 50}}>
            <Image
              source={cat}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(size),
                height: PixelRatio.getPixelSizeForLayoutSize(size),
              }}></Image>
          </View>
          <View style={customStyle.counter}>
            <TextInput
              style={{
                height: 40,
                width: 180,
                margin: 10,
                borderWidth: 1,
                padding: 10,
              }}
              autoCorrect={true}
              placeholder="Enter Your Data"
              autoCapitalize={true}
              value={value}
              onChangeText={text => setvalue(text)}
              autoC></TextInput>
          </View>
          <View style={customStyle.container}>
            <Button
              title="Send Input Data to Next Page"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
        <View style={customStyle.container}>
          <Button
            title="request permissions"
            onPress={() => requestCameraPermission()}
          />
        </View>

        <View style={customStyle.container}>
          <Button title="Toggle" onPress={() => showToast()}></Button>
        </View>

        <View style={customStyle.container}>
          <ActivityIndicator size="large" color="#00ff00" animating={true} />
        </View>

        {/* <SafeAreaView style={customStyle.container}>
        <Animated.View style={customStyle.fadingContainer}>
          <Text style={{fontSize: 20}}>Fading View!</Text>
        </Animated.View>
        <View style={customStyle.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
          <Button title="Fade Out View" onPress={fadeOut} />
        </View>
      </SafeAreaView> */}

        <View style={customStyle.container}>
          <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
        </View>
        <View style={customStyle.container}>
          <OpenURLButton url={unsupportedURL}>
            Open Unsupported URL
          </OpenURLButton>
        </View>

        <View style={customStyle.container}>
          <OpenSettingsButton>Open Settings</OpenSettingsButton>
        </View>

        <View accessible={true} style={customStyle.container}>
          <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
            Power Usage Summary
          </SendIntentButton>
          <View style={customStyle.container}>
            <SendIntentButton
              action="android.settings.APP_NOTIFICATION_SETTINGS"
              extras={[
                {'android.provider.extra.APP_PACKAGE': 'com.facebook.katana'},
              ]}>
              App Notification Settings
            </SendIntentButton>
          </View>
        </View>

        <View style={customStyle.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={customStyle.modalView}>
              <Pressable
                style={[customStyle.button, customStyle.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={customStyle.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </Modal>
          <Pressable
            style={[customStyle.button, customStyle.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={customStyle.textStyle}>Show Modal</Text>
          </Pressable>
        </View>

        <View style={customStyle.container}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
              return (
                <View
                  style={{width: windowWidth, height: 250}}
                  key={imageIndex}>
                  <ImageBackground
                    source={{uri: image}}
                    style={customStyle.card}>
                    <View style={customStyle.textContainer}>
                      <Text style={customStyle.infoText}>
                        {'Image - ' + imageIndex}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
          <View style={customStyle.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[customStyle.normalDot, {width}]}
                />
              );
            })}
          </View>
        </View>

        <View style={customStyle.container}>
          <Switch
            trackColor={{false: '767577', true: '81b0ff'}}
            thumbColor={isEnabled ? 'f5dd4b' : 'f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitched}
            value={isEnabled}
          />
        </View>

        <View style={customStyle.container}>
          <Button onPress={onShare} title="Share" />
        </View>

        <View View style={customStyle.container}>
          <TouchableOpacity>
            <Button
              onPress={() => handleNavigation('DrawerCompo')}
              title="Redirect To Another Page"></Button>
          </TouchableOpacity>
        </View>

        <View View style={customStyle.container}>
          <TouchableOpacity>
            <Button
              onPress={() => handleNavigation('TabbNavigation')}
              title="Redirect Tab Navigation"></Button>
          </TouchableOpacity>
        </View>

        <View style={customStyle.container}>
          <TouchableOpacity>
            <Button
              onPress={() => handleNavigation('TTNavigator')}
              title="Redirect Top Tab Navigator"></Button>
          </TouchableOpacity>
        </View>

        <View style={customStyle.container}>
          {/* <FontAwesome5 name={'comments'} />
        <Icon name="rocket" size={30} color="Blue" /> */}
          <Ionicons name="Home" size={40} color="Green" />
        </View>

        <View style={customStyle.bottomSpace}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page1;
