type CardProp = {
  image: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className: string;
};

export const Card: React.FC<CardProp> = ({ image, name, onClick, className }) => {
  return (
    <div className={`card-container ${className}`} onClick={onClick}>
      <img src={image} alt={name} />
      <h1>{name}</h1>
    </div>
  );
};
