import CoreService from "@/services/CoreService";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import App from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";

const Form = ({ id }: any) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [token, setToken] = useState("");
  const [appId, setAppId] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (id === undefined) {
      await CoreService.apps.post({ name, description, endpoint });
    } else {
      await CoreService.apps.put({ _id: id, name, description, endpoint });
    }
    setLoading(false);
    Router.push("/core/apps/list");
  }

  useEffect(() => {
    (async () => {
      if (id) {
        const app = await (await CoreService.apps.get(id)).json();
        if (app) {
          setAppId(app._id);
          setName(app.name);
          setDescription(app.description);
          setEndpoint(app.endpoint);
          setToken(app.token);
        }
      }
    })();
  }, [id]);

  return (
    <>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Card>
          <CardHeader title={!id && "Adicionando novo app" || "Editando app"} />
          <CardContent>
            <Stack spacing={2}>
              {id && <TextField
                id="token"
                label="Id"
                variant="outlined"
                fullWidth
                value={appId}
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
                label="Descrição"
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
              {id && <TextField
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
            >{!id && "Adicionar" || "Editar"}</LoadingButton>
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