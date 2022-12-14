import Router from "next/router";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";

const Form = ({ idx }: any) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(idx);
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      await fetch("/api/core/users", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch(`/api/core/users/${idx}`, {
        method: "PUT",
        body: JSON.stringify({ name, email: idx }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setLoading(false);
    Router.push("/core/users/list");
  }

  useEffect(() => {
    (async () => {
      if (idx) {
        const user = await fetch(`/api/core/users/${idx}`).then((res) => res.json());
        if (user) {
          setName(user.name);
        }
      }
    })();
  }, [idx]);

  return (
    <>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Card>
          <CardHeader title={!idx && "Adicionando novo usuário" || "Editando usuário"} />
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
                value={idx}
                disabled={idx}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!idx && <TextField
                id="password"
                label="Senha"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />}
            </Stack>
          </CardContent>
          <CardActions sx={{ paddingLeft: 2 }}>
            <LoadingButton
              onClick={() => handleSave()}
              loading={loading}
              variant="contained"
            >{!idx && "Adicionar" || "Editar"}</LoadingButton>
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

export default Form;