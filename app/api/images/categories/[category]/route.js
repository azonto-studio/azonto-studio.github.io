// app/api/images/categories/[category].js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request, { params }) {
  const category = params.category;

  try {
    const response = await cloudinary.api.resources_by_asset_folder(`assets/images/${category}`);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'A apărut o eroare la obținerea imaginilor din categorie' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function generateStaticParams() {
  const categories = ['nunta', 'familie', 'notez', 'cununie'];
  return categories.map((category) => ({
    params: { category },
  }));
}