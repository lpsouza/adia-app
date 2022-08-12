import CoreService from "@/services/CoreService";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";

const UserForm = ({ email }: any) => {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      if (email) {
        const user = await CoreService.users.get(email);
        if (user) {
          setName(user.name);
        }
      }
    })();
  }, []);

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
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
              />
              <TextField
                id="password"
                label="Senha"
                variant="outlined"
                type="password"
                fullWidth
              // value={password}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ paddingLeft: 2 }}>
            <LoadingButton
              // onClick={ }
              // loading={ }
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