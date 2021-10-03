import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useHistory } from "react-router";
import { createRoomAPI } from "../../utils/api.utils";

const CreateRoomPage: React.FC = () => {
  const defaultVotes = 2;
  const history = useHistory();
  const [hasError, createHasError] = useState({ hasError: false, message: "" });
  const [room, createRoom] = useState({
    guest_can_pause: true,
    votes_to_skip: defaultVotes,
  });

  const handleVotesChange = (e: { target: { value: any } }) => {
    createRoom({ ...room, votes_to_skip: e.target.value });
  };

  const handleGuestCanPauseChange = (e: { target: { value: any } }) => {
    createRoom({
      ...room,
      guest_can_pause: e.target.value === "true" ? true : false,
    });
  };

  const handleCreateRoomButton = async () => {
    try {
      const response = await createRoomAPI(room);
      history.push(`/room/${response.data.code}`);
    } catch (error) {
      console.error(error);
      createHasError({ hasError: true, message: error.response.data.message });
    }
  };
  return (
    <div className="center">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormHelperText component="div">
              Guest Control of Playback State
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                value="true"
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                control={<Radio color="secondary" />}
                value="false"
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              required
              type="number"
              defaultValue={defaultVotes}
              onChange={handleVotesChange}
              inputProps={{
                min: 1,
                style: {
                  textAlign: "center",
                },
              }}
            />
            <FormHelperText component="div">
              Votes Required To Skip Song
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="success"
            variant="contained"
            onClick={handleCreateRoomButton}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          {!hasError.hasError ? null : (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {hasError.message}
              <strong> please try again later!</strong>
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateRoomPage;
