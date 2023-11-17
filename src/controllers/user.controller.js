const { PrismaClient } = require("@prisma/client");
const { templateResponse } = require("../helper/templateResponse");
const prisma = new PrismaClient();

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        name: true,
        email: true,
        image: {
          select: {
            imageUrl: true,
          },
        },
      },
    });

    if (!data) {
      return res
        .status(404)
        .json(templateResponse(false, "User not found", null));
    }

    return res
      .status(200)
      .json(templateResponse(true, "User retrieved successfully", data));
  } catch (error) {
    return res
      .status(500)
      .json(templateResponse(false, "Internal server error", null));
  }
};

module.exports = {
  getOneUser,
};
