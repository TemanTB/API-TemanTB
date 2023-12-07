const express = require("express");
const router = express.Router();
const { RefreshToken } = require("../controller/RefreshToken");
const { authorization } = require("../middleware/authorization");
const { getUsers, Register, Login, Logout } = require("../controller/User");
const {
  getShedule,
  postSchedule,
  getScheduleByUser,
  deleteSchedule,
  editSchedule,
} = require("../controller/Schedule");
const { getHealth } = require("../controller/Health");

// Users / auth
router.get("/users", authorization, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", RefreshToken);
router.delete("/logout", Logout);

//schedule
router.get("/schedule", authorization, getShedule);
router.get("/schedule/:userID", authorization, getScheduleByUser);
router.post("/schedule", postSchedule);
router.delete("/schedule/delete/:scheduleID", deleteSchedule);
router.put("/schedule/edit/:scheduleID", editSchedule);

//schedule
router.get("/health", authorization, getHealth);

module.exports = router;
