import clsx from 'clsx';
import { Link } from 'react-scroll';

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
      className={clsx(
        'md:h-screen h-screen z-10 flex items-end justify-center w-full hover:bg-opacity-25 relative',
        {
          'bg-eva00': evaId === 'eva00',
          'bg-eva01': evaId === 'eva01',
          'bg-eva02': evaId === 'eva02',
          'bg-eva06': evaId === 'eva06',
          'bg-eva08': evaId === 'eva08',
        },
      )}
      style={{
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
          className={clsx(`hover:scale-110 cursor-pointer min-w-[${width}px] duration-300`)}
          style={{ scale: `${scale + ''}` }}
        />
      </Link>
    </div>
  );
}

export default CardCharacter;
