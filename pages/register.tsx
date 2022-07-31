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

import BaseLayout from "@/layouts/BaseLayout";
import { LoadingButton } from "@mui/lab";

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
            const login = await fetch(`${process.env.CORE_API}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            if (login.status === 201) {
                window.location.href = "/login";
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
                <CardHeader title="Register new user" />
                <Divider />
                <CardContent>
                    <Stack spacing={2}>
                        {error && <Alert variant="filled" severity="error">Error to create a new user. Please try again.</Alert>}
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            onChange={e => setName(e.target.value)}
                            error={emptyName}
                            helperText={emptyName ? "Full Name is required" : ""}
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            error={emptyEmail}
                            helperText={emptyEmail ? "Email is required" : ""}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            error={emptyPassword}
                            helperText={emptyPassword ? "Email is required" : ""}
                        />
                    </Stack>
                </CardContent>
                <CardActions>
                    <LoadingButton
                        onClick={handleClick}
                        loading={loading}
                        variant="contained"
                        fullWidth
                    >Register</LoadingButton>
                    <Button
                        onClick={() => window.location.href = "/login"}
                        variant="outlined"
                        fullWidth
                    >Log in</Button>
                </CardActions>
            </Card>
        </Box >
    );
}

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};