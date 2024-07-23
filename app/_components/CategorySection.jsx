import React from 'react';
import { useSelector } from 'react-redux';
import CardCategory from './CardCategory';

export default function CategorySection() {
  const categoryImages = useSelector((state) => state.images.images);

  const categories = [
    { title: 'botez', description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.' },
    { title: 'nunta', description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.' },
    { title: 'cununie', description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.' },
    { title: 'familie', description: 'Fiecare fotografie surprinde esența frumuseții și eleganței, într-un mod unic și personal.' },
  ];

  return (
    <section className='w-full py-10'>
      <h2 className='mx-4 mt-8 md:text-4xl font-bold md:w-4/5 text-white text-2xl tracking-wider pb-2 border-b border-orange-500 font-manrope'>
        Lumile surprinse în clipe
      </h2>
      <p className='text-neutral-400 text-[11px] md:text-sm md:w-4/5 tracking-wider px-4 pt-2 mt-4 font-manrope leading-5'>
        În căutarea frumuseții și autenticității, călătorim și fotografiem, căutând să surprindem esența fiecărui moment și loc. Fiecare imagine este o poveste, fiecare portret o privire în sufletul celui fotografiat. Din peisajele îndepărtate până la străzile pline de viață, fiecare fotografie este o călătorie în sine, o călătorie către inima și spiritul locurilor și oamenilor pe care îi întâlnim.
      </p>
      <div className='px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {categories.map((category, index) => {
          const images = categoryImages[category.title] || {};
          return (
            <div key={index} className={`relative ${index === 1 || index === 2 ? 'col-span-1 md:col-span-1 lg:col-span-2' : 'md:col-span-2 lg:col-span-1'}`}>
              <CardCategory
                image1={images.resources?.[0]?.secure_url}
                image2={images.resources?.[1]?.secure_url}
                title={category.title}
                description={category.description}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
