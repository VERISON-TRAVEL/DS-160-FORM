
import React from 'react';

interface FormRadioGroupProps {
  label: string;
  name: string;
  value: 'Yes' | 'No' | '';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { label: string; value: 'Yes' | 'No' }[];
  error?: string;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ label, name, value, onChange, options, error }) => {
  const hasError = !!error;
  return (
    <div>
      <label className={`block text-sm font-bold ${hasError ? 'text-red-700' : 'text-gray-700'} mb-1`}>{label}</label>
      <div className="flex items-center space-x-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              aria-describedby={hasError ? `${name}-error` : undefined}
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormRadioGroup;
