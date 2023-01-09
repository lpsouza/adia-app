import Router from "next/router";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, MenuItem, Select, Stack, Switch, TextField } from "@mui/material";

const Form = ({ idx }: any) => {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");
    const [user, setUser] = useState("");
    const [bankId, setBankId] = useState(0);
    const [enabled, setEnabled] = useState(true);
    const [users, setUsers] = useState([]);
    const [banks, setBanks] = useState([]);

    const handleSave = async () => {
        setLoading(true);

        let response;
        if (!idx) {
            response = await fetch("/api/finance/wallets", {
                method: "POST",
                body: JSON.stringify({ type, user, bankId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

        } else {
            response = await fetch(`/api/finance/wallets/${idx}`, {
                method: "PUT",
                body: JSON.stringify({ type, user, bankId, enabled }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        if (response.status !== 200 && response.status !== 201) {
            const { message } = await response.json();
            setLoading(false);
            console.error(`Error: ${message}`);
            return;
        }


        setLoading(false);
        Router.push("/finance/wallets/list");
    }

    useEffect(() => {
        (async () => {
            setUsers(await (await fetch("/api/core/users")).json());
            setBanks(await (await fetch("https://brasilapi.com.br/api/banks/v1")).json());
            if (idx) {
                const user = await fetch(`/api/finance/wallets/${idx}`).then((res) => res.json());
                if (user) {
                    setType(user.type);
                    setUser(user.user);
                    setBankId(user.bankId);
                    setEnabled(user.enabled);
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
                    <CardHeader title={!idx && "Adicionando nova carteira" || "Editando carteira"} />
                    <CardContent>
                        <Stack spacing={2}>
                            <Select
                                id="type"
                                label="Tipo de carteira"
                                variant="outlined"
                                fullWidth
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="bank">Banco</MenuItem>
                                <MenuItem value="creditcard">Cartão de crédito</MenuItem>
                                <MenuItem value="savings">Cofrinho</MenuItem>
                            </Select>
                            <Select
                                id="user"
                                label="Usuário"
                                variant="outlined"
                                fullWidth
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            >
                                {users.map((user: any) => (
                                    <MenuItem key={user.email} value={user.email}>{user.name} ({user.email})</MenuItem>
                                ))}
                            </Select>
                            <Select
                                id="bankId"
                                label="Banco"
                                variant="outlined"
                                fullWidth
                                value={bankId}
                                type="number"
                                onChange={(e) => setBankId(Number(e.target.value))}
                            >
                                <MenuItem value={0}>0 - Cofrinho Virtual</MenuItem>
                                {banks.sort((a: any, b: any) => a.code - b.code).map((bank: any) => {
                                    if (bank.code) {
                                        return <MenuItem key={bank.code} value={bank.code}>{bank.code} - {bank.name}</MenuItem>
                                    }
                                })}
                            </Select>
                            {idx && <FormControlLabel
                                control={
                                    <Switch
                                        checked={enabled}
                                        onChange={(e) => setEnabled(e.target.checked)}
                                        name="enabled"
                                        color="primary"
                                    />
                                }
                                label="Ativo"
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
                            onClick={() => Router.push("/finance/wallets")}
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