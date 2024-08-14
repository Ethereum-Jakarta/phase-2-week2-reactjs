import React from 'react';
import { akatsuki } from '@/data/character';
import eva from '@/assets/images/sky-blue.png';
import CardCharacter from './CardCharacter';

export default function SectionUno() {
  return (
    <div className="block ">
      <div className="fixed top-0 bg-black left-0 h-full w-full z-10">
        <div className="h-screen w-full flex flex-row justify-center bg-eva bg-bottom bg-no-repeat bg-contain px-0 md:px-20">
          <div className="max-w-[1440px] w-full h-full relative">
            <img
              src={eva}
              className="hover:drop-shadow-custom cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              alt="eva"
            />
            {/* item container */}
            {/* <div className="grid grid-cols-5 items-end">
              {akatsuki.map(({ image, width, scale, name, bottom }) => {
                return (
                  <>
                    <CardCharacter
                      to={name}
                      image={`images/evangelion/${image}`}
                      width={width}
                      scale={scale || 0}
                      bottom={bottom}
                    />
                  </>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
