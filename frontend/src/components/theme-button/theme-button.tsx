import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { CssBaseline, PaletteMode } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Brightness3Icon from "@mui/icons-material/Brightness3";

export const ThemeSwitch = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  const handleLightMode = () => {
    setThemeMode("light");
  };
  const handleDarkMode = () => {
    setThemeMode("dark");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {themeMode === "light" ? (
        <IconButton aria-label="dark" onClick={handleDarkMode} size="large">
          <Brightness3Icon />
        </IconButton>
      ) : (
        <IconButton aria-label="light" onClick={handleLightMode} size="large">
          <LightbulbIcon />
        </IconButton>
      )}
    </ThemeProvider>
  );
};
