import { NavigationActions } from "react-native";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(NavigationActions.navigate({ routeName, params })); // React Navigation provides an internal API -change state and change screens for users
};
