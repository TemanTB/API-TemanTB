const User = require("../models/UserModel");
const Health = require("../models/healthCheckModel");
const Sequelize = require("sequelize");

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
};

const getHealthById = async (req, res) => {
  try {
    const { healthId } = req.params;

    const getId = await Health.findByPk(healthId);

    if (!getId)
      return res
        .status(404)
        .json({ message: "Cannot find health with the specified ID" });

    return res.status(200).json({
      data: getId,
      message: "success get data by id",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteHealth = async (req, res) => {
  try {
    const { healthId } = req.params;

    const deleteHealth = await Health.findOne({
      where: {
        healthId: healthId,
      },
    });

    if (!deleteHealth) {
      return res.status(400).json({
        message: "cannot find id health",
      });
    }

    await deleteHealth.destroy();

    return res.status(200).json({
      message: "delete data success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
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
      attributes: [
        [Sequelize.fn("date", Sequelize.col("time")), "date"],
        "point",
      ],
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
  getHealthById,
  deleteHealth,
};
