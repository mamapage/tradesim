
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isInvalid?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, id, className, isInvalid, ...props }) => {
  const baseClasses = "w-full bg-gray-700 border text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-colors duration-200";
  
  const stateClasses = isInvalid 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-600 focus:ring-green-500 focus:border-green-500';

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <input
        id={id}
        className={`${baseClasses} ${stateClasses} ${className || ''}`}
        {...props}
      />
    </div>
  );
};
