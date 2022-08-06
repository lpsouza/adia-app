import { ReactElement, useState } from "react";
import Router from "next/router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    setEmptyEmail(false);
    setEmptyPassword(false);
    if (email === "") {
      setEmptyEmail(true);
    }
    if (password === "") {
      setEmptyPassword(true);
    }
    if (email !== "" && password !== "") {
      const login = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (login.status === 200) {
        const data = await login.json();
        window.localStorage.setItem("access_token", data.access);
        window.localStorage.setItem("refresh_token", data.refresh);
        const tokenInfo = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access}`
          }
        });
        const tokenData = await tokenInfo.json();
        window.localStorage.setItem("name", tokenData.name);
        window.localStorage.setItem("email", tokenData.email);
        Router.push("/");
      } else {
        setError(true);
      }
    }
    setLoading(false);
  }

  return (
    <Box sx={{
      width: 300,
      height: 300,
      margin: "auto"
    }}>
      <Card>
        <CardHeader title="Entrar" />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {error && <Alert variant="filled" severity="error">Usuário ou senha estão incorretos. Tente novamente.</Alert>}
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              onChange={e => setEmail(e.target.value)}
              error={emptyEmail}
              helperText={emptyEmail ? "O campo email é obrigatório." : ""}
            />
            <TextField
              required
              fullWidth
              id="password"
              label="Senha"
              type="password"
              onChange={e => setPassword(e.target.value)}
              error={emptyPassword}
              helperText={emptyPassword ? "O campo senha é obrigatório." : ""}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <LoadingButton
            onClick={handleClick}
            loading={loading}
            variant="contained"
            fullWidth
          >Entrar</LoadingButton>
          <Button
            onClick={() => window.location.href = "/auth/register"}
            variant="outlined"
            fullWidth
          >Registrar</Button>
        </CardActions>
      </Card>
    </Box >
  );
}

export default LoginPage;
