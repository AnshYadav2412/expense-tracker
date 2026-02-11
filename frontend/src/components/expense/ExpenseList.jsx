import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import { LuDownload } from "react-icons/lu";

const ExpenseList = ({ transactions, onDelete, onDowload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense Categories</h5>

        <button className="card-btn" onClick={onDowload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="amount"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
