import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { CssBaseline, PaletteMode } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Brightness3Icon from "@mui/icons-material/Brightness3";

const light = createTheme({
  palette: {
    mode: "light" as PaletteMode,
  },
});

const dark = createTheme({
  palette: {
    mode: "dark" as PaletteMode,
  },
});

export const ThemeButton = () => {
  const [darkMode, setDarkMode] = useState(true);
  const icon = !darkMode ? <LightbulbIcon /> : <Brightness3Icon />;
  const appliedTheme = createTheme(darkMode ? light : dark);
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        onClick={() => setDarkMode(!darkMode)}
      >
        {icon}
      </IconButton>
    </ThemeProvider>
  );
};
