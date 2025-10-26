
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';

const Step5Contact: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { contact } = state.data;
  const { errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'contact', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="U.S. Contact Information" description="Provide details of your contact person or organization in the United States.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Contact Person Name in the U.S." name="personName" value={contact.personName} onChange={handleChange} error={errors.personName} />
          <FormInput label="Organization Name (if applicable)" name="orgName" value={contact.orgName} onChange={handleChange} error={errors.orgName} />
        </div>
        <FormInput label="Relationship to You" name="relationship" value={contact.relationship} onChange={handleChange} error={errors.relationship} />
        <FormInput label="Address (Street)" name="street" value={contact.street} onChange={handleChange} error={errors.street} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput label="City" name="city" value={contact.city} onChange={handleChange} error={errors.city} />
          <FormInput label="State" name="state" value={contact.state} onChange={handleChange} error={errors.state} />
          <FormInput label="ZIP Code" name="zip" value={contact.zip} onChange={handleChange} error={errors.zip} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Phone Number" name="phone" type="tel" value={contact.phone} onChange={handleChange} error={errors.phone} />
          <FormInput label="Email Address" name="email" type="email" value={contact.email} onChange={handleChange} error={errors.email} />
        </div>
      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step5Contact;
