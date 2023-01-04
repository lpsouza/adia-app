const API_URL = "http://localhost:3002";

const importer = async (ofx: any) => {
    const response = await fetch(`${API_URL}/ofx/importer`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: ofx
    });
    return response;
};

export { importer }
