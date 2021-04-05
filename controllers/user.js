import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import saveDataModel from "../models/dataModel.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const userExist = await userModel.findOne({ email: email });

    if (userExist)
      return res
        .status(400)
        .json({ message: "User already exist.", status: "fail" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Password doesn't match", status: "fail" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token, status: "success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (!userExist)
      return res
        .status(200)
        .json({ message: "User doesn't exist", status: "fail" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect)
      return res
        .status(200)
        .json({ message: "Invalid Credentials.", status: "fail" });

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: userExist, token, status: "success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const saveDetails = async (req, res) => {
  const { personal, education, project, experiance, skills } = req.body;

  try {
    const result = await saveDataModel.create({
      personal,
      education,
      project,
      experiance,
      skills,
    });
    res.status(200).json({ result, status: "success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const getDetails = async (req, res) => {
  try {
    const result = await saveDataModel.findById();
    res.status(200).json({ result, status: "success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong." });
  }
};
