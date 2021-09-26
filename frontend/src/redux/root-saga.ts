import { all, call } from "redux-saga/effects";

import { roomSagas } from "./room/room.sagas";

export default function* rootSaga() {
  yield all([call(roomSagas)]);
}
