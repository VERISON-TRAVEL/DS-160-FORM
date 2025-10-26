
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import FormRadioGroup from '../FormRadioGroup';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';
import { AnimatePresence, motion } from 'framer-motion';

const Step6Family: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { family } = state.data;
  const { maritalStatus } = state.data.personal;
  const { errors } = state;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'family', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="Family Information" description="Provide details about your immediate family.">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Father's Information</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Father’s Surname" name="fatherSurname" value={family.fatherSurname} onChange={handleChange} required error={errors.fatherSurname} />
            <FormInput label="Father’s Given Names" name="fatherGivenName" value={family.fatherGivenName} onChange={handleChange} required error={errors.fatherGivenName} />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Father’s Date of Birth" name="fatherDob" type="date" value={family.fatherDob} onChange={handleChange} required error={errors.fatherDob} />
            <FormRadioGroup label="Is your father in the U.S.?" name="fatherInUS" value={family.fatherInUS} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.fatherInUS} />
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium text-gray-900">Mother's Information</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Mother’s Surname" name="motherSurname" value={family.motherSurname} onChange={handleChange} required error={errors.motherSurname} />
            <FormInput label="Mother’s Given Names" name="motherGivenName" value={family.motherGivenName} onChange={handleChange} required error={errors.motherGivenName} />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Mother’s Date of Birth" name="motherDob" type="date" value={family.motherDob} onChange={handleChange} required error={errors.motherDob} />
            <FormRadioGroup label="Is your mother in the U.S.?" name="motherInUS" value={family.motherInUS} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.motherInUS} />
          </div>
        </div>
        
        <div className="pt-6 border-t">
            <FormRadioGroup label="Do you have immediate relatives in the U.S.?" name="immediateRelativesInUS" value={family.immediateRelativesInUS} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.immediateRelativesInUS} />
        </div>

        <AnimatePresence>
          {maritalStatus === 'Married' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-6 border-t space-y-6 overflow-hidden"
            >
              <h3 className="text-lg font-medium text-gray-900">Spouse's Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Spouse’s Full Name" name="spouseFullName" value={family.spouseFullName} onChange={handleChange} error={errors.spouseFullName} />
                <FormInput label="Spouse’s Date of Birth" name="spouseDob" type="date" value={family.spouseDob} onChange={handleChange} error={errors.spouseDob} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Spouse’s Nationality" name="spouseNationality" value={family.spouseNationality} onChange={handleChange} error={errors.spouseNationality} />
                <FormInput label="Spouse’s City of Birth" name="spouseBirthCity" value={family.spouseBirthCity} onChange={handleChange} error={errors.spouseBirthCity} />
              </div>
               <FormInput label="Spouse’s Country of Birth" name="spouseBirthCountry" value={family.spouseBirthCountry} onChange={handleChange} error={errors.spouseBirthCountry} />
              <FormInput label="Spouse’s Address" name="spouseAddress" value={family.spouseAddress} onChange={handleChange} error={errors.spouseAddress} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step6Family;
