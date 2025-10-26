
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import FormRadioGroup from '../FormRadioGroup';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';

const Step3Passport: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { passport } = state.data;
  const { errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'passport', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="Passport Information" description="Enter your passport details accurately.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect label="Passport Type" name="type" value={passport.type} onChange={handleChange} required error={errors.type}>
            <option value="">Select Type</option>
            <option value="Regular">Regular</option>
            <option value="Official">Official</option>
            <option value="Diplomatic">Diplomatic</option>
          </FormSelect>
          <FormInput label="Passport Number" name="number" value={passport.number} onChange={handleChange} required error={errors.number} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Passport Book Number (optional)" name="bookNumber" value={passport.bookNumber} onChange={handleChange} />
          <FormInput label="Country/Authority that issued Passport" name="issuingCountry" value={passport.issuingCountry} onChange={handleChange} required error={errors.issuingCountry} />
        </div>
        <FormInput label="City of Issuance" name="issuingCity" value={passport.issuingCity} onChange={handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Issue Date" name="issueDate" type="date" value={passport.issueDate} onChange={handleChange} required error={errors.issueDate} />
          <FormInput label="Expiration Date" name="expirationDate" type="date" value={passport.expirationDate} onChange={handleChange} required error={errors.expirationDate} />
        </div>
        <FormRadioGroup
          label="Have you ever lost a passport or had one stolen?"
          name="lostOrStolen"
          value={passport.lostOrStolen}
          onChange={handleChange}
          options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
          error={errors.lostOrStolen}
        />
      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step3Passport;
