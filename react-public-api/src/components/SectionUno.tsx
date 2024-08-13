import React from 'react';
import CardChar from './CardChar';
import { akatsuki } from '@/data/character';

export default function SectionUno() {
  return (
    <div className="block ">
      <div className="fixed top-0 left-0 h-full w-full z-10">
        <div className="h-screen w-full flex flex-row justify-center bg-sky-blue bg-no-repeat bg-cover px-20">
          <div className="max-w-[1440px]">
            {/* item container */}
            <div className="grid grid-cols-5 items-center">
              {akatsuki.map(({ image, width, scale }) => {
                return (
                  <CardChar
                    image={`images/blue-archive/${image}`}
                    width={width}
                    scale={scale || 0}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
