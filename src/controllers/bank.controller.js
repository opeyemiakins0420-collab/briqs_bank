import { hashPassword } from "../lib/bcrypt.js";
import { db } from "../lib/db.js";
import { saveBankDetails } from "../repositories/bank.repository.js";
import { generateAccountNumber } from "../utils/randon.numbers.js";
import { createBankSchema } from "../validators/bank.js";

export const createBankAccountContoller = async (req, res) => {
  try {
    await db.transaction(async (t) => {
      //check if user's logged in
      const loggedInUser = req.user;

      if (!loggedInUser)
        return res.status(401).json({
          error: `Unautorized!`,
        });

      // validate user's input
      const { error, value } = createBankSchema.validate(req.body);

      if (error) return res.status(400).json({ error: error.message });

      const { pin, account_type, currency } = value;

      value.pin = await hashPassword(value.pin);

      // create account number and save the bank detils
      value.account_number = await generateAccountNumber();

      const createdAccount = await saveBankDetails(
        {
          ...value,
          userId: loggedInUser.id,
        },
        { transaction: t },
      );

      // return success messsage upon creation
      return res.status(201).json({
        message: "Account Created Successfully",
        createdAccount,
      });
    });
  } catch (error) {
    console.error(`Error creating bank acount. Error: ${error}`);

    return res.status(500).json({ eror: "Internal server error" });
  }
};
