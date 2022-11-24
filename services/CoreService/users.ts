import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getUsers = async () => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const getUserByEmail = async (email: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/users/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const postUser = async (user: any) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(user)
    });
    return response;
};

const putUser = async (user: any) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/users/${user.email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(user)
    });
    return response;
};

const deleteUser = async (email: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/users/${email}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

export { getUsers, getUserByEmail, postUser, putUser, deleteUser };