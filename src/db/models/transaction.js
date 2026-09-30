import { DataTypes, Model } from "sequelize";
import { db } from "../../lib/db.js";


export class Transaction extends Model {
}
Transaction.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.INTEGER,
    },
    transaction_type: {
      type: DataTypes.ENUM("TRANSFER", "AIRTIME", "UTILITY", "DEPOSIT"),
      allowNull: false,
    },
    source_account: {
      type: DataTypes.STRING,
      references: { model: "Banks", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    destination_account: {
      type: DataTypes.STRING,
      references: { model: "Banks", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("SUCCESSFUL", "PENDING", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "Transaction",
  },
);
