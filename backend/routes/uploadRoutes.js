import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // upload to /uploads directory by callback (cb) function
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extname);
  },
});

const fileFilter = (req, file, cb) => {
  // To only allow image files, you can use the following condition
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check if the file has a valid mimetype and extension
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: "Error uploading image" });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;