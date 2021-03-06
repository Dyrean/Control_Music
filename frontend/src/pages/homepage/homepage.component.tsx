import React, { useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { getUserInRoom } from "../../utils/api.utils";

type Props = {
  roomCode: string;
  setRoomCode: Function;
};

const HomePage: React.FC<Props> = ({ roomCode, setRoomCode }: Props) => {
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await getUserInRoom();
        setRoomCode({ roomCode: response.data.code });
      } catch (error) {
        console.error(error);
      }
    };
    if (roomCode === "") {
      fetchRoom();
    }
  }, [roomCode, setRoomCode]);

  return (
    <Grid container alignItems="center" direction="column" spacing="2">
      <Grid item xs={12}>
        <Typography variant="h3" component="h3" marginBottom={4}>
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join-room" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create-room" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default HomePage;
