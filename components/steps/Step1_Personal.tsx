
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import FormRadioGroup from '../FormRadioGroup';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';

const Step1Personal: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { personal } = state.data;
  const { errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'personal', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="Personal Information" description="Please enter your personal details as they appear on your official documents.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Surname (Last Name)" name="surname" value={personal.surname} onChange={handleChange} required error={errors.surname} />
          <FormInput label="Given Names (First Name)" name="givenName" value={personal.givenName} onChange={handleChange} required error={errors.givenName} />
        </div>
        <FormInput label="Full Name in Native Alphabet" name="fullNameNative" value={personal.fullNameNative} onChange={handleChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormInput label="Date of Birth" name="dob" type="date" value={personal.dob} onChange={handleChange} required error={errors.dob} />
           <FormSelect label="Gender" name="gender" value={personal.gender} onChange={handleChange} required error={errors.gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </FormSelect>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput label="Place of Birth (City)" name="birthCity" value={personal.birthCity} onChange={handleChange} required error={errors.birthCity} />
          <FormInput label="Place of Birth (State/Province)" name="birthState" value={personal.birthState} onChange={handleChange} />
          <FormInput label="Place of Birth (Country)" name="birthCountry" value={personal.birthCountry} onChange={handleChange} required error={errors.birthCountry} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Nationality" name="nationality" value={personal.nationality} onChange={handleChange} required error={errors.nationality} />
          <FormSelect label="Marital Status" name="maritalStatus" value={personal.maritalStatus} onChange={handleChange} required error={errors.maritalStatus}>
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </FormSelect>
        </div>

        <FormRadioGroup
          label="Other Names Used (e.g., maiden, religious, professional, alias)?"
          name="otherNamesUsed"
          value={personal.otherNamesUsed}
          onChange={handleChange}
          options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
          error={errors.otherNamesUsed}
        />

        <FormRadioGroup
          label="Other Nationalities Held?"
          name="otherNationalitiesHeld"
          value={personal.otherNationalitiesHeld}
          onChange={handleChange}
          options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
          error={errors.otherNationalitiesHeld}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput label="National Identification Number" name="nationalId" value={personal.nationalId} onChange={handleChange} />
          <FormInput label="U.S. Social Security Number (optional)" name="usSsn" value={personal.usSsn} onChange={handleChange} />
          <FormInput label="U.S. Taxpayer ID Number (optional)" name="usTaxpayerId" value={personal.usTaxpayerId} onChange={handleChange} />
        </div>
      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step1Personal;
