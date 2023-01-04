import { importer } from "./ofx";
import { deleteTransaction, getTransactionById, getTransactions, getTransactionsByDate, postTransaction, putTransaction } from "./transactions";
import { deleteWallet, getWalletById, getWallets, postWallet, putWallet } from "./wallets";

const FinanceService = {
    transactions: { get: getTransactions, getByDate: getTransactionsByDate, getById: getTransactionById, post: postTransaction, put: putTransaction, delete: deleteTransaction },
    wallets: { get: getWallets, getById: getWalletById, post: postWallet, put: putWallet, delete: deleteWallet },
    ofx: { importer: importer }
}

export default FinanceService;
