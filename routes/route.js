const express = require("express");
const router = express.Router();
const { RefreshToken } = require("../controller/RefreshToken");
const { getUsers, Register, Login, Logout } = require("../controller/User");
const {
  getShedule,
  postSchedule,
  getScheduleById,
} = require("../controller/Schedule");

// Users / auth
router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", RefreshToken);
router.delete("/logout", Logout);

//schedule
router.get("/schedule", getShedule);
router.get("/schedule:scheduleID", getScheduleById);
router.post("/schedule", postSchedule);

module.exports = router;
