
const Material = require("../models/Material");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extract Cloudinary public ID and resource type from URL
function getCloudinaryDetails(fileUrl) {
  try {
    const url = new URL(fileUrl);
    const parts = url.pathname.split("/").filter(Boolean);

    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex < 1) return null;

    const resourceType = parts[uploadIndex - 1];

    if (!["image", "video", "raw"].includes(resourceType)) {
      return null;
    }

    let fileParts = parts.slice(uploadIndex + 1);

    // Remove version segment, such as v1234567890
    const versionIndex = fileParts.findIndex((part) =>
      /^v\d+$/.test(part)
    );

    if (versionIndex !== -1) {
      fileParts = fileParts.slice(versionIndex + 1);
    } else {
      // Without a version, skip URL transformation segments.
      const firstFolderIndex = fileParts.findIndex((part) =>
        part.startsWith("vinfluence-crm")
      );

      if (firstFolderIndex !== -1) {
        fileParts = fileParts.slice(firstFolderIndex);
      }
    }

    if (!fileParts.length) return null;

    const publicId = decodeURIComponent(
      fileParts.join("/")
    ).replace(/\.[^/.]+$/, "");

    return {
      publicId,
      resourceType,
    };
  } catch (error) {
    console.error("Cloudinary URL parsing error:", error);
    return null;
  }
}

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

    // Upload file buffer directly to Cloudinary
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

    // Save Cloudinary URL in MongoDB
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

// Delete Material
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(
      req.params.materialId
    );

    if (!material) {
      return res.status(404).json({
        message: "Material not found.",
      });
    }

    const filePath = material.filePath || "";

    // Delete from Cloudinary if this is a Cloudinary URL
    if (/^https?:\/\/res\.cloudinary\.com\//i.test(filePath)) {
      const details = getCloudinaryDetails(filePath);

      if (!details) {
        return res.status(400).json({
          message: "Could not identify the Cloudinary file.",
        });
      }

      const result = await cloudinary.uploader.destroy(
        details.publicId,
        {
          resource_type: details.resourceType,
        }
      );

      if (
        result.result !== "ok" &&
        result.result !== "not found"
      ) {
        console.error("Cloudinary deletion result:", result);

        return res.status(502).json({
          message: "Could not delete the file from Cloudinary.",
        });
      }
    }

    // Remove the MongoDB record after Cloudinary deletion
    await Material.findByIdAndDelete(material._id);

    res.status(200).json({
      message: "Material deleted successfully.",
    });
  } catch (error) {
    console.error("Delete material error:", error);

    res.status(500).json({
      message: "Failed to delete material.",
    });
  }
};

module.exports = {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
};
