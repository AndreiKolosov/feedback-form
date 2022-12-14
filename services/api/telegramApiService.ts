import { TFormData } from '../../types/feedbackForm.types';

export const sendRequestToTelegram = async (data: TFormData) => {
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  const res = await response.json();

  return res;
};
