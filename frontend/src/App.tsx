import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import { GlobalStyle } from "./global.styles";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import CreateRoomPage from "./pages/create-room/create-room.component";
import RoomJoinPage from "./pages/room-join/room-join.component";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create-room" component={CreateRoomPage} />
        <Route exact path="/join-room" component={RoomJoinPage} />
      </Switch>
    </div>
  );
};

export default App;
