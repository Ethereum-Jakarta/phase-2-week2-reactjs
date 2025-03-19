const Select = ({ label, value, onChange, options, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-500 bg-gray-800 rounded-lg p-2 w-full text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required={required}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
