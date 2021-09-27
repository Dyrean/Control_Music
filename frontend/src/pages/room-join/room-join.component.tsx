import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { AxiosResponse } from "axios";

import { joinRoomAPI } from "../../utils/api.utils";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [roomError, setRoomError] = useState({
    hasError: false,
    message: "",
  });
  const history = useHistory();

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoomCode(event.target.value);
  };

  const handleEnterRoom = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    let response: AxiosResponse<any>;
    try {
      response = await joinRoomAPI(roomCode);
      if (response.data.message === "Room Joined!") {
        history.push(`/room/${roomCode}`);
        setRoomError({ message: "", hasError: false });
      }
    } catch (error) {
      response = error.response;
      setRoomError({ message: response.data.message, hasError: true });
    }
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
          required
          error={roomError.hasError}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={roomError.message}
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
