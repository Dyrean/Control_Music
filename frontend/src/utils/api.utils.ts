import axios from "axios";
import getCookie from "./getCookie";

const csrftoken = getCookie("csrftoken") as string;
const headers = {
  "Content-Type": "application/json",
  "X-CSRFToken": csrftoken,
  validateStatus: (status: number) => {
    return status >= 200 && status < 500;
  },
};

type createRoom = {
  guest_can_pause: boolean;
  votes_to_skip: number;
};

export const joinRoomAPI = async (roomCode: string) => {
  return await axios.post("api/join-room", { code: roomCode }, { headers });
};

export const leaveRoomAPI = async () => {
  return await axios.post("/api/leave-room", {}, { headers });
};

export const getRoomAPI = async (roomCode: string) => {
  return await axios.get(`/api/get-room?code=${roomCode}`, { headers });
};

export const createRoomAPI = async (room: createRoom) => {
  return await axios.post("/api/create-room", room, { headers });
};
