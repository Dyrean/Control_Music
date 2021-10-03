import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router";

import { IRoom, ISong, EmptySong, EmptyRoom } from "../../types/room";
import {
  leaveRoomAPI,
  getRoomAPI,
  isAuthenticatedAPI,
  getAuthURLAPI,
  getCurrentSongAPI,
} from "../../utils/api.utils";

import MusicPlayer from "../../components/music-player/music-player.component";

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
  const [room, setRoom] = useState<IRoom>(EmptyRoom);
  const [song, setSong] = useState<ISong>(EmptySong);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

  const { code, guest_can_pause, votes_to_skip, is_host } = room;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoomAPI(roomCode);
        setRoom(response.data);
        if (response.data.is_host) {
          authenticate();
        }
      } catch (error) {
        console.error(error);
        leaveRoomCallback();
        history.push("/");
      }
    };
    fetchData();

    // For now we will do interval for updating current song
    const interval = setInterval(() => {
      getCurrentSong();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [history, leaveRoomCallback, roomCode]);

  const getCurrentSong = async () => {
    try {
      const response = await getCurrentSongAPI();
      if (response.status !== 200) {
        setSong(EmptySong);
      } else {
        setSong(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const authenticate = async () => {
    try {
      const response = await isAuthenticatedAPI();
      setSpotifyAuthenticated(response.data.status);
      if (!response.data.status) {
        const authUrl = await getAuthURLAPI();
        window.location.replace(authUrl.data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const leaveButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await leaveRoomAPI();
      leaveRoomCallback();
      history.push("/");
    } catch (error) {
      console.error(error);
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
      <MusicPlayer song={song} />
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={leaveButton}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomPage;
