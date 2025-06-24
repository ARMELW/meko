import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ApiError {
  type: 'ERR_REQUEST' | 'ERR_REQUEST_NO_DATA' | 'ERR_NETWORK';
  data: {
    message?: string;
    error?: string;
    statusCode?: number;
    details?: Record<string, unknown>;
  };
}

interface BackendErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  details?: {
    code?: string;
    field?: string;
    [key: string]: unknown;
  };
}

/**
 * Mappe les erreurs backend vers des clés de traduction
 */
const ERROR_CODE_MAPPING: Record<string, string> = {
  // Erreurs d'authentification
  'EMAIL_ALREADY_EXISTS': 'errors.backend.email.alreadyExists',
  'INVALID_CREDENTIALS': 'errors.backend.auth.invalidCredentials',
  'INVALID_OTP': 'errors.backend.auth.invalidOtp',
  'OTP_EXPIRED': 'errors.backend.auth.otpExpired',
  'USER_NOT_FOUND': 'errors.backend.auth.userNotFound',
  
  // Erreurs de validation
  'VALIDATION_ERROR': 'errors.backend.validation.error',
  'MISSING_REQUIRED_FIELD': 'errors.backend.validation.required',
  'INVALID_FORMAT': 'errors.backend.validation.format',
  
  // Erreurs enfant
  'CHILD_NOT_FOUND': 'errors.backend.child.notFound',
  'CHILD_LIMIT_EXCEEDED': 'errors.backend.child.limitExceeded',
  'CHILD_NAME_TAKEN': 'errors.backend.child.nameTaken',
  
  // Erreurs système
  'INTERNAL_SERVER_ERROR': 'errors.backend.system.internal',
  'SERVICE_UNAVAILABLE': 'errors.backend.system.unavailable',
  'RATE_LIMIT_EXCEEDED': 'errors.backend.system.rateLimit'
};

/**
 * Extraie le code d'erreur depuis la réponse backend
 */
function extractErrorCode(errorData: BackendErrorResponse): string | null {
  // Vérifier s'il y a un code explicite
  if (errorData.details?.code) {
    return errorData.details.code;
  }
  
  // Essayer d'extraire depuis le message
  if (errorData.message) {
    const message = errorData.message.toLowerCase();
    
    if (message.includes('email') && (message.includes('exists') || message.includes('taken'))) {
      return 'EMAIL_ALREADY_EXISTS';
    }
    
    if (message.includes('invalid') && message.includes('credentials')) {
      return 'INVALID_CREDENTIALS';
    }
    
    if (message.includes('invalid') && message.includes('otp')) {
      return 'INVALID_OTP';
    }
    
    if (message.includes('otp') && message.includes('expired')) {
      return 'OTP_EXPIRED';
    }
    
    if (message.includes('user') && message.includes('not found')) {
      return 'USER_NOT_FOUND';
    }
    
    if (message.includes('validation')) {
      return 'VALIDATION_ERROR';
    }
  }
  
  // Essayer d'extraire depuis le statusCode
  if (errorData.statusCode) {
    switch (errorData.statusCode) {
      case 409:
        return 'EMAIL_ALREADY_EXISTS'; // Conflit, probablement email déjà existant
      case 401:
        return 'INVALID_CREDENTIALS';
      case 422:
        return 'VALIDATION_ERROR';
      case 404:
        return 'USER_NOT_FOUND';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      case 503:
        return 'SERVICE_UNAVAILABLE';
      case 429:
        return 'RATE_LIMIT_EXCEEDED';
    }
  }
  
  return null;
}

/**
 * Gère les erreurs API et affiche des messages traduits appropriés
 */
export function handleApiError(error: unknown, t: (key: string) => string, showToast = true): string {
  let errorMessage = t('errors.backend.generic');
  
  try {
    // Vérifier si c'est une erreur API formatée
    if (error && typeof error === 'object' && 'type' in error) {
      const apiError = error as ApiError;
      
      if (apiError.type === 'ERR_REQUEST' && apiError.data) {
        const errorCode = extractErrorCode(apiError.data);
        
        if (errorCode && ERROR_CODE_MAPPING[errorCode]) {
          errorMessage = t(ERROR_CODE_MAPPING[errorCode]);
        } else if (apiError.data.message) {
          // Message brut du backend si pas de mapping
          errorMessage = apiError.data.message;
        }
      } else if (apiError.type === 'ERR_NETWORK') {
        errorMessage = t('errors.backend.network');
      }
    }
    // Vérifier si c'est une erreur Axios directe
    else if (error instanceof AxiosError) {
      if (error.response?.data) {
        const errorCode = extractErrorCode(error.response.data);
        if (errorCode && ERROR_CODE_MAPPING[errorCode]) {
          errorMessage = t(ERROR_CODE_MAPPING[errorCode]);
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (!error.response) {
        errorMessage = t('errors.backend.network');
      }
    }
    // Erreur simple avec message
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
  } catch (parseError) {
    console.error('Erreur lors du parsing de l\'erreur API:', parseError);
    errorMessage = t('errors.backend.generic');
  }
  
  if (showToast) {
    toast.error(errorMessage);
  }
  
  return errorMessage;
}

/**
 * Hook pour gérer facilement les erreurs dans les composants
 */
export function useErrorHandler() {
  return handleApiError;
}

/**
 * Wrapper pour les mutations avec gestion d'erreur automatique
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  t: (key: string) => string,
  showToast = true
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleApiError(error, t, showToast);
      throw error; // Re-throw pour que l'appelant puisse gérer spécifiquement
    }
  }) as T;
}

/**
 * Gère les erreurs API et affiche des messages traduits appropriés (version simplifiée)
 */
export function handleSimpleApiError(error: unknown, showToast = true): void {
  // Import dynamique des hooks React
  try {
    // Message d'erreur générique en attendant l'import des traductions
    let errorMessage = 'Une erreur est survenue';
    
    // Vérifier si c'est une erreur API formatée
    if (error && typeof error === 'object' && 'type' in error) {
      const apiError = error as ApiError;
      
      if (apiError.type === 'ERR_REQUEST' && apiError.data) {
        if (apiError.data.message) {
          errorMessage = apiError.data.message;
        }
      } else if (apiError.type === 'ERR_NETWORK') {
        errorMessage = 'Erreur de connexion réseau';
      }
    }
    // Vérifier si c'est une erreur Axios directe
    else if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (!error.response) {
        errorMessage = 'Erreur de connexion réseau';
      }
    }
    // Erreur standard JavaScript
    else if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (showToast) {
      toast.error(errorMessage);
    }
  } catch (handlerError) {
    console.error('Error in handleSimpleApiError:', handlerError);
    if (showToast) {
      toast.error('Une erreur inattendue est survenue');
    }
  }
}
