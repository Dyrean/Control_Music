import React, { useState } from "react";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import getCookie from "../../utils/getCookie";
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

export const HelperDiv = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;

const CreateRoomPage: React.FC = (props) => {
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
      const csrftoken = getCookie("csrftoken") as string;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(room),
      };
      const response = await fetch("/api/create-room", requestOptions);
      const data = await response.json();
      if (typeof data.detail !== "undefined") {
        throw Error(data.detail);
      }
      history.push(`/room/${data.code}`);
    } catch (error) {
      createHasError({ hasError: true, message: (error as Error).message });
      setTimeout(() => {
        createHasError({ hasError: false, message: "" });
      }, 3000);
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
            <FormHelperText>
              <HelperDiv>Guest Control of Playback State</HelperDiv>
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
            <FormHelperText>
              <HelperDiv>Votes Required To Skip Song</HelperDiv>
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
