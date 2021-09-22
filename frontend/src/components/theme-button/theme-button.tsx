import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { CssBaseline, PaletteMode } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Brightness3Icon from "@mui/icons-material/Brightness3";

// TODO: ThemeProvider theme wont re-render current theme, need to fix it .

const themeObject = createTheme({
  palette: {
    mode: "light" as PaletteMode,
  },
  typography: {
    fontFamily: "Ubuntu Mono",
  },
});

export const ThemeButton = () => {
  const [theme, setTheme] = useState(themeObject);
  const {
    palette: { mode },
  } = theme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        mode:
          mode === "light" ? ("dark" as PaletteMode) : ("light" as PaletteMode),
      },
    };
    setTheme(updatedTheme);
  };
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {mode === "light" ? (
        <IconButton aria-label="dark" onClick={toggleDarkMode} size="large">
          <Brightness3Icon />
        </IconButton>
      ) : (
        <IconButton aria-label="light" onClick={toggleDarkMode} size="large">
          <LightbulbIcon />
        </IconButton>
      )}
    </ThemeProvider>
  );
};
