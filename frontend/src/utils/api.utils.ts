import axios, { AxiosResponse } from "axios";
import getCookie from "./getCookie";

import { ISong } from "../types/room";

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

export const getUserInRoom = async () => {
  return await axios.get("/api/user-in-room", { headers });
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

export const isAuthenticatedAPI = async () => {
  return await axios.get("/spotify/is-authenticated", { headers });
};

export const getAuthURLAPI = async () => {
  return await axios.get("/spotify/get-auth-url", { headers });
};

export const getCurrentSongAPI = async (): Promise<AxiosResponse<ISong>> => {
  return await axios.get("/spotify/current-song", { headers });
};
