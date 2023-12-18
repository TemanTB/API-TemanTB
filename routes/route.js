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
  getAllSchedule,
} = require("../controller/Schedule");
const {
  getHealth,
  getHealthbyUser,
  getPointHealthbyUser,
  getnextDateMessage,
  getHealthById,
  deleteHealth,
} = require("../controller/Health");

// Users / auth
router.post("/users", Register);
router.post("/login", Login);
router.get("/users", getUsers);
router.get("/token", RefreshToken);
router.delete("/logout", authorization, Logout);

//schedule
router.get("/schedule", authorization, getShedule);
router.get("/schedule/:scheduleID", authorization, getAllSchedule);
router.get("/schedule/:userID", authorization, getScheduleByUser);
router.post("/schedule", authorization, postSchedule);
router.delete("/schedule/delete/:scheduleID", authorization, deleteSchedule);
router.put("/schedule/edit/:scheduleID", authorization, editSchedule);

//health check
router.get("/health", authorization, getHealth);
router.get("/health/:userID", authorization, getHealthbyUser);
router.get("/health/point/:userID", authorization, getPointHealthbyUser);
router.get("/health/alert/:userID", authorization, getnextDateMessage);
router.get("/health/healthid/:healthId", authorization, getHealthById);
router.delete("/health/delete/:healthId", authorization, deleteHealth);

module.exports = router;
