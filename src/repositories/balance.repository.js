import { Bank } from "../db/models/bank.js";

export const getAccountBalanceByAccountNumber = async (account_number) => {
    const account = await Bank.findOne({
        where: {
            account_number,
        },
        select:{
            id: true,
            account_number: true,
            account_type: true,
            currency: true,
            balance: true,

        },
    });

    return account;
};
