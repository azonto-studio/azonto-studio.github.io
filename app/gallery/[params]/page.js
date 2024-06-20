import Gallery from "../Gallery";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
export async function generateStaticParams() {
  const categories = [
    { name: 'All', slug: 'all' },
    { name: 'Nunta', slug: 'nunta' },
    { name: 'Cununie', slug: 'cununie' },
    { name: 'Botez', slug: 'botez' },
    { name: 'Familie', slug: 'familie' },
  ];

  return categories.map((category) => ({
    params: category.slug,
  }));
}

export default async function GalleryCategoryPage({ params }) {
  const { params: category } = params;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchCloudinaryImages = async (folder) => {
    const response = await cloudinary.api.resources_by_asset_folder(folder, {
      max_results: 500,
    });
    return response;
  };

  let images;
  let data
  switch (category) {
    case 'nunta':
      data = await fetchCloudinaryImages('assets/images/nunta');
      images = shuffle(data.resources);
      break;
    case 'cununie':
      data = await fetchCloudinaryImages('assets/images/cununie');
      images = shuffle(data.resources);
      break;
    case 'botez':
      data = await fetchCloudinaryImages('assets/images/botez');
      images = shuffle(data.resources);
      break;
    case 'familie':
      data = await fetchCloudinaryImages('assets/images/familie');
      images = shuffle(data.resources);
      break;
    case 'all':
      let imageNunta = await fetchCloudinaryImages('assets/images/nunta');
      let imageCununie = await fetchCloudinaryImages('assets/images/cununie');
      let imageBotez = await fetchCloudinaryImages('assets/images/botez');
      let imageFamilie = await fetchCloudinaryImages('assets/images/familie');


      const allImages = [
        ...imageNunta.resources,
        ...imageCununie.resources,
        ...imageBotez.resources,
        ...imageFamilie.resources,
      ];
      images = shuffle(allImages);
      
      break;
  }



  return <Gallery category={category} images={images} />;
}

