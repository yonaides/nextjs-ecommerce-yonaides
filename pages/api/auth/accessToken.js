import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../utils/generateToToken";

connectDB();

const request = async (req, res) => {
  try {
    
    const rfToken = req.cookies.refreshtoken;

    if (!rfToken) {
      return res.status(400).json({ err: "Please login now" });
    }
    const result = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET);
    if (!result) {
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." });
    }

    const user = await Users.findById(result.id);
    if (!user) {
      return res.status(400).json({ err: "User does not exists" });
    }
    const access_token = createAccessToken({ id: user._id });
    return res.json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "this email doees not  exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ err: "Incorrect Password" });
    }

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: "Login Sucess",
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default request;
