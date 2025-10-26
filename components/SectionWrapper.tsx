
import React from 'react';

interface SectionWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      </div>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
