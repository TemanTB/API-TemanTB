const User = require("../models/UserModel");
const Schedule = require("../models/Schedule");
const jwt = require("jsonwebtoken");
const refreshToken = require("./RefreshToken");
const { text } = require("express");

const getShedule = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      attributes: ["scheduleID", "title", "description", "hour", "userID"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "phone"],
        },
      ],
    });

    if (schedules && schedules.length > 0) {
      return res.status(200).json({
        data: schedules,
        message: "success get all schedules",
      });
    } else {
      return res.status(400).json({
        message: "No schedules found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getScheduleByUser = async (req, res) => {
  const { userID } = req.params;

  try {
    const schedule = await Schedule.findAll({
      where: {
        userID: userID,
      },
      attributes: ["scheduleID", "title", "description", "hour", "userID"],
    });

    if (schedule) {
      return res.status(200).json({
        data: schedule,
        message: "Successfully retrieved schedule data",
      });
    } else {
      return res.status(404).json({
        message: "User ID not found or no schedule associated",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const postSchedule = async (req, res) => {
  const { title, description, hour } = req.body;

  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    const userId = user.userID;

    const addSchedule = await Schedule.create({
      title,
      description,
      hour,
      userID: userId,
    });

    if (addSchedule) {
      return res.status(201).json({
        data: addSchedule,
        message: "Success, schedule added",
      });
    } else {
      return res.status(400).json({
        message: "Fail to add schedule",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const editSchedule = async (req, res) => {
  try {
    const { scheduleID } = req.params;
    const { title, description, hour } = req.body;

    const updatedSchedule = await Schedule.findByPk(scheduleID);

    if (!updatedSchedule) {
      return res.status(400).json({
        message: "cannot find id schedule",
      });
    }

    await updatedSchedule.update({
      title: title,
      description: description,
      hour: hour,
    });

    return res.status(200).json({
      data: updatedSchedule,
      message: "update data success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  getShedule,
  postSchedule,
  getScheduleByUser,
  editSchedule,
};
