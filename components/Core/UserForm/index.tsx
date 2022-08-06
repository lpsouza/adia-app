import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, Stack, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";

const UserForm = (user: any) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Card>
          <CardContent>
            <div>nome {user.name}</div>
            <div>nome {data.name}</div>
            <Stack spacing={2}>
              <TextField
                id="name"
                label="Nome completo"
                variant="outlined"
                fullWidth
                value={data.name}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
              // value={email}
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
            >Adicionar</LoadingButton>
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