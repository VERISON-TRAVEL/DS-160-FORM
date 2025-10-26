
import React from 'react';
import { useFormContext } from '../context/FormContext';
import { validateStep } from '../services/validationService';

const NavigationButtons: React.FC = () => {
  const { state, dispatch } = useFormContext();

  const handleNext = () => {
    const errors = validateStep(state.currentStep, state.data);
    if (Object.keys(errors).length === 0) {
      dispatch({ type: 'SET_ERRORS', payload: {} });
      dispatch({ type: 'NEXT_STEP' });
    } else {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    }
  };
  
  const handlePrev = () => {
    dispatch({ type: 'SET_ERRORS', payload: {} }); // Clear errors when going back
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <div className="flex justify-between mt-8 border-t pt-6">
      <button
        type="button"
        onClick={handlePrev}
        disabled={state.currentStep === 1}
        className="px-6 py-2 text-base font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="px-6 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
