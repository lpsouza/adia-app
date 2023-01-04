const getBankById = async (id: string) => {
    const response = await fetch(`https://brasilapi.com.br/api/banks/v1/${id}`, {
        method: "GET"
    });
    return response;
};

export { getBankById };