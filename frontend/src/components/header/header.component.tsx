import React from "react";
import { AppBar, Box, Button, IconButton } from "@mui/material";

import { ThemeButton } from "../theme-button/theme-button";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        textDecoration: "none",
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: "transparent",
        marginBottom: 10,
        flexWrap: "nowrap",
      }}
    >
      <Button
        size="large"
        href="/"
        color="secondary"
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
          height: "100%",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          paddingLeft: 2,
          cursor: "pointer",
        }}
      >
        Home Music
      </Button>
      <Box
        component="div"
        sx={{
          height: "100%",
          width: "50%",
          p: 2,
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          href="/join-room"
          size="medium"
          color="secondary"
          sx={{
            ":hover": {
              backgroundColor: "transparent",
            },
            height: "100%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            cursor: "pointer",
          }}
        >
          Join Room
        </Button>
        <Button
          href="/create-room"
          size="medium"
          color="secondary"
          sx={{
            ":hover": {
              backgroundColor: "transparent",
            },
            paddingLeft: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            cursor: "pointer",
          }}
        >
          Create Room
        </Button>
        <IconButton
          color="secondary"
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
            height: "100%",
            width: 30,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            alignContent: "center",
            cursor: "pointer",
          }}
        >
          {/*  ! When changing page theme change to default */}
          <ThemeButton />
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default Header;
