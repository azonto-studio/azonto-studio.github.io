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
  const categoryNunta = await fetchCloudinaryImages('assets/category/nunta');
  const categoryFamily = await fetchCloudinaryImages('assets/category/family');
  const categoryBotez = await fetchCloudinaryImages('assets/category/botez');
  const categoryCununie = await fetchCloudinaryImages('assets/category/cununie');
  const recentWorks= await fetchCloudinaryImages('assets/recentwork');

  const categoriesData = [
    {
      title: 'botez',
      description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.',
      images: categoryBotez
    },
    {
      title: 'nunta',
      description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.',
      images: categoryNunta
    },
    {
      title: 'cununie',
      description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.',
      images: categoryCununie
    },
    {
      title: 'familie',
      description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.',
      images: categoryFamily
    }
  ];




  return (
    <div className="bg-neutral-900 grid place-items-center">
        
        <CarouselHero data={backgroundImages.resources} />
        <CategorySection categories={categoriesData} />
        <RecentWork data={recentWorks.resources}/>

    </div>
  );
}
