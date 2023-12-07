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
};

module.exports = { getHealth };
