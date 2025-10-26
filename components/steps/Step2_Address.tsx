
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import FormRadioGroup from '../FormRadioGroup';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';
import { AnimatePresence, motion } from 'framer-motion';

const Step2Address: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { address } = state.data;
  const { errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'address', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="Address and Phone Information" description="Provide your current contact details.">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Home Address</h3>
        <FormInput label="Street Address" name="street" value={address.street} onChange={handleChange} required error={errors.street} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="City" name="city" value={address.city} onChange={handleChange} required error={errors.city} />
          <FormInput label="State/Province" name="state" value={address.state} onChange={handleChange} required error={errors.state} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Postal Code" name="postalCode" value={address.postalCode} onChange={handleChange} error={errors.postalCode} />
          <FormInput label="Country" name="country" value={address.country} onChange={handleChange} required error={errors.country} />
        </div>
        
        <div className="pt-4 border-t">
            <FormRadioGroup
              label="Is your Mailing Address the same as your Home Address?"
              name="isMailingAddressSame"
              value={address.isMailingAddressSame}
              onChange={handleChange}
              options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
              error={errors.isMailingAddressSame}
            />
        </div>

        <AnimatePresence>
          {address.isMailingAddressSame === 'No' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 overflow-hidden"
            >
              <h3 className="text-lg font-medium text-gray-900 mt-6">Mailing Address</h3>
              <FormInput label="Street Address" name="mailingStreet" value={address.mailingStreet} onChange={handleChange} error={errors.mailingStreet} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="City" name="mailingCity" value={address.mailingCity} onChange={handleChange} error={errors.mailingCity} />
                <FormInput label="State/Province" name="mailingState" value={address.mailingState} onChange={handleChange} error={errors.mailingState} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Postal Code" name="mailingPostalCode" value={address.mailingPostalCode} onChange={handleChange} error={errors.mailingPostalCode} />
                <FormInput label="Country" name="mailingCountry" value={address.mailingCountry} onChange={handleChange} error={errors.mailingCountry} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormInput label="Primary Phone Number" name="primaryPhone" type="tel" value={address.primaryPhone} onChange={handleChange} required error={errors.primaryPhone} />
            <FormInput label="Secondary Phone Number" name="secondaryPhone" type="tel" value={address.secondaryPhone} onChange={handleChange} />
            <FormInput label="Work Phone Number" name="workPhone" type="tel" value={address.workPhone} onChange={handleChange} />
            <FormInput label="Email Address" name="email" type="email" value={address.email} onChange={handleChange} required error={errors.email} />
          </div>
        </div>

      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step2Address;
