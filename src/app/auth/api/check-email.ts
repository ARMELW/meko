import { http } from "@/services/api";
import { API_ENDPOINTS } from "@/config/api";

export interface CheckEmailData {
  email: string;
}

export interface CheckEmailResponse {
  exists: boolean;
  message?: string;
}

export interface ApiCheckEmailResponse {
  success: boolean;
  data: {
    exists: boolean;
    message?: string;
  };
  error?: string;
}

/**
 * Vérifie si un email est déjà utilisé via l'API dédiée
 */
export async function checkEmailExists(data: CheckEmailData): Promise<CheckEmailResponse> {
  try {
    const response = await http.private.post<ApiCheckEmailResponse>(API_ENDPOINTS.auth.checkEmail, {
      email: data.email
    });
    
    if (response.data.success) {
      return {
        exists: response.data.data.exists,
        message: response.data.data.message
      };
    } else {
      // En cas d'erreur de l'API, on considère que l'email pourrait exister
      // pour éviter de créer des comptes en doublon
      return { 
        exists: true,
        message: response.data.error || 'Erreur lors de la vérification'
      };
    }
    
  } catch (error: unknown) {
    // En cas d'erreur réseau ou autre, on considère que l'email pourrait exister
    // pour éviter de créer des comptes en doublon
    console.error('Error checking email:', error);
    return { 
      exists: true,
      message: 'Erreur lors de la vérification de l\'email'
    };
  }
}
