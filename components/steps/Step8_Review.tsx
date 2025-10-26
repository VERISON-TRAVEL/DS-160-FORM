
import React, { useState, useRef } from 'react';
import { useFormContext } from '../../context/FormContext';
import { generatePdf, downloadPdf } from '../../services/pdfService';
import { submitToFormspree } from '../../services/formspreeService';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const ReviewEntry: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || 'N/A'}</dd>
  </div>
);

const ReviewSection: React.FC<{ title: string; children: React.ReactNode; onEdit: () => void }> = ({ title, children, onEdit }) => (
  <Disclosure as="div" className="mt-2" defaultOpen>
    {({ open }) => (
      <>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
          <span>{title}</span>
          <div className="flex items-center">
            <button onClick={onEdit} className="text-xs font-semibold text-blue-600 hover:text-blue-800 mr-4">EDIT</button>
            <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-blue-500`} />
          </div>
        </Disclosure.Button>
        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 border border-t-0 rounded-b-lg">
          {children}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

const Step8Review: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const reviewContentRef = useRef<HTMLDivElement>(null);
  
  const handleEdit = (step: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  };
  
  const handleDownload = async () => {
    if (reviewContentRef.current) {
      await downloadPdf(reviewContentRef.current, 'ds160-application.pdf');
    }
  };

  const handleSubmit = async () => {
    if (!reviewContentRef.current) return;
    setStatus('submitting');
    try {
      const pdfBlob = await generatePdf(reviewContentRef.current);
      if (pdfBlob) {
        await submitToFormspree(pdfBlob, state.data);
        setStatus('success');
      } else {
        throw new Error('PDF generation failed.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          dispatch({ type: 'LOAD_DATA', payload: data });
          alert('Data loaded successfully!');
        } catch (error) {
          alert('Failed to load data. Invalid file format.');
        }
      };
      reader.readAsText(file);
    }
  };
  
  const handleFileExport = () => {
    const dataStr = JSON.stringify(state.data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'ds160-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  if (status === 'success') {
    return (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Application Submitted!</h2>
            <p className="mt-2 text-gray-600">Your application has been sent successfully. Thank you.</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">Review Your Application</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Please review all information carefully before submitting. You can edit any section by clicking the "EDIT" button.</p>
        
        <div className="my-6 space-x-2">
            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Import JSON
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".json" onChange={handleFileUpload} />
            <button onClick={handleFileExport} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Export JSON
            </button>
        </div>
        
        <div ref={reviewContentRef} className="p-4 bg-gray-50 rounded">
            <ReviewSection title="Personal Information" onEdit={() => handleEdit(1)}>
                <ReviewEntry label="Full Name" value={`${state.data.personal.givenName} ${state.data.personal.surname}`} />
                <ReviewEntry label="Date of Birth" value={state.data.personal.dob} />
                <ReviewEntry label="Nationality" value={state.data.personal.nationality} />
            </ReviewSection>
            <ReviewSection title="Address and Phone" onEdit={() => handleEdit(2)}>
                <ReviewEntry label="Home Address" value={`${state.data.address.street}, ${state.data.address.city}, ${state.data.address.country}`} />
                <ReviewEntry label="Email" value={state.data.address.email} />
            </ReviewSection>
            {/* ... Add other ReviewSection components here for each step ... */}
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button type="button" onClick={() => dispatch({type: 'PREV_STEP'})} className="w-full sm:w-auto px-6 py-2 text-base font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300">Back</button>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                 <button type="button" onClick={handleDownload} className="px-6 py-2 text-base font-medium text-blue-700 bg-blue-100 rounded-md shadow-sm hover:bg-blue-200">Download PDF</button>
                 <button type="button" onClick={handleSubmit} disabled={status === 'submitting'} className="px-6 py-2 text-base font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 disabled:bg-gray-400">
                    {status === 'submitting' ? 'Submitting...' : 'Sign and Submit'}
                </button>
            </div>
        </div>

        {status === 'error' && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                <span>Submission failed. Please try again later.</span>
            </div>
        )}
    </div>
  );
};

export default Step8Review;
