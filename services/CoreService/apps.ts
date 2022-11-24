import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getApps = async () => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/apps`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const getAppById = async (id: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/apps/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const postApp = async (user: any) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/apps`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(user)
    });
    return response;
};

const putApp = async (user: any) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/apps/${user._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(user)
    });
    return response;
};

const deleteApp = async (id: string) => {
    const response = await fetch(`${publicRuntimeConfig.CORE_API}/apps/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

export { getApps, getAppById, postApp, putApp, deleteApp };
