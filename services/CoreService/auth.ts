import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const login = async (email: string, password: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    return response;
};

const register = async (name: string, email: string, password: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    return response;
};

const token = async (token: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/token`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
};

const refresh = async (token: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: token })
    });
    return response;
};

export { login, register, token, refresh };
