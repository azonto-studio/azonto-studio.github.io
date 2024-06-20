import { v2 as cloudinary } from 'cloudinary';

// Configuring Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fetchCloudinaryImages = async (folder) => {
  try {
    const response = await cloudinary.api.resources_by_asset_folder(folder);
    return response.resources;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export default fetchCloudinaryImages;
