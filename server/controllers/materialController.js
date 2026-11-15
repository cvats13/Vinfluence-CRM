
const Material = require("../models/Material");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary using Render environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Material
const uploadMaterial = async (req, res) => {
  try {
    const { clientId, title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please select a file.",
      });
    }

    if (!clientId || !title || !category) {
      return res.status(400).json({
        message: "Client ID, title and category are required.",
      });
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return res.status(500).json({
        message: "Cloudinary configuration is missing.",
      });
    }

    // Upload file buffer directly to Cloudinary.
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "vinfluence-crm/materials",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    // Save Cloudinary URL in MongoDB.
    const material = new Material({
      clientId,
      title,
      category,
      fileName: req.file.originalname,
      filePath: uploadResult.secure_url,
    });

    await material.save();

    res.status(201).json({
      message: "Material Uploaded Successfully",
      material,
    });
  } catch (error) {
    console.error("Material upload error:", error);

    res.status(500).json({
      message: "Material upload failed.",
    });
  }
};

// Get Materials of a Client
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({
      clientId: req.params.clientId,
    }).sort({ createdAt: -1 });

    res.status(200).json(materials);
  } catch (error) {
    console.error("Get materials error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadMaterial,
  getMaterials,
};
