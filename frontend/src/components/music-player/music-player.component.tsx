import React from "react";
import {
  Grid,
  IconButton,
  Typography,
  Card,
  LinearProgress,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";

import { playCurrentSongAPI, pauseCurrentSongAPI } from "../../utils/api.utils";

// ! Currently spotify want you to have premium account for the pause and play
// TODO Error message need to modified for showing error for needing of premium

export const MusicPlayer = ({ song, setHasError }) => {
  const { id, title, artist, duration, time, image_url, is_playing } = song;
  const songProgress = (time / duration) * 100;

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
      <Grid container alignItems="center" alignContent="center">
        <Grid item xs={4}>
          <img src={image_url} height="100%" width="100%" alt={title} />
        </Grid>
        <Grid item xs={8} paddingLeft={4}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <div>
            <IconButton onClick={() => (is_playing ? pauseSong() : playSong())}>
              {is_playing ? (
                <PauseCircleFilledRoundedIcon />
              ) : (
                <PlayArrowRoundedIcon />
              )}
            </IconButton>
            <IconButton>
              <SkipNextRoundedIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
};

export default MusicPlayer;
