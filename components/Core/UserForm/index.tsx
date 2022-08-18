import CoreService from "@/services/CoreService";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";

const UserForm = ({ email }: any) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (newEmail !== "" && newPassword !== "") {
      await CoreService.users.post({ name, email: newEmail, password: newPassword });
    } else {
      await CoreService.users.put({ name, email });
    }
    setLoading(false);
    Router.push("/core/users/list");
  }

  useEffect(() => {
    (async () => {
      if (email) {
        const user = await (await CoreService.users.get(email)).json();
        if (user) {
          setName(user.name);
        }
      }
    })();
  }, [email]);

  return (
    <>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Card>
          <CardHeader title={!email && "Adicionando novo usuário" || "Editando usuário"} />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                id="name"
                label="Nome completo"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                disabled={email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              {!email && <TextField
                id="password"
                label="Senha"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setNewPassword(e.target.value)}
              />}
            </Stack>
          </CardContent>
          <CardActions sx={{ paddingLeft: 2 }}>
            <LoadingButton
              onClick={() => handleSave()}
              loading={loading}
              variant="contained"
            >{!email && "Adicionar" || "Editar"}</LoadingButton>
            <Button
              onClick={() => Router.push("/core/users")}
              variant="outlined"
            >Cancelar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default UserForm;