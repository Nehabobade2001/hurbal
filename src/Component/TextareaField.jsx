/* eslint-disable react/prop-types */

const TextareaField = ({
  labelName,
  optional,
  required,
  value,
  placeholder,
  onChange,
  disabled,
  defaultValue,
  error,
  min,
  max,
  type,
  name
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {labelName} 
        {optional && <span className="ml-1 text-gray-400 text-xs">(Optional)</span>}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        minLength={min}
        maxLength={max}
        disabled={disabled}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        type={type ? type : "text"}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextareaField;
