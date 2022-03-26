import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";
import bcrypt from "bcrypt";

connectDB();

const request = async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;
    const errMsg = valid(name, email, password, confirm);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ err: "this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({ name, email, password: passwordHash });
    await newUser.save();

    res.json({ msg: "Register Sucess" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default request;