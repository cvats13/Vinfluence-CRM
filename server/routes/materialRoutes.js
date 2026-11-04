const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadMaterial,
  getMaterials,
} = require("../controllers/materialController");

router.post(
  "/upload",
  upload.single("file"),
  uploadMaterial
);

router.get(
  "/:clientId",
  getMaterials
);

module.exports = router;