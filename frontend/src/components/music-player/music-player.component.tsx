import React from "react";
import {
  Grid,
  IconButton,
  Typography,
  Card,
  LinearProgress,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";

import {
  playCurrentSongAPI,
  pauseCurrentSongAPI,
  skipCurrentSongAPI,
} from "../../utils/api.utils";

// ! Currently spotify want you to have premium account for the pause and play
// TODO Error message need to modified for showing error for needing of premium

export const MusicPlayer = ({
  song,
  setHasError,
  guest_can_pause,
  is_host,
}) => {
  const {
    id,
    title,
    artist,
    duration,
    time,
    image_url,
    is_playing,
    votes,
    votes_required,
  } = song;
  const songProgress = (time / duration) * 100;

  const convertSecToMin = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const skipSong = async () => {
    try {
      const response = await skipCurrentSongAPI();
      console.log(response);
      if (response.status !== 204) {
        setHasError({
          message: response.data.detail,
          hasError: true,
        });
      }
    } catch (error) {
      console.log(error.response);
      setHasError({
        message: error.response.data.detail,
        hasError: true,
      });
    }
  };

  const playSong = async () => {
    try {
      const response = await playCurrentSongAPI();
      console.log(response);
      if (response.status !== 204) {
        setHasError({
          message: response.data.detail,
          hasError: true,
        });
      }
    } catch (error) {
      console.log(error.response);
      setHasError({
        message: error.response.data.detail,
        hasError: true,
      });
    }
  };

  const pauseSong = async () => {
    try {
      const response = await pauseCurrentSongAPI();
      if (response.status !== 204) {
        setHasError({
          message: response.data.detail,
          hasError: true,
        });
      }
    } catch (error) {
      setHasError({
        message: error.response.data.detail,
        hasError: true,
      });
    }
  };

  return (
    <Card key={id} sx={{ marginBottom: 5, marginTop: 5 }}>
      <Grid container alignItems="center" marginBottom={0} paddingBottom={0}>
        <Grid item xs={4}>
          <img src={image_url} height="100%" width="100%" alt={title} />
        </Grid>
        <Grid item xs={8}>
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {artist}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
              divider={<Divider flexItem />}
            >
              {guest_can_pause || is_host ? (
                <IconButton
                  onClick={() => (is_playing ? pauseSong() : playSong())}
                >
                  {is_playing ? (
                    <PauseCircleFilledRoundedIcon />
                  ) : (
                    <PlayArrowRoundedIcon />
                  )}
                </IconButton>
              ) : null}
              <IconButton onClick={() => skipSong()}>
                <SkipNextRoundedIcon />
              </IconButton>
              <Box>
                {votes} / {votes_required}
              </Box>
              <Box>
                {convertSecToMin(time)} / {convertSecToMin(duration)}
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <LinearProgress
        variant="determinate"
        value={songProgress}
        color="secondary"
      />
    </Card>
  );
};

export default MusicPlayer;
