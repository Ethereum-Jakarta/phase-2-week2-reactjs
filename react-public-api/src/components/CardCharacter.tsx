import { Link } from 'react-scroll';

function CardChar({
  image,
  width,
  scale,
  to,
}: {
  image: string;
  width?: number;
  scale: number;
  to: string;
}) {
  return (
    <div
      className="h-screen z-10 flex items-center justify-center"
      style={{
        // backgroundImage: `url('https://static.wikia.nocookie.net/naruto/images/2/25/Jinin.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <Link to={to || ''} smooth duration={500} spy offset={0}>
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

export default CardChar;
