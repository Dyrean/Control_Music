import { IRoom } from "../../types/room";
import RoomActionTypes from "./room.actiontypes";
import {
  FetchRoomFailure,
  FetchRoomStart,
  FetchRoomSuccess,
} from "./room.types";

export const fetchRoomStart = (roomCode: string): FetchRoomStart => ({
  type: RoomActionTypes.FETCH_ROOM_START,
  payload: roomCode,
});

export const fetchRoomSuccess = (room: IRoom): FetchRoomSuccess => ({
  type: RoomActionTypes.FETCH_ROOM_SUCCESS,
  payload: room,
});

export const fetchRoomFailure = (error: string): FetchRoomFailure => ({
  type: RoomActionTypes.FETCH_ROOM_FAILURE,
  payload: error,
});
