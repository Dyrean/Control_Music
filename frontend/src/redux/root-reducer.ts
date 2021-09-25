import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
// import roomReducer from "./room/room.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["room"],
};

const rootReducer = combineReducers({
  user: userReducer,
  //   room: roomReducer,
});

export default persistReducer(persistConfig, rootReducer);
