import { IRoom } from "../../types/room";

export interface RoomState {
  isFetching: boolean;
  room: IRoom | null;
  error: string | null;
}

export type FetchRoomSuccess = {
  type: string;
  payload: IRoom;
};

export interface FetchRoomStart {
  type: string;
  payload: string;
}

export type FetchRoomFailure = {
  type: string;
  payload: string;
};

export type RoomActions = FetchRoomStart | FetchRoomSuccess | FetchRoomFailure;
