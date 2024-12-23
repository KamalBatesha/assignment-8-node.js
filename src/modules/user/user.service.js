import { userModel } from "../../DB/models/index.js";
import { checkEmailExist } from "../../utils/checkEmail.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    // Check if the email already exists
    checkEmailExist(email);

    // Create a new user
    const newUser = await userModel.create({ name, email, role, password });

    return res
      .status(201)
      .json({ message: "user added successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    // Find the user by ID
    let user = await userModel.findByPk(id);

    if (!user) {
      // If the user does not exist, create a new one
      user = await userModel.create({ id, name, email, role, password });
    } else {
      // If the user exists, update the existing record
      await user.update({ name, email, role, password }, { validate: false });
    }

    res
      .status(200)
      .json({ message: "user updated or created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    let user = await userModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
