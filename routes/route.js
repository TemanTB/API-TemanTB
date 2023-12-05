const express = require("express");
const router = express.Router();
const { RefreshToken } = require("../controller/RefreshToken");
const { getUsers, Register, Login, Logout } = require("../controller/User");
const {
  getShedule,
  postSchedule,
  getScheduleByUser,
} = require("../controller/Schedule");

// Users / auth
router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", RefreshToken);
router.delete("/logout", Logout);

//schedule
router.get("/schedule", getShedule);
router.get("/schedule/:userID", getScheduleByUser);
router.post("/schedule", postSchedule);

module.exports = router;