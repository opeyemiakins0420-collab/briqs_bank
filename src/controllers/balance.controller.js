import { getAccountBalanceByAccountNumber } from "../repositories/balance.repository.js";

export const getBalanceController = async (req, res) => {
  try {
    // check if the user is logged in

    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({
        error: "unathourized!",
      });
    };

    const accountNumber = req.params.id;

    // get user's account balance
    const account = await getAccountBalanceByAccountNumber (accountNumber);

    // check if the user has a bank account
    if (!account) {
      return res.status(404).json({
        error: "Bank Account NOt Found",
      });
    }

    //Return account balance
    return res.status(200).json({
      message: "Account balance retrieved successfully",
      account: {
        account_number: account.account_number,
        account_type: account.account_type,
        currency: account.currncy,
        balance: account.balance,
      },
    });
  } catch (error) {
    console.error("Error retrieving account balance:", error);

    return res.status(500).json({
      error: "internal server error",
    });
  }
};
