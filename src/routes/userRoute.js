import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

// API key generation library
import { generateApiKey } from "generate-api-key";

import { secret } from "../../index.js";

const userRouter = express.Router();

userRouter.post("/getUser", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Bad Request. Please provide a valid user ID.",
        success: false,
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error during user retrieval:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

// creating a user with Username and password ONLY
userRouter.post("/createUser", async (req, res) => {
  try {
    const { username, password } = req.body;
    const search = await userModel.findOne({ username });

    if (search == null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        username,
        password: hashedPassword,
      });
      await newUser.save();

      return res.status(201).json({
        message: "User created successfully",
        success: true,
      });
    } else {
      return res.json({ message: "Username Already Exist!!", success: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up.",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, secret);

    return res.status(200).json({ token, userId: user._id, success: true });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});

userRouter.patch("/createApiKey", async (req, res) => {
  try {
    const { id } = req.body;

    let newApiKey;
    let isApiKeyUnique = false;
    let count = 0;

    // Generate a unique API key
    while (!isApiKeyUnique && count < 3) {
      newApiKey = generateApiKey();
      const existingUser = await userModel.findOne({ apikey: newApiKey });

      // If the generated API key doesn't exist in the database, set isApiKeyUnique to true
      if (!existingUser) {
        isApiKeyUnique = true;
      }
      count++;
    }

    // Update the user's API key
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: { apikey: newApiKey } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "API key updated successfully.",
      newApiKey: updatedUser.apikey,
      success: true,
    });
  } catch (error) {
    console.error("Error during API key update:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export { userRouter };

