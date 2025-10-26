
import { FormData } from '../types';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwdkapw';

export const submitToFormspree = async (pdfBlob: Blob, data: FormData): Promise<Response> => {
  const formData = new window.FormData();
  formData.append('upload', pdfBlob, 'ds160-application.pdf');
  formData.append('email', data.address.email);
  formData.append('name', `${data.personal.givenName} ${data.personal.surname}`);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Form submission failed with status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('An error occurred during form submission:', error);
    throw error;
  }
};
