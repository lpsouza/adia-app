import { ReactElement, useState } from "react";
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
import CoreService from "@/services/CoreService";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [emptyName, setEmptyName] = useState(false);
  const [email, setEmail] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    setEmptyName(false);
    setEmptyEmail(false);
    setEmptyPassword(false);
    if (name === "") {
      setEmptyName(true);
    }
    if (email === "") {
      setEmptyEmail(true);
    }
    if (password === "") {
      setEmptyPassword(true);
    }
    if (name !== "" && email !== "" && password !== "") {
      const register = await CoreService.auth.register(name, email, password);

      if (register.status === 201) {
        window.location.href = "/auth/login";
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
      margin: "auto",
    }}>
      <Card>
        <CardHeader title="Registrando um novo usuário" />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {error && <Alert variant="filled" severity="error">Erro ao criar o usuário, tente novamente.</Alert>}
            <TextField
              required
              fullWidth
              id="name"
              label="Nome completo"
              onChange={e => setName(e.target.value)}
              error={emptyName}
              helperText={emptyName ? "O nome completo é obrigatório" : ""}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              onChange={e => setEmail(e.target.value)}
              error={emptyEmail}
              helperText={emptyEmail ? "O campo email é obrigatório" : ""}
            />
            <TextField
              required
              fullWidth
              id="password"
              label="Senha"
              type="password"
              onChange={e => setPassword(e.target.value)}
              error={emptyPassword}
              helperText={emptyPassword ? "O campo senha é obrigatório" : ""}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <LoadingButton
            onClick={handleClick}
            loading={loading}
            variant="contained"
            fullWidth
          >Registrar</LoadingButton>
          <Button
            onClick={() => window.location.href = "/auth/login"}
            variant="outlined"
            fullWidth
          >Entrar</Button>
        </CardActions>
      </Card>
    </Box >
  );
}

export default RegisterPage;
