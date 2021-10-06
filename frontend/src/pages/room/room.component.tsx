import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
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
  const [hasError, setHasError] = useState({ message: "", hasError: false });
  const setError = (error) => {
    setHasError(error);
  };
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
          Room: {code}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Guest Can Pause?: {guest_can_pause ? "Yes" : "No"}
        </Typography>
      </Grid>{" "}
      {guest_can_pause ? (
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            Votes Required To Skip: {votes_to_skip}
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Are You The Host?: {is_host ? "Yes" : "No"}
        </Typography>
      </Grid>
      <MusicPlayer
        song={song}
        setHasError={setError}
        is_host={is_host}
        guest_can_pause={guest_can_pause}
      />
      <Collapse in={hasError.message !== ""} sx={{ marginBottom: 2 }}>
        {hasError.hasError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {hasError.message}
            <strong> check it out!</strong>
          </Alert>
        ) : null}
      </Collapse>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={leaveButton}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomPage;
