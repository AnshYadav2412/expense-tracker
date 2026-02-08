import { User } from "../models/User.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import { isValidObjectId, Types } from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //Fetch total income and expenses

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("totalExpense", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    //Get income transactions of last 60 days

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total Income for last 60 days

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    //Get income transactions of last 60 days

    const last60DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total Income for last 60 days

    const expenseLast60Days = last60DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    // Fetch last 5 transactions (income + expenses)
    const incomeTxns = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const expenseTxns = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const lastTransactions = [
      ...incomeTxns.map((txn) => ({ ...txn, type: "income" })),
      ...expenseTxns.map((txn) => ({ ...txn, type: "expense" })),
    ].sort((a, b) => b.date - a.date);

    //Final response

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,

      last60DayExpenses: {
        total: expenseLast60Days,
        transactions: last60DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },

      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
