const Material = require("../models/Material");

// Upload Material
const uploadMaterial = async (req, res) => {
  try {
    const { clientId, title, category } = req.body;

    const material = new Material({
      clientId,
      title,
      category,
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    await material.save();

    res.status(201).json({
      message: "Material Uploaded Successfully",
      material,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Materials of a Client
const getMaterials = async (req, res) => {
  try {

    const materials = await Material.find({
      clientId: req.params.clientId,
    });

    res.status(200).json(materials);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  uploadMaterial,
  getMaterials,
};