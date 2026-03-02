// import { createContext, useMemo, useState } from "react";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { createTheme } from "@mui/material/styles";

// export const ThemeContext = createContext();

// export default function CustomThemeProvider({ children }) {
//   const [mode, setMode] = useState("dark");

//   const toggleTheme = () => {
//     setMode(prev => (prev === "dark" ? "light" : "dark"));
//   };

//   const theme = useMemo(() =>
//     createTheme({
//       palette: {
//         mode,
//         primary: { main: "#d48a63" },
//       },
//     }), [mode]
//   );

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </ThemeContext.Provider>
//   );
// }
import { createContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#1a1d23",   // 👈 مش أسود
              paper: "#2f3338",
            },
            primary: {
              main: "#d0895b",
            },
            text: {
              primary: "#f8fafc",
              secondary: "#cbd5e1",
            },
          }
        : {
            background: {
              default: "#f3f4f6",
              paper: "#ffffff",
            },
            primary: {
              main: "#d0895b",
            },
          }),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}