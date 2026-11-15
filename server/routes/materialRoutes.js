
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
} = require("../controllers/materialController");

// Upload material
router.post(
  "/upload",
  upload.single("file"),
  uploadMaterial
);

// Get all materials for a client
router.get(
  "/:clientId",
  getMaterials
);

// Delete a material
router.delete(
  "/:materialId",
  deleteMaterial
);

module.exports = router;
