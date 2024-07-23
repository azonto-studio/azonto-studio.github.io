"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundImages, setCategoryImages } from '../store/imageSlice';
import CarouselHero from './_components/CarouselHero';
import CategorySection from './_components/CategorySection';
import { fetchBackgroundImages } from '../services/cloudinaryService';
import { fetchCategoryImages } from '../services/cloudinaryService';

export default function Home() {
  const dispatch = useDispatch();
  const backgroundImages = useSelector((state) => state.images.backgroundImages);
  const categoryImages = useSelector((state) => state.images.images);

  useEffect(() => {
    const getImages = async () => {
      if (!backgroundImages) {
        const response = await fetchBackgroundImages();
        dispatch(setBackgroundImages(response));
      }

      const categories = ['cununie', 'nunta', 'familie', 'botez'];
      categories.forEach(async (category) => {
        if (!categoryImages[category]) {
          const response = await fetchCategoryImages(category);
          dispatch(setCategoryImages({ category, images: response }));
        }
      });
    };

    getImages();
  }, [backgroundImages, categoryImages, dispatch]);

  if (!backgroundImages || Object.values(categoryImages).some((images) => images === null)) {
    return <>
      <span className="w-12 h-12 rounded-full border-3 border-solid border-white border-t-transparent border-l-transparent inline-block relative box-border animate-spin">
        <span className="w-10 h-10 absolute inset-0 m-auto border-3 border-solid border-transparent border-b-[#FF3D00] border-r-[#FF3D00] rounded-full box-border animate-[spin_0.5s_linear_infinite_reverse]"></span>
        <span className="w-8 h-8 absolute inset-0 m-auto border-3 border-solid border-white border-t-transparent border-l-transparent rounded-full box-border animate-[spin_1.5s_linear_infinite]"></span>
      </span>
    </>;
  }



  return (
    <div className="w-full min-h-screen bg-neutral-900">
      <CarouselHero data={backgroundImages.resources} />
      <CategorySection />
    </div>
  );
}
