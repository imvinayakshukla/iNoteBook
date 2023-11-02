const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "vinayakdeveloper";
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/createuser",
  [
    body("name", "Enter the name of at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the password of at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {

    try {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      //chcek whether the user with this email exists

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Sorry user already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // Validation passed, create the user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // Send a success response with the created user
      success=true;
      res.status(201).json({ success,authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).json({success, error: "Server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter a correct pass").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success,error: "Enter correct password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // Send a success response with the created user
      success=true;
      res.status(201).json({success, authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success,error: "Server error" });
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Internal Server error" });
  }
});
module.exports = router;
