// src/components/Home.js

"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundImages, setCategoryImages } from '../store/imageSlice';
import CarouselHero from './_components/CarouselHero';
import CategorySection from './_components/CategorySection';
import { backgroundImages, categoryImages } from '../utils/imageLoader';

export default function Home() {
  const dispatch = useDispatch();
  const bgImages = useSelector((state) => state.images.backgroundImages);
  const catImages = useSelector((state) => state.images.images);

  useEffect(() => {
    dispatch(setBackgroundImages({ resources: backgroundImages }));
    
    Object.keys(categoryImages).forEach((category) => {
      dispatch(setCategoryImages({ category, images: categoryImages[category] }));
    });
  }, [dispatch]);

  if (!bgImages || Object.values(catImages).some((images) => images === null)) {
    return (
      <span className="w-12 h-12 rounded-full border-3 border-solid border-white border-t-transparent border-l-transparent inline-block relative box-border animate-spin">
        <span className="w-10 h-10 absolute inset-0 m-auto border-3 border-solid border-transparent border-b-[#FF3D00] border-r-[#FF3D00] rounded-full box-border animate-[spin_0.5s_linear_infinite_reverse]"></span>
        <span className="w-8 h-8 absolute inset-0 m-auto border-3 border-solid border-white border-t-transparent border-l-transparent rounded-full box-border animate-[spin_1.5s_linear_infinite]"></span>
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
