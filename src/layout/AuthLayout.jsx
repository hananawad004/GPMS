import { Box } from "@mui/material";
import ThemeToggle from "../components/common/ThemeToggle";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        px: 4,
      }}
    >
      {/* Theme Toggle */}
      <Box
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
        }}
      >
        <ThemeToggle />
      </Box>

      {children}
    </Box>
  );
}