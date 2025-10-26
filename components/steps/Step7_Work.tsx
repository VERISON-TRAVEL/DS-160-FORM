
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';

const Step7Work: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { work } = state.data;
  const { errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'work', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="Work / Education / Training" description="Provide your current and previous employment or education details.">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Present Employment / School</h3>
        <FormInput label="Primary Occupation" name="primaryOccupation" value={work.primaryOccupation} onChange={handleChange} required error={errors.primaryOccupation} />
        <FormInput label="Present Employer or School Name" name="employerName" value={work.employerName} onChange={handleChange} required error={errors.employerName} />
        <FormInput label="Address" name="employerStreet" value={work.employerStreet} onChange={handleChange} required error={errors.employerStreet} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput label="City" name="employerCity" value={work.employerCity} onChange={handleChange} required error={errors.employerCity} />
          <FormInput label="State/Province" name="employerState" value={work.employerState} onChange={handleChange} />
          <FormInput label="ZIP Code" name="employerZip" value={work.employerZip} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Country" name="employerCountry" value={work.employerCountry} onChange={handleChange} required error={errors.employerCountry} />
            <FormInput label="Monthly Salary (Local Currency)" name="monthlySalary" value={work.monthlySalary} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="duties" className="block text-sm font-bold text-gray-700 mb-1">
            Brief Description of Duties
          </label>
          <textarea
            id="duties"
            name="duties"
            rows={4}
            value={work.duties}
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {/* Optional: Add section for previous employment here */}
      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step7Work;
