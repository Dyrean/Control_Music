import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import getCookie from "../../utils/getCookie";
import { useHistory } from "react-router";

interface RoomEntry {
  roomCode: string;
  error: {
    hasError: boolean;
    message: string;
  };
}

const initial_state = {
  roomCode: "",
  error: {
    hasError: false,
    message: "",
  },
};

const RoomJoinPage = () => {
  const [roomEntry, setRoomEntry] = useState<RoomEntry>(initial_state);
  const history = useHistory();
  const {
    roomCode,
    error: { hasError, message },
  } = roomEntry;
  const handleTextFieldChange = (e: { target: { value: any } }) => {
    setRoomEntry({ ...roomEntry, roomCode: e.target.value });
  };
  const handleEnterRoom = () => {
    const csrftoken = getCookie("csrftoken") as string;
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    };
    axios
      .post("/api/join-room", { code: roomCode }, { headers })
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          setRoomEntry({
            ...roomEntry,
            error: { message: "", hasError: false },
          });
          history.push(`/room/${roomCode}`);
        } else {
          setRoomEntry({
            ...roomEntry,
            error: { message: "Room not found.", hasError: true },
          });
        }
      })
      .catch((error) => {
        setRoomEntry({
          ...roomEntry,
          error: { message: error.message, hasError: true },
        });
      });
  };
  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={hasError}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={message}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleEnterRoom}>
          Enter Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
