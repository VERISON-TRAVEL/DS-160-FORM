
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { produce } from 'immer';
import { FormData, FormState, FormAction } from '../types';

const initialFormData: FormData = {
  personal: {
    surname: '', givenName: '', fullNameNative: '', otherNamesUsed: '', otherNames: [],
    dob: '', birthCity: '', birthState: '', birthCountry: '', nationality: '',
    otherNationalitiesHeld: '', otherNationalities: [], gender: '', maritalStatus: '',
    nationalId: '', usSsn: '', usTaxpayerId: '',
  },
  address: {
    street: '', city: '', state: '', postalCode: '', country: '',
    isMailingAddressSame: '', mailingStreet: '', mailingCity: '', mailingState: '',
    mailingPostalCode: '', mailingCountry: '', primaryPhone: '', secondaryPhone: '',
    workPhone: '', email: '',
  },
  passport: {
    type: '', number: '', bookNumber: '', issuingCountry: '', issuingCity: '',
    issueDate: '', expirationDate: '', lostOrStolen: '',
  },
  travel: {
    isPrincipalApplicant: '', purposeOfTrip: '', arrivalDate: '', stayLength: '',
    stayUnit: '', usAddress: '', tripPayer: '', payerName: '', payerRelationship: '',
    payerAddress: '', payerPhone: '', payerEmail: '', travelingWithOthers: '',
    companions: [], everInUS: '', everIssuedVisa: '', everRefusedVisa: '',
  },
  contact: {
    personName: '', orgName: '', relationship: '', street: '', city: '', state: '',
    zip: '', phone: '', email: '',
  },
  family: {
    fatherSurname: '', fatherGivenName: '', fatherDob: '', fatherInUS: '',
    motherSurname: '', motherGivenName: '', motherDob: '', motherInUS: '',
    immediateRelativesInUS: '', relatives: [], spouseFullName: '', spouseDob: '',
    spouseNationality: '', spouseBirthCity: '', spouseBirthCountry: '', spouseAddress: '',
  },
  work: {
    primaryOccupation: '', employerName: '', employerStreet: '', employerCity: '',
    employerState: '', employerZip: '', employerCountry: '', monthlySalary: '',
    duties: '', previousEmployments: [],
  },
};

const initialState: FormState = {
  currentStep: 1,
  data: initialFormData,
  errors: {},
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  return produce(state, draft => {
    switch (action.type) {
      case 'UPDATE_FIELD': {
        const { section, field, value, index, subfield } = action.payload;
        if (index !== undefined && subfield) {
            (draft.data[section] as any)[field][index][subfield] = value;
        } else {
            (draft.data[section] as any)[field] = value;
        }
        // Clear error for the field being updated
        if (draft.errors[field]) {
          delete draft.errors[field];
        }
        break;
      }
      case 'ADD_ITEM': {
          const { section, field, item } = action.payload;
          (draft.data[section] as any)[field].push(item);
          break;
      }
      case 'REMOVE_ITEM': {
          const { section, field, index } = action.payload;
          (draft.data[section] as any)[field].splice(index, 1);
          break;
      }
      case 'NEXT_STEP':
        if (draft.currentStep < 8) draft.currentStep++;
        break;
      case 'PREV_STEP':
        if (draft.currentStep > 1) draft.currentStep--;
        break;
      case 'GO_TO_STEP':
        draft.currentStep = action.payload;
        break;
      case 'LOAD_DATA':
        draft.data = action.payload;
        break;
      case 'SET_ERRORS':
        draft.errors = action.payload;
        break;
    }
  });
};

const FormContext = createContext<{ state: FormState; dispatch: React.Dispatch<FormAction> } | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
