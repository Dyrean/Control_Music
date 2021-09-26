import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  fetchRoomSuccess,
  fetchRoomFailure,
  fetchRoomStart,
} from "./room.actions";
import RoomActionTypes from "./room.actiontypes";

const getRoom = async (roomCode: ReturnType<typeof fetchRoomStart>) => {
  const response = await axios.get(`/api/get-room?code=${roomCode}`);
  return response;
};

export function* fetchRoomAsync(roomCode: ReturnType<typeof fetchRoomStart>) {
  try {
    const response = yield call(getRoom, roomCode);
    yield put(fetchRoomSuccess(response.data));
  } catch (error) {
    yield put(fetchRoomFailure(error.message));
  }
}

export function* onFetchRoomStart() {
  yield takeLatest(RoomActionTypes.FETCH_ROOM_START, fetchRoomAsync);
}

export function* roomSagas() {
  yield all([call(onFetchRoomStart)]);
}
