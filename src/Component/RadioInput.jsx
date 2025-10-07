/* eslint-disable react/prop-types */

const RadioInput = ({
  labelName,
  name,
  options = [],
  value,
  onChange,
  required,
  disabled,
  error,
  readOnly,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {labelName}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={!readOnly ? onChange : undefined}
              disabled={disabled || readOnly}
              className="text-blue-600 focus:ring-blue-500 disabled:opacity-50"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RadioInput;
