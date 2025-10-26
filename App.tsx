
import React from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import ProgressBar from './components/ProgressBar';
import Step1Personal from './components/steps/Step1_Personal';
import Step2Address from './components/steps/Step2_Address';
import Step3Passport from './components/steps/Step3_Passport';
import Step4Travel from './components/steps/Step4_Travel';
import Step5Contact from './components/steps/Step5_Contact';
import Step6Family from './components/steps/Step6_Family';
import Step7Work from './components/steps/Step7_Work';
import Step8Review from './components/steps/Step8_Review';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Address & Phone' },
  { id: 3, name: 'Passport' },
  { id: 4, name: 'Travel' },
  { id: 5, name: 'U.S. Contact' },
  { id: 6, name: 'Family' },
  { id: 7, name: 'Work & Education' },
  { id: 8, name: 'Review & Submit' },
];

const StepComponent: React.FC = () => {
  const { state } = useFormContext();

  const renderStep = () => {
    switch (state.currentStep) {
      case 1: return <Step1Personal />;
      case 2: return <Step2Address />;
      case 3: return <Step3Passport />;
      case 4: return <Step4Travel />;
      case 5: return <Step5Contact />;
      case 6: return <Step6Family />;
      case 7: return <Step7Work />;
      case 8: return <Step8Review />;
      default: return <Step1Personal />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <FormProvider>
      <div className="min-h-screen font-sans text-gray-800">
        <header className="bg-brand-blue shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">DS-160 Application Form</h1>
            <p className="text-white text-opacity-80">Online Nonimmigrant Visa Application</p>
          </div>
        </header>
        <main className="container mx-auto p-4 md:p-8">
            <ProgressBar steps={steps.map(s => s.name)} />
            <div className="mt-8">
              <StepComponent />
            </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default App;
