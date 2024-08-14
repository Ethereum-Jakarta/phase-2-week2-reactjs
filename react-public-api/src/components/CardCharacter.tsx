import { Link } from 'react-scroll';
import { twMerge } from 'tailwind-merge';

function CardCharacter({
  image,
  width,
  scale,
  to,
  bottom,
  evaId,
}: {
  image: string;
  width?: number;
  scale: number;
  to: string;
  evaId: string;
  bottom?: number;
}) {
  return (
    <div
      className={twMerge(
        'h-screen z-10 flex items-end justify-center w-full hover:bg-opacity-25 relative',
        `bg-${evaId}`,
      )}
      style={{
        // backgroundImage: `url('https://static.wikia.nocookie.net/naruto/images/2/25/Jinin.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <Link
        to={to || ''}
        smooth
        duration={500}
        spy
        offset={0}
        className="absolute"
        style={{ bottom: bottom }}>
        <img
          src={image}
          alt="char"
          width={width}
          className={`hover:scale-110 cursor-pointer`}
          style={{ scale: `${scale + ''}` }}
        />
      </Link>
    </div>
  );
}

export default CardCharacter;
