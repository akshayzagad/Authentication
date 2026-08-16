import userModel from "../models/user.modal.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyRegister) {
    return res.status(409).json({ message: "User already registered" });
  }
  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    name: username,
    email,
    password: hashPassword,
  });

  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res
    .status(201)
    .json({ message: "User registered successfully", user, token: accessToken });
}

export async function loggedIn(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is not provided" });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  const user = await userModel.findById(decoded.id).select("-password");

  res
    .status(200)
    .json({
      message: "User fetched successfully",
      username: user.name,
      email: user.email,
    });
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is not provided" });
  }

  const decoded =jwt.verify(refreshToken, config.JWT_SECRET);

  const accessToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshTokenNew = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
    expiresIn: "7d",
  }); 

  res.cookie("refreshToken", refreshTokenNew, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({message: "Token refreshed successfully", token: accessToken });
}