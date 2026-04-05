const Button = ({
  onClick,
  children,
  color = "blue",
  className = "",
  type = "button",
}) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white text-sm px-3 py-1 mx-1 rounded ${colorClasses[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
