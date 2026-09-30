import { Router } from "express";
import { depositController } from "../controllers/deposit.controller.js";
import { transferController } from "../controllers/transfer.controller.js";
import  {auth} from "../middleware/auth.js"
import { createBankAccountContoller } from "../controllers/bank.controller.js";



export const bankRouter = Router();

bankRouter.patch("/deposit/:id", depositController)

bankRouter.patch("/transfer", auth, transferController)
bankRouter.post("/create-account", auth, createBankAccountContoller)