import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import roomReducer from "./room/room.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["room"],
};

const rootReducer = combineReducers({
  room: roomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
