import UserActionTypes from "./user.types";

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: "userCredentials",
});
