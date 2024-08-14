import eva from '@/assets/images/sky-blue.png';
import CardCharacter from './CardCharacter';
import { evangelion } from '@/data/character';

export default function SectionUno() {
  return (
    <div className="block ">
      <div className="fixed top-0 bg-black left-0 h-full w-full z-10">
        <div className="h-screen w-full flex flex-row justify-center bg-eva bg-center md:bg-bottom bg-no-repeat bg-contain px-0">
          <div className="w-full h-full relative">
            <img
              key={0}
              src={eva}
              className="hover:drop-shadow-custom cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              alt="eva"
            />
            {/* item container */}
            <div className="flex flex-row justify-between items-end">
              {evangelion.map(({ image, width, scale, id, bottom, evaId }) => {
                return (
                  <CardCharacter
                    to={String(id)}
                    image={`images/evangelion/${image}`}
                    width={width}
                    scale={scale || 0}
                    bottom={bottom}
                    evaId={evaId || ''}
                    key={id}
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
