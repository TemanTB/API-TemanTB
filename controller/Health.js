const User = require("../models/UserModel");
const Health = require("../models/healthCheckModel");

const getHealth = async (req, res) => {
  try {
    const getHealth = await Health.findAll();

    if (getHealth && getHealth.length > 0) {
      return res.status(200).json({
        data: getHealth,
        message: "success get all health check",
      });
    } else {
      return res.status(400).json({
        message: "No health check found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
  s;
};

const getHealthbyUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const getHealthUsers = await Health.findAll({
      where: { userID: userID },
    });

    if (!getHealthUsers) return res.sendstatus(400);

    return res.status(200).json({
      data: getHealthUsers,
      message: "success get health by users",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getPointHealthbyUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const getPointUsers = await Health.findAll({
      where: { userID: userID },
      attributes: ["point"],
      order: [["time", "ASC"]],
    });

    if (!getPointUsers) return res.sendstatus(400);

    return res.status(200).json({
      data: getPointUsers,
      message: "success get health by users",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getnextDateMessage = async (req, res) => {
  const { userID } = req.params;
  const getNextDateMessage = await Health.findOne({
    where: {
      userID: userID,
    },
    attributes: ["alert"],
    order: [["time", "DESC"]],
  });
  if (!getNextDateMessage) return res.sendstatus(400);

  return res.status(200).json({
    data: getNextDateMessage,
    message: "success get meesage next date",
  });
};

module.exports = {
  getHealth,
  getHealthbyUser,
  getPointHealthbyUser,
  getnextDateMessage,
};
