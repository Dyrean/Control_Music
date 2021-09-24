import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyle } from "./global.styles";

import { CssBaseline, PaletteMode } from "@mui/material";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import CreateRoomPage from "./pages/create-room/create-room.component";
import RoomJoinPage from "./pages/room-join/room-join.component";

const themeObject = createTheme({
  palette: {
    mode: "light" as PaletteMode,
  },
  typography: {
    fontFamily: "Ubuntu Mono",
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={themeObject}>
        <CssBaseline />
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/create-room" component={CreateRoomPage} />
          <Route exact path="/join-room" component={RoomJoinPage} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
