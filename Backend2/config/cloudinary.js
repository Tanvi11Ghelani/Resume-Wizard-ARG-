import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import fs from "fs"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Construct the file path using `path.join()`
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const uploadOptions = {
      resource_type: "auto",
      folder: "image",
      crop: "scale",
    };

    if (localFilePath.fieldname === "avatar") {
      uploadOptions.width = 150;
    }

    const localPath = localFilePath.path || localFilePath;
    const response = await cloudinary.uploader.upload(localPath, uploadOptions);

    fs.unlinkSync(localPath); // Remove the locally saved file after successful upload
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Remove the locally saved file if the upload fails
    const localPath = localFilePath.path || localFilePath;
    fs.unlinkSync(localPath);

    return null;
  }
};

export {uploadOnCloudinary};
