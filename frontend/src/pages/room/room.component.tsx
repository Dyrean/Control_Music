import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { Room } from "../../types/room";

import getCookie from "../../utils/getCookie";
import { useHistory, useParams } from "react-router";

type Props = {
  roomCode: string;
  setRoomCode: Function;
  leaveRoomCallback: Function;
};

export function RoomPage({ leaveRoomCallback, setRoomCode }: Props) {
  const { roomCode } = useParams<{ roomCode?: string }>();
  const history = useHistory();
  const [room, setRoom] = useState<Room>({
    code: "",
    host: "",
    guest_can_pause: false,
    votes_to_skip: 2,
    created_at: "",
    is_host: false,
  });
  const { code, guest_can_pause, votes_to_skip, is_host } = room;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        leaveRoomCallback();
        history.push("/");
      } else {
        const data = await response.json();
        setRoom(data);
      }
    };
    fetchData();
  }, [roomCode]);

  const leaveButton = () => {
    const csrftoken = getCookie("csrftoken") as string;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
    };
    fetch("/api/leave-room", requestOptions)
      .then((_response) => {
        leaveRoomCallback();
        history.push("/");
      })
      .catch((error) => {
        console.log("Error " + error.message);
      });
  };
  return (
    <Grid container alignItems="center" direction="column" spacing="2">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" color="secondary">
          Code: {code}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Votes: {votes_to_skip}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Guest can pause?: {guest_can_pause ? "Yes" : "No"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Host: {is_host ? "Yes" : "No"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={leaveButton}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomPage;
