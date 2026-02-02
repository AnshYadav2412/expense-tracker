import { User } from "../models/User.js";
import Income from "../models/Income.js";

export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    //Validation check
    if (!source || !amount || !date) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllIncome = async (req, res) => {};

export const deleteIncome = async (req, res) => {};

export const downloadIncomeExcel = async (req, res) => {};
