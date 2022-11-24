const API_URL = "http://localhost:3002";

const getWallets = async () => {
    const response = await fetch(`${API_URL}/wallets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const getWalletById = async (id: string) => {
    const response = await fetch(`${API_URL}/wallets/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const postWallet = async (wallet: any) => {
    const response = await fetch(`${API_URL}/wallets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(wallet)
    });
    return response;
};

const putWallet = async (wallet: any) => {
    const response = await fetch(`${API_URL}/wallets/${wallet._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(wallet)
    });
    return response;
};

const deleteWallet = async (id: string) => {
    const response = await fetch(`${API_URL}/wallets/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

export { getWallets, getWalletById, postWallet, putWallet, deleteWallet }
