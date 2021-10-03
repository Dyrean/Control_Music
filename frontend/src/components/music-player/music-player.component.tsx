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

export const MusicPlayer = ({ song }) => {
  const { id, title, artist, duration, time, image_url, is_playing } = song;
  const songProgress = (time / duration) * 100;

  return (
    <Card key={id} sx={{ marginBottom: 5, marginTop: 5 }}>
      <Grid container alignItems="center">
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
            <IconButton>
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
