import DateHelper from '@/helpers/Date';

const API_URL = "http://localhost:3002";

const getTransactions = async () => {
    const response = await fetch(`${API_URL}/transactions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const getTransactionsByDate = async (date: Date) => {
    const startDate = DateHelper.FirstDateOfMonth(date);
    const endDate = DateHelper.EndDateOfMonth(date);
    const response = await fetch(`${API_URL}/transactions?start_date=${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}&end_date=${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const getTransactionById = async (id: string) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
};

const postTransaction = async (transaction: any) => {
    const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(transaction)
    });
    return response;
};

const putTransaction = async (transaction: any) => {
    const response = await fetch(`${API_URL}/transactions/${transaction._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(transaction)
    });
    return response;
};

const deleteTransaction = async (id: string) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    });
    return response;
}

export { getTransactions, getTransactionsByDate, getTransactionById, postTransaction, putTransaction, deleteTransaction }