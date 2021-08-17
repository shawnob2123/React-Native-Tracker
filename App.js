import React, { forwardRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="Signin" component={SigninScreen} />
  </AuthStack.Navigator>
);

const TrackListStack = createStackNavigator();

export const TrackList = () => (
  <TrackListStack.Navigator>
    <TrackListStack.Screen name="TrackList" component={TrackListScreen} />
    <TrackListStack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </TrackListStack.Navigator>
);

const AppTabStack = createBottomTabNavigator();

export const AppTabScreen = () => (
  <AppTabStack.Navigator>
    <AppTabStack.Screen name="TrackList" component={TrackList} />
    <AppTabStack.Screen name="TrackCreate" component={TrackCreateScreen} />
    <AppTabStack.Screen name="Account" component={AccountScreen} />
  </AppTabStack.Navigator>
);

export const App = () => {
  const userToken = " ";
  return (
    <NavigationContainer>
      {userToken ? <AuthStackScreen /> : <AppTabScreen />}
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App
        innerRef={(navigator) => {
          setNavigator(navigator);
          // func that gets called with the object to let us navigate around - assigns to navigator var in navRef
        }}
      />
    </AuthProvider>
  );
};
