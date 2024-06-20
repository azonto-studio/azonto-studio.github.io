"use client"
import React from 'react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CardCategory = ({ image1, image2, title, description }) => {
    return (
        <div className="group relative block">
            <div className="relative h-[350px] sm:h-[450px] overflow-hidden">
                <LazyLoadImage
                    src={image1}
                    alt="slide"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                    style={{ width: '100%', height: '100%' }}
                />
                <LazyLoadImage
                    src={image2}
                    alt="slide"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-4xl font-medium text-white font-paris capitalize">{title}</h3>
                <p className="mt-1.5 text-pretty text-xs text-white font-manrope leading-5">{description}</p>
                <Button className="mt-3 inline-block bg-orange-500 transition-all ease-in-out rounded px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    <Link href={`/gallery/${title}`}>
                        Vezi mai mult
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default CardCategory;
