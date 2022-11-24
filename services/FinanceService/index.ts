import { deleteTransaction, getTransactionById, getTransactions, postTransaction, putTransaction } from "./transactions";
import { deleteWallet, getWalletById, getWallets, postWallet, putWallet } from "./wallets";

const FinanceService = {
    transactions: { get: getTransactions, getById: getTransactionById, post: postTransaction, put: putTransaction, delete: deleteTransaction },
    wallets: { get: getWallets, getById: getWalletById, post: postWallet, put: putWallet, delete: deleteWallet }
}

export default FinanceService;
