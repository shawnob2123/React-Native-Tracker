import CreateDataContext from "./CreateDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_errorMsg":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMsg" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    // make api request with email and Password
    // if signup, modify state and authenticate
    // if fails, send err message
    try {
      const response = await trackerAPI.post("/signup", { email, password });
      // console.log(response.data); // object w token property
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      navigate("TrackList");
    } catch (err) {
      // console.log(err.response.data);
      dispatch({ type: "add_error", payload: "Error signing up" });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    // try to signin
    //handle success and error
    try {
      const response = await trackerAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with the signin",
      });
    }
  };

const signout = (dispatch) => {
  return () => {};
};

export const { Provider, Context } = CreateDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage },
  { token: null, errorMessage: "" }
);
