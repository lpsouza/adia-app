import Router from "next/router";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";

const Form = ({ idx }: any) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (idx === undefined) {
      await fetch("/api/core/apps", {
        method: "POST",
        body: JSON.stringify({ name, description, endpoint }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch(`/api/core/apps/${idx}`, {
        method: "PUT",
        body: JSON.stringify({ name, description, endpoint }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setLoading(false);
    Router.push("/core/apps/list");
  }

  useEffect(() => {
    (async () => {
      if (idx) {
        const app = await fetch(`/api/core/apps/${idx}`).then((res) => res.json());
        if (app) {
          setId(app._id);
          setName(app.name);
          setDescription(app.description);
          setEndpoint(app.endpoint);
          setToken(app.token);
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
          <CardHeader title={!idx && "Adicionando novo app" || "Editando app"} />
          <CardContent>
            <Stack spacing={2}>
              {idx && <TextField
                id="token"
                label="Id"
                variant="outlined"
                fullWidth
                value={id}
                disabled={true}
              />}
              <TextField
                id="name"
                label="Nome"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="description"
                label="Descri????o"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="endpoint"
                label="Endpoint"
                variant="outlined"
                fullWidth
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              />
              {idx && <TextField
                id="token"
                label="Token"
                variant="outlined"
                fullWidth
                value={token}
                disabled={true}
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
              onClick={() => Router.push("/core/apps")}
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