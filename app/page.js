import CarouselHero from "./_components/CarouselHero";
import CategorySection from "./_components/CategorySection";
import RecentWork from "./_components/RecentWork";
import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
export default async function Home() {
  const fetchCloudinaryImages = async (folder) => {
    const response = await cloudinary.api.resources_by_asset_folder(folder);
    return response;
  };

  const backgroundImages = await fetchCloudinaryImages('assets/backgroundsSelected');







  return (
    <div className=" w-full h-[100vh]">  
        <CarouselHero data={backgroundImages.resources} />
    </div>
  );
}