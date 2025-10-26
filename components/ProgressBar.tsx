
import React from 'react';
import { useFormContext } from '../context/FormContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ProgressBarProps {
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  const { state } = useFormContext();
  const currentStep = state.currentStep;
  const totalSteps = steps.length;

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={index} className="z-10 text-center">
                <div
                  className={`mx-auto w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isActive ? 'bg-blue-600 text-white scale-110' : ''}
                    ${!isCompleted && !isActive ? 'bg-white border-2 border-gray-300' : ''}
                  `}
                >
                  {isCompleted ? <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" /> : stepNumber}
                </div>
                <p
                  className={`mt-2 text-xs md:text-sm
                    ${isActive ? 'font-bold text-blue-600' : 'text-gray-500'}
                  `}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
