const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "kanhaisagoodbo$y";

//ROUTE:1 Create a user using: POST "api/auth/". Doesn't require auth
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    let success = false;
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if the user with the same email already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists" });
      }

      // Use `await` to wait for the salt to be generated
      const salt = await bcrypt.genSalt(10);

      // Use `await` to wait for the password to be hashed
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      await user.save();

      // Create the JWT payload and sign the token
      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      // Send a response with the newly created user
      success = true;
      res.status(201).json({ success, authToken });
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE:2 Authenticate a user using: POST "api/auth/". No login required
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password")
      .exists()
      .withMessage("Password field is required")
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(201).json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE:3 Get login Id user Details using: POST "api/auth/getuser". No login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
