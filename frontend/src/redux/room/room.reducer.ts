import RoomActionTypes from "./room.actiontypes";
import { RoomState, RoomActions } from "./room.types";

const INITIAL_STATE: RoomState = {
  isFetching: false,
  error: null,
  room: null,
};

const roomReducer = (
  state = INITIAL_STATE,
  action: { type: any; payload: { room: any; error: any } }
) => {
  switch (action.type) {
    case RoomActionTypes.FETCH_ROOM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        room: action.payload.room,
        error: null,
      };
    case RoomActionTypes.FETCH_ROOM_FAILURE:
      return {
        ...state,
        isFetching: false,
        room: null,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default roomReducer;
