import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export interface IAppProps {
  isHost: boolean;
  room?: Room;
}
interface Room {
  code: string;
  host: string;
  guest_can_pause: boolean;
  votes_to_skip: number;
  created_at: string;
  is_host: boolean;
}

export function RoomPage({ isHost }: IAppProps) {
  const { roomCode } = useParams<{ roomCode?: string }>();
  const [room, setRoom] = useState<Room>({
    code: "",
    host: "",
    guest_can_pause: false,
    votes_to_skip: 2,
    created_at: "",
    is_host: false,
  });
  const { code, host, guest_can_pause, votes_to_skip, created_at, is_host } =
    room;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      const data = await response.json();
      setRoom(data);
    };
    fetchData();
  }, [roomCode]);
  return (
    <div>
      <h3>Code: {code}</h3>
      <h3>Host: {host}</h3>
      <h3>guest_can_pause: {guest_can_pause.toString()}</h3>
      <h3>votes_to_skip: {votes_to_skip}</h3>
      <h3>created_at: {created_at}</h3>
      <h3>is_host: {is_host.toString()}</h3>
    </div>
  );
}

export default RoomPage;
