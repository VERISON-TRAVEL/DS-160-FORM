
import { FormData } from '../types';

type Errors = { [key: string]: string };

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateStep1 = (data: FormData['personal']): Errors => {
  const errors: Errors = {};
  if (!data.surname) errors.surname = 'Surname is required.';
  if (!data.givenName) errors.givenName = 'Given Name is required.';
  if (!data.dob) errors.dob = 'Date of Birth is required.';
  if (!data.birthCity) errors.birthCity = 'City of Birth is required.';
  if (!data.birthCountry) errors.birthCountry = 'Country of Birth is required.';
  if (!data.nationality) errors.nationality = 'Nationality is required.';
  if (!data.gender) errors.gender = 'Gender is required.';
  if (!data.maritalStatus) errors.maritalStatus = 'Marital Status is required.';
  if (!data.otherNamesUsed) errors.otherNamesUsed = 'Please answer this question.';
  if (!data.otherNationalitiesHeld) errors.otherNationalitiesHeld = 'Please answer this question.';
  return errors;
};

const validateStep2 = (data: FormData['address']): Errors => {
  const errors: Errors = {};
  if (!data.street) errors.street = 'Street Address is required.';
  if (!data.city) errors.city = 'City is required.';
  if (!data.state) errors.state = 'State/Province is required.';
  if (!data.country) errors.country = 'Country is required.';
  if (!data.isMailingAddressSame) errors.isMailingAddressSame = 'Please answer this question.';
  if (data.isMailingAddressSame === 'No') {
    if (!data.mailingStreet) errors.mailingStreet = 'Street Address is required.';
    if (!data.mailingCity) errors.mailingCity = 'City is required.';
    if (!data.mailingState) errors.mailingState = 'State/Province is required.';
    if (!data.mailingCountry) errors.mailingCountry = 'Country is required.';
  }
  if (!data.primaryPhone) errors.primaryPhone = 'Primary Phone is required.';
  if (!data.email) errors.email = 'Email Address is required.';
  else if (!validateEmail(data.email)) errors.email = 'Please enter a valid email address.';
  return errors;
};

const validateStep3 = (data: FormData['passport']): Errors => {
  const errors: Errors = {};
  if (!data.type) errors.type = 'Passport Type is required.';
  if (!data.number) errors.number = 'Passport Number is required.';
  if (!data.issuingCountry) errors.issuingCountry = 'Issuing Country is required.';
  if (!data.issueDate) errors.issueDate = 'Issue Date is required.';
  if (!data.expirationDate) errors.expirationDate = 'Expiration Date is required.';
  if (!data.lostOrStolen) errors.lostOrStolen = 'Please answer this question.';
  return errors;
};

const validateStep4 = (data: FormData['travel']): Errors => {
  const errors: Errors = {};
  if (!data.isPrincipalApplicant) errors.isPrincipalApplicant = 'Please answer this question.';
  if (!data.purposeOfTrip) errors.purposeOfTrip = 'Purpose of Trip is required.';
  if (!data.arrivalDate) errors.arrivalDate = 'Arrival Date is required.';
  if (!data.stayLength) errors.stayLength = 'Length of Stay is required.';
  if (!data.stayUnit) errors.stayUnit = 'Please select a unit.';
  if (!data.usAddress) errors.usAddress = 'U.S. Address is required.';
  if (!data.tripPayer) errors.tripPayer = 'Please select who is paying.';
  if (data.tripPayer === 'Other') {
    if (!data.payerName) errors.payerName = "Payer's Name is required.";
    if (!data.payerRelationship) errors.payerRelationship = "Payer's Relationship is required.";
  }
  if (!data.travelingWithOthers) errors.travelingWithOthers = 'Please answer this question.';
  if (!data.everInUS) errors.everInUS = 'Please answer this question.';
  if (!data.everIssuedVisa) errors.everIssuedVisa = 'Please answer this question.';
  if (!data.everRefusedVisa) errors.everRefusedVisa = 'Please answer this question.';
  return errors;
};

const validateStep5 = (data: FormData['contact']): Errors => {
  const errors: Errors = {};
  if (!data.personName && !data.orgName) errors.personName = 'Contact Person or Organization Name is required.';
  if (!data.street) errors.street = 'Street is required.';
  if (!data.city) errors.city = 'City is required.';
  if (!data.state) errors.state = 'State is required.';
  if (!data.zip) errors.zip = 'ZIP Code is required.';
  if (!data.phone) errors.phone = 'Phone Number is required.';
  return errors;
};

const validateStep6 = (data: FormData): Errors => {
  const errors: Errors = {};
  const { family, personal } = data;
  if (!family.fatherSurname) errors.fatherSurname = "Father's Surname is required.";
  if (!family.fatherGivenName) errors.fatherGivenName = "Father's Given Name is required.";
  if (!family.fatherDob) errors.fatherDob = "Father's Date of Birth is required.";
  if (!family.fatherInUS) errors.fatherInUS = 'Please answer this question.';
  if (!family.motherSurname) errors.motherSurname = "Mother's Surname is required.";
  if (!family.motherGivenName) errors.motherGivenName = "Mother's Given Name is required.";
  if (!family.motherDob) errors.motherDob = "Mother's Date of Birth is required.";
  if (!family.motherInUS) errors.motherInUS = 'Please answer this question.';
  if (!family.immediateRelativesInUS) errors.immediateRelativesInUS = 'Please answer this question.';
  
  if (personal.maritalStatus === 'Married') {
      if (!family.spouseFullName) errors.spouseFullName = "Spouse's Full Name is required.";
      if (!family.spouseDob) errors.spouseDob = "Spouse's Date of Birth is required.";
      if (!family.spouseNationality) errors.spouseNationality = "Spouse's Nationality is required.";
      if (!family.spouseBirthCity) errors.spouseBirthCity = "Spouse's City of Birth is required.";
      if (!family.spouseBirthCountry) errors.spouseBirthCountry = "Spouse's Country of Birth is required.";
      if (!family.spouseAddress) errors.spouseAddress = "Spouse's Address is required.";
  }

  return errors;
};

const validateStep7 = (data: FormData['work']): Errors => {
  const errors: Errors = {};
  if (!data.primaryOccupation) errors.primaryOccupation = 'Primary Occupation is required.';
  if (!data.employerName) errors.employerName = 'Employer/School Name is required.';
  if (!data.employerStreet) errors.employerStreet = 'Address is required.';
  if (!data.employerCity) errors.employerCity = 'City is required.';
  if (!data.employerCountry) errors.employerCountry = 'Country is required.';
  return errors;
};


export const validateStep = (step: number, data: FormData): Errors => {
  switch (step) {
    case 1: return validateStep1(data.personal);
    case 2: return validateStep2(data.address);
    case 3: return validateStep3(data.passport);
    case 4: return validateStep4(data.travel);
    case 5: return validateStep5(data.contact);
    case 6: return validateStep6(data);
    case 7: return validateStep7(data.work);
    default: return {};
  }
};
