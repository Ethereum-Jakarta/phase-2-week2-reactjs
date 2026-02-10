const Input = ({ label, type, value, onChange, required, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Input ${label.toLowerCase()}`}
        className="border border-gray-500 bg-gray-800 rounded-lg p-2 w-full text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required={required}
      />
    </div>
  );
};

export default Input;
