const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true,
  }),
  (req, res) => {
    // Successful authentication, redirect to client
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

// Get current user
router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.user,
    });
  }
  return res.status(200).json({
    isAuthenticated: false,
    user: null,
  });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" });
    }
    // Send a success response instead of redirecting
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  });
});

module.exports = router;
