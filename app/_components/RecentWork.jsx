"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import ModalImage from './ModalImage';



export default function RecentWork({data}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openImage = (index) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    const showNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    return (
        <section className="w-full py-8 grid">
            <h2 className='mx-4 mt-8 md:text-4xl md:w-4/5 font-bold text-white text-2xl tracking-wider pb-2 border-b border-orange-500 font-manrope'>
                Portofoliu
            </h2>

            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {data.map((image, index) => (
                    <div key={index} className="relative" onClick={() => openImage(index)}>
                        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] cursor-pointer">
                            <Image
                                src={image.secure_url}
                                alt={`img-${index}`}
                                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75"
                                priority={index < 4} 
                                layout="fill"
                                sizes="(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/gallery/all" className='w-full flex flex-row items-center justify-center'>
                <Button
                    className="mt-8 border border-orange-500 text-orange-500 bg-transparent gap-1 hover:bg-orange-500 transition-all ease hover:scale-95 rounded px-5 py-3 text-xs font-medium uppercase tracking-wide hover:text-white"
                >
                    <span>Vezi mai mult </span>
                    <MoveRight className='w-[12px]' />
                </Button>
            </Link>

            {selectedImageIndex !== null && (
                <ModalImage
                    image={data[selectedImageIndex]}
                    onClose={closeModal}
                    onNext={showNextImage}
                    onPrev={showPrevImage}
                />
            )}
        </section>
    );
}
