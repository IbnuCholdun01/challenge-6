const { PrismaClient } = require("@prisma/client");
const { templateResponse } = require("../helper/templateResponse");
const imagekit = require("../lib/imagekit");
const prisma = new PrismaClient();

const postImage = async (req, res) => {
  try {
    if (!req.file) {
      return templateResponse(false, "File not found", null);
    }

    const fileBuffer = req.file.buffer.toString("base64");
    const uploadFileToImageKit = await imagekit.upload({
      fileName: req.file.originalname,
      file: fileBuffer,
    });

    const imageUrl = uploadFileToImageKit.url;
    const { title, description } = req.body;

    const data = await prisma.image.create({
      data: {
        title,
        description,
        imageUrl,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
      },
    });

    return res.status(201).json(templateResponse(true, "Success", data));
  } catch (error) {
    return res
      .status(500)
      .json(templateResponse(false, "Internal server error", null));
  }
};

const getAllImage = async (req, res) => {
  try {
    const data = await prisma.image.findMany();

    return res
      .status(200)
      .json(templateResponse(true, "Images retrieved successfully", data));
  } catch (error) {
    return res
      .status(500)
      .json(templateResponse(false, "Internal server error", null));
  }
};

const getOneImage = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.image.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!data) {
      return res
        .status(404)
        .json(templateResponse(false, "Image not found", null));
    }

    return res
      .status(200)
      .json(templateResponse(true, "Image retrieved successfully", data));
  } catch (error) {
    return res
      .status(500)
      .json(templateResponse(false, "Internal server error", null));
  }
};

const deleteOneImage = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.image.delete({
      where: {
        id: Number(id),
      },
    });

    if (!data) {
      return res
        .status(404)
        .json(templateResponse(false, "Image not found", null));
    }

    return res
      .status(200)
      .json(templateResponse(true, "Delete image success", data));
  } catch (error) {
    return res
      .status(500)
      .json(templateResponse(false, "Internal server error", null));
  }
};

const updateOneImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!req.file) {
      return templateResponse(false, "File not found", null);
    }

    const fileBuffer = req.file.buffer.toString("base64");
    const uploadFileToImageKit = await imagekit.upload({
      fileName: req.file.originalname,
      file: fileBuffer,
    });

    const imageUrl = uploadFileToImageKit.url;

    const payload = {};

    if (title) payload.title = title;
    if (description) payload.description = description;
    if (imageUrl) payload.imageUrl = imageUrl;

    const data = await prisma.image.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        imageUrl,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
      },
    });

    return res.status(201).json(templateResponse(true, "Update Success", data));
  } catch (error) {
    return res
      .status(500)
      .json(templateResponse(false, "Internal server error", null));
  }
};

module.exports = {
  postImage,
  getAllImage,
  getOneImage,
  deleteOneImage,
  updateOneImage,
};
