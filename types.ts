
export interface FormData {
  personal: {
    surname: string;
    givenName: string;
    fullNameNative: string;
    otherNamesUsed: 'Yes' | 'No' | '';
    otherNames: { surname: string; givenName: string }[];
    dob: string;
    birthCity: string;
    birthState: string;
    birthCountry: string;
    nationality: string;
    otherNationalitiesHeld: 'Yes' | 'No' | '';
    otherNationalities: { country: string }[];
    gender: 'Male' | 'Female' | '';
    maritalStatus: 'Married' | 'Single' | 'Divorced' | 'Widowed' | '';
    nationalId: string;
    usSsn: string;
    usTaxpayerId: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isMailingAddressSame: 'Yes' | 'No' | '';
    mailingStreet: string;
    mailingCity: string;
    mailingState: string;
    mailingPostalCode: string;
    mailingCountry: string;
    primaryPhone: string;
    secondaryPhone: string;
    workPhone: string;
    email: string;
  };
  passport: {
    type: 'Regular' | 'Official' | 'Diplomatic' | '';
    number: string;
    bookNumber: string;
    issuingCountry: string;
    issuingCity: string;
    issueDate: string;
    expirationDate: string;
    lostOrStolen: 'Yes' | 'No' | '';
  };
  travel: {
    isPrincipalApplicant: 'Yes' | 'No' | '';
    purposeOfTrip: string;
    arrivalDate: string;
    stayLength: string;
    stayUnit: 'Days' | 'Months' | 'Years' | '';
    usAddress: string;
    tripPayer: 'Self' | 'Company' | 'Other' | '';
    payerName: string;
    payerRelationship: string;
    payerAddress: string;
    payerPhone: string;
    payerEmail: string;
    travelingWithOthers: 'Yes' | 'No' | '';
    companions: { name: string; relationship: string }[];
    everInUS: 'Yes' | 'No' | '';
    everIssuedVisa: 'Yes' | 'No' | '';
    everRefusedVisa: 'Yes' | 'No' | '';
  };
  contact: {
    personName: string;
    orgName: string;
    relationship: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
  };
  family: {
    fatherSurname: string;
    fatherGivenName: string;
    fatherDob: string;
    fatherInUS: 'Yes' | 'No' | '';
    motherSurname: string;
    motherGivenName: string;
    motherDob: string;
    motherInUS: 'Yes' | 'No' | '';
    immediateRelativesInUS: 'Yes' | 'No' | '';
    relatives: { name: string; relationship: string; status: string }[];
    spouseFullName: string;
    spouseDob: string;
    spouseNationality: string;
    spouseBirthCity: string;
    spouseBirthCountry: string;
    spouseAddress: string;
  };
  work: {
    primaryOccupation: string;
    employerName: string;
    employerStreet: string;
    employerCity: string;
    employerState: string;
    employerZip: string;
    employerCountry: string;
    monthlySalary: string;
    duties: string;
    previousEmployments: { employer: string; from: string; to: string }[];
  };
}

export interface FormState {
  currentStep: number;
  data: FormData;
  errors: { [key: string]: string };
}

export type FormAction =
  | { type: 'UPDATE_FIELD'; payload: { section: keyof FormData; field: string; value: any; index?: number; subfield?: string; } }
  | { type: 'ADD_ITEM'; payload: { section: keyof FormData; field: string; item: any } }
  | { type: 'REMOVE_ITEM'; payload: { section: keyof FormData; field: string; index: number } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'LOAD_DATA'; payload: FormData }
  | { type: 'SET_ERRORS'; payload: { [key: string]: string } };
