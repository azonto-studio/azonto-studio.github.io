"use client";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ArrowBigUp } from 'lucide-react';
import Modal from '../_components/ModalImage';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { categoryImages } from '../../utils/imageLoader'; 
import { setCategoryImages } from '../../store/imageSlice';
const categories = [
  { name: 'All', slug: 'all', folder: null },
  { name: 'Nunta', slug: 'nunta', folder: 'nunta', max: 500 },
  { name: 'Cununie', slug: 'cununie', folder: 'cununie', max: 500 },
  { name: 'Botez', slug: 'botez', folder: 'botez', max: 500 },
  { name: 'Familie', slug: 'familie', folder: 'familie', max: 500 },
];

export default function Gallery({ category }) {
  const dispatch = useDispatch();
  const [filteredImages, setFilteredImages] = useState([]);
  const [showScroll, setShowScroll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const categoryImagesFromStore = useSelector((state) => state.images.images);

 

  useEffect(() => {
    Object.keys(categoryImages).forEach((category) => {
      dispatch(setCategoryImages({ category, images: categoryImages[category] }));
    });
  }, [dispatch]);


  useEffect(() => {
    if (categoryImagesFromStore && typeof categoryImagesFromStore === 'object') {
      let images = [];
      if (category === 'all') {
        images = Object.values(categoryImagesFromStore).flatMap(cat => 
          Object.values(cat).map(img => img.default.src) || []
        );
      } else {
        const selectedCategory = categoryImagesFromStore[category];
        images = selectedCategory ? 
          Object.values(selectedCategory).map(img => img.default.src) || [] 
          : [];
      }

      setFilteredImages(shuffle(images));
      setIsLoading(false); 
    } else {
      console.warn('categoryImages is not defined or not an object');
    }
  }, [category, categoryImagesFromStore]);

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openImage = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const showPrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const shuffle = (array) => {
    if (!Array.isArray(array)) {
      console.warn('shuffle function received a non-array input:', array);
      return [];
    }
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  if (isLoading) {
    return (
      <span className="w-full h-[100vh] flex flex-col items-center rounded-full border-3 border-solid border-white border-t-transparent border-l-transparent relative box-border animate-spin">
        <span className="sr-only">Loading...</span>
      </span>
    );
  }

  return (
    <section className="bg-neutral-900 py-28 cursor-pointer relative">
      <h1 className="w-full text-6xl font-paris text-white text-center pt-6">Gallery</h1>
      <ul className="w-full flex text-white gap-2 p-4 items-center md:p-6 justify-center cursor-pointer uppercase mt-4">
        {categories.map((cat, index) => (
          <li
            key={index}
            className={`hover:text-orange-500 md:text-medium hover:border-orange-500 border-[1px] ${cat.slug === category ? ' text-orange-500 border-orange-500' : 'border-transparent'} p-1 rounded-lg`}
          >
            <Link href={`/gallery/${cat.slug}`}>
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-row flex-wrap">
        {filteredImages?.map((imageSrc, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3" onClick={() => openImage(index)}>
            <LazyLoadImage
              src={imageSrc}
              alt={`img-${index}`}
              sizes="(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="block w-full h-full cursor-pointer p-1"
              effect="blur"
            />
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <Modal
          image={filteredImages[selectedImageIndex]}
          onClose={closeModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
        />
      )}

      <button
        className={`fixed bottom-20 right-6 lg:right-8 xl:right-20 p-2 rounded-full bg-orange-500 text-white text-2xl ${showScroll ? 'flex' : 'hidden'} items-center justify-center`}
        onClick={scrollTop}
      >
        <ArrowBigUp />
      </button>
    </section>
  );
}
