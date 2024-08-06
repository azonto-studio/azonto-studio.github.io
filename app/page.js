"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundImages, setCategoryImages } from '../store/imageSlice';
import CarouselHero from './_components/CarouselHero';
import CategorySection from './_components/CategorySection';
import { backgroundImages, categoryImages } from '../utils/imageLoader';

export default function Home() {
  const dispatch = useDispatch();
  const bgImages = useSelector((state) => state.images.backgroundImages);
  const catImages = useSelector((state) => state.images.images);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setBackgroundImages({ resources: backgroundImages }));

    Object.keys(categoryImages).forEach((category) => {
      dispatch(setCategoryImages({ category, images: categoryImages[category] }));
    });
  }, [dispatch]);

  useEffect(() => {
    if (bgImages && !Object.values(catImages).some((images) => images === null)) {
      setIsLoading(false);
    }
  }, [bgImages, catImages]);

  if (isLoading) {
    return (
      <span className="w-full h-[100vh] flex flex-col items-center rounded-full border-3 border-solid border-white border-t-transparent border-l-transparent relative box-border animate-spin">
        <span className="sr-only">Loading...</span>
      </span>
    );
  }

  return (
    <div className="w-full min-h-screen bg-neutral-900">
      <CarouselHero data={Object.values(bgImages)} />
      <CategorySection />
    </div>
  );
}
