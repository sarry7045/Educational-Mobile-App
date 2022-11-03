import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Course from "./Course";
import UserData from "./UserData";
import CourseDetails from "./CourseDetails";

const Stack = createNativeStackNavigator();

const EduApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen
          name="EduVert"
          options={{
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        >
          {(props) => <Home {...props} channelName={"EduVert"} />}
        </Stack.Screen>
        <Stack.Screen
          name="About"
          options={{
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
          component={About}
        />
        <Stack.Screen
          name="Contact"
          options={{
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
          component={Contact}
        />
        <Stack.Screen
          name="Courses"
          options={{
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
          component={Course}
        />
        <Stack.Screen
          name="Users"
          options={{
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
          component={UserData}
        />
        <Stack.Screen
          name="CourseDetails"
          options={{
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
          component={CourseDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default EduApp;
