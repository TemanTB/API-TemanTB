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
const {
  getHealth,
  getHealthbyUser,
  getPointHealthbyUser,
  getnextDateMessage,
} = require("../controller/Health");

// Users / auth
router.post("/users", Register);
router.post("/login", Login);
router.get("/users", getUsers);
router.get("/token", RefreshToken);
router.delete("/logout", authorization, Logout);

//schedule
router.get("/schedule", authorization, getShedule);
router.get("/schedule/:userID", authorization, getScheduleByUser);
router.post("/schedule", authorization, postSchedule);
router.delete("/schedule/delete/:scheduleID", authorization, deleteSchedule);
router.put("/schedule/edit/:scheduleID", authorization, editSchedule);

//health check
router.get("/health", authorization, getHealth);
router.get("/health/:userID", authorization, getHealthbyUser);
router.get("/health/point/:userID", authorization, getPointHealthbyUser);
router.get("/health/alert/:userID", authorization, getnextDateMessage);

module.exports = router;
