import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Page1 from './Components/Page1';
import DrawerCompo from './Components/DrawerCompo';
import TabbNavigation from './Components/TabbNavigation';
import TTNavigator from './Components/TTNavigator';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="DrawerCompo" component={DrawerCompo} />
        <Stack.Screen name="TabbNavigation" component={TabbNavigation} />
        <Stack.Screen name="TTNavigator" component={TTNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
