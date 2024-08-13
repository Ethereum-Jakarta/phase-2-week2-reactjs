function CardChar({ image, width, scale }: { image: string; width?: number; scale: number }) {
  return (
    <div
      className="h-screen z-10 flex items-center justify-center"
      style={{
        // backgroundImage: `url('https://static.wikia.nocookie.net/naruto/images/2/25/Jinin.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <img
        src={image}
        alt="char"
        width={width}
        className={`hover:scale-110 cursor-pointer`}
        style={{ scale: `${scale + ''}` }}
      />
    </div>
  );
}

export default CardChar;
