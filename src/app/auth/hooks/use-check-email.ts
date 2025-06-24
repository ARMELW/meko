import { useState } from 'react';
import { checkEmailExists, CheckEmailData } from '../api/check-email';

export function useCheckEmail() {
  const [loading, setLoading] = useState(false);

  const checkEmail = async (data: CheckEmailData) => {
    setLoading(true);
    try {
      const result = await checkEmailExists(data);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkEmail,
    loading
  };
}
