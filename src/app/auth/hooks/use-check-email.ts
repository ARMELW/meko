import { useState, useRef } from 'react';
import { checkEmailExists, CheckEmailData } from '../api/check-email';

export function useCheckEmail() {
  const [loading, setLoading] = useState(false);
  const lastEmailChecked = useRef<string | null>(null);
  const lastResult = useRef<{ exists: boolean; message?: string } | null>(null);

  const checkEmail = async (data: CheckEmailData) => {
    // Éviter les appels multiples pour le même email
    if (loading) {
      return lastResult.current || { exists: false };
    }

    // Si on a déjà vérifié ce même email, retourner le résultat en cache
    if (lastEmailChecked.current === data.email && lastResult.current) {
      return lastResult.current;
    }

    setLoading(true);
    try {
      const result = await checkEmailExists(data);
      
      // Mettre en cache le résultat
      lastEmailChecked.current = data.email;
      lastResult.current = result;
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    lastEmailChecked.current = null;
    lastResult.current = null;
  };

  return {
    checkEmail,
    loading,
    clearCache
  };
}
