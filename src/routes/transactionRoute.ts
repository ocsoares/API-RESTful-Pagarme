import { Router } from "express";
import { handleValidation } from "../middleware/validation/handleValidation";
import { transactionValidation } from "../middleware/validation/transactionValidation";
import { authMiddleware } from '../middleware/authMiddleware';
import { TransactionController } from "../controllers/TransactionController";

const transactionRoute = Router();

transactionRoute.post('/transaction', transactionValidation(), handleValidation, authMiddleware, TransactionController.transfer);

transactionRoute.get('/transaction', authMiddleware, TransactionController.showAllAccountTransactions);
transactionRoute.get('/transaction/credit-card', authMiddleware, TransactionController.showAllCreditCardTransactions);
transactionRoute.get('/transaction/debit-card', authMiddleware, TransactionController.showAllDebitCardTransactions);

export default transactionRoute;