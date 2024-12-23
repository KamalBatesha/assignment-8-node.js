import { userModel } from "../DB/models/index.js";

export const checkEmailExist = async (email) => {
  const existingUser = await userModel.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
};
