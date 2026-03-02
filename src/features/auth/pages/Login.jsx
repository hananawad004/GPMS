import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import AuthLayout from "../../../layout/AuthLayout";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.token);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <Typography variant="h5" mb={3}>
        Login
      </Typography>

      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Username"
          fullWidth
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button variant="contained" onClick={handleLogin}>
          Sign In
        </Button>
      </Stack>
    </AuthLayout>
  );
}