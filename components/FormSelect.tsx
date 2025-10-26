
import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, children, error, ...rest }) => {
  const hasError = !!error;
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`block w-full pl-3 pr-10 py-2 text-base border rounded-md ${
          hasError
            ? 'border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        }`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...rest}
      >
        {children}
      </select>
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
