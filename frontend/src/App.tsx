import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { CssBaseline, PaletteMode } from "@mui/material";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import CreateRoomPage from "./pages/create-room/create-room.component";
import RoomJoinPage from "./pages/room-join/room-join.component";
import RoomPage from "./pages/room/room.component";

const themeObject = createTheme({
  palette: {
    mode: "light" as PaletteMode,
  },
  typography: {
    fontFamily: "Ubuntu Mono",
  },
});

type Props = {
  roomCode: string;
  setRoomCode?: Function;
  leaveRoomCallback?: Function;
};

const App = () => {
  const [roomCodeState, setRoomCodeState] = useState<Props>({ roomCode: "" });
  const clearCode = () => {
    setRoomCodeState({ roomCode: "" });
  };
  return (
    <div>
      <ThemeProvider theme={themeObject}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return roomCodeState.roomCode ? (
                <Redirect to={`/room/${roomCodeState.roomCode}`} />
              ) : (
                <HomePage
                  roomCode={roomCodeState.roomCode}
                  setRoomCode={setRoomCodeState}
                />
              );
            }}
          />
          <Route exact path="/create-room" component={CreateRoomPage} />
          <Route exact path="/join-room" component={RoomJoinPage} />
          <Route
            exact
            path="/room/:roomCode"
            render={() => {
              return (
                <RoomPage
                  leaveRoomCallback={clearCode}
                  setRoomCode={setRoomCodeState}
                  roomCode={""}
                />
              );
            }}
          />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
