
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import FormRadioGroup from '../FormRadioGroup';
import NavigationButtons from '../NavigationButtons';
import SectionWrapper from '../SectionWrapper';
import { AnimatePresence, motion } from 'framer-motion';

const Step4Travel: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { travel } = state.data;
  const { errors } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { section: 'travel', field: e.target.name, value: e.target.value },
    });
  };

  return (
    <SectionWrapper title="Travel Information" description="Provide details about your planned trip to the U.S.">
      <div className="space-y-6">
        <FormRadioGroup
          label="Are you the principal applicant?"
          name="isPrincipalApplicant"
          value={travel.isPrincipalApplicant}
          onChange={handleChange}
          options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
          error={errors.isPrincipalApplicant}
        />
        <FormInput label="Purpose of Trip to the U.S." name="purposeOfTrip" value={travel.purposeOfTrip} onChange={handleChange} required error={errors.purposeOfTrip} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Intended Date of Arrival" name="arrivalDate" type="date" value={travel.arrivalDate} onChange={handleChange} required error={errors.arrivalDate} />
          <div className="flex items-end gap-2">
            <FormInput label="Intended Length of Stay" name="stayLength" type="number" value={travel.stayLength} onChange={handleChange} required error={errors.stayLength} />
            <FormSelect name="stayUnit" value={travel.stayUnit} onChange={handleChange} label="" className="mb-0" required error={errors.stayUnit}>
              <option value="">Unit</option>
              <option value="Days">Days</option>
              <option value="Months">Months</option>
              <option value="Years">Years</option>
            </FormSelect>
          </div>
        </div>
        <FormInput label="Address where you will stay in the U.S." name="usAddress" value={travel.usAddress} onChange={handleChange} required error={errors.usAddress} />
        
        <div className="pt-4 border-t">
          <FormSelect label="Person/Entity Paying for Your Trip" name="tripPayer" value={travel.tripPayer} onChange={handleChange} required error={errors.tripPayer}>
            <option value="">Select Payer</option>
            <option value="Self">Self</option>
            <option value="Company">Company</option>
            <option value="Other">Other Person</option>
          </FormSelect>
        </div>
        
        <AnimatePresence>
          {travel.tripPayer === 'Other' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 overflow-hidden border p-4 rounded-md"
            >
              <h3 className="text-md font-medium text-gray-900">Payer's Information</h3>
              <FormInput label="Name" name="payerName" value={travel.payerName} onChange={handleChange} error={errors.payerName} />
              <FormInput label="Relationship to You" name="payerRelationship" value={travel.payerRelationship} onChange={handleChange} error={errors.payerRelationship} />
              <FormInput label="Address" name="payerAddress" value={travel.payerAddress} onChange={handleChange} />
              <FormInput label="Phone Number" name="payerPhone" value={travel.payerPhone} onChange={handleChange} />
              <FormInput label="Email Address" name="payerEmail" value={travel.payerEmail} onChange={handleChange} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="pt-4 border-t space-y-4">
          <FormRadioGroup label="Are you traveling with others?" name="travelingWithOthers" value={travel.travelingWithOthers} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.travelingWithOthers} />
          <FormRadioGroup label="Have you ever been in the U.S.?" name="everInUS" value={travel.everInUS} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.everInUS} />
          <FormRadioGroup label="Have you ever been issued a U.S. Visa?" name="everIssuedVisa" value={travel.everIssuedVisa} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.everIssuedVisa} />
          <FormRadioGroup label="Have you ever been refused a U.S. Visa or entry?" name="everRefusedVisa" value={travel.everRefusedVisa} onChange={handleChange} options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]} error={errors.everRefusedVisa} />
        </div>
      </div>
      <NavigationButtons />
    </SectionWrapper>
  );
};

export default Step4Travel;
