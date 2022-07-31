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
            const login = await fetch(`${process.env.CORE_API}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (login.status === 200) {
                const data = await login.json();
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                window.location.href = "/";
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
                <CardHeader title="Login" />
                <Divider />
                <CardContent>
                    <Stack spacing={2}>
                        {error && <Alert variant="filled" severity="error">Email or password is invalid</Alert>}
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
                    >Log in</LoadingButton>
                    <Button
                        onClick={() => window.location.href = "/register"}
                        variant="outlined"
                        fullWidth
                    >Register</Button>
                </CardActions>
            </Card>
        </Box >
    );
}

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};