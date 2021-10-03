import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { AxiosResponse } from "axios";

import { IRoom } from "../../types/room";
import {
  leaveRoomAPI,
  getRoomAPI,
  isAuthenticatedSpotifyAPI,
  getAuthURLSpotifyAPI,
} from "../../utils/api.utils";

type Props = {
  roomCode: string;
  setRoomCode: Function;
  leaveRoomCallback: Function;
};

const RoomPage: React.FC<Props> = ({
  leaveRoomCallback,
  setRoomCode,
}: Props) => {
  const { roomCode } = useParams<{ roomCode?: string }>();
  const history = useHistory();
  const [room, setRoom] = useState<IRoom>({
    code: "",
    host: "",
    guest_can_pause: false,
    votes_to_skip: 2,
    created_at: "",
    is_host: false,
  });
  const [spotiftAuthenticated, setSpotifyAuthenticated] = useState(false);
  const { code, guest_can_pause, votes_to_skip, is_host } = room;
  useEffect(() => {
    const fetchData = async () => {
      let response: AxiosResponse<any>;
      try {
        response = await getRoomAPI(roomCode);
        if (response.status !== 200) {
          leaveRoomCallback();
          history.push("/");
        } else {
          setRoom(response.data);
          if (response.data.is_host) {
            authenticateSpotify();
          }
        }
      } catch (error) {
        response = error.response;
        leaveRoomCallback();
        history.push("/");
        console.log(response);
      }
    };
    fetchData();
  }, [roomCode]);

  const authenticateSpotify = async () => {
    let response: AxiosResponse<any>;
    try {
      response = await isAuthenticatedSpotifyAPI();
      console.log("Auth: ", response);
      setSpotifyAuthenticated(response.data.status);
      if (!response.data.status) {
        response = await getAuthURLSpotifyAPI();
        console.log("URL: ", response);
        const url = response.data.url;
        window.location.replace(url);
      }
    } catch (error) {
      response = error.response;
      console.log(response);
    }
  };

  const leaveButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let response: AxiosResponse<any>;
    try {
      response = await leaveRoomAPI();
      if (response.status === 200) {
        leaveRoomCallback();
        history.push("/");
      }
    } catch (error) {
      response = error.response;
      console.log(error);
    }
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
};

export default RoomPage;
