import { ApiResponse } from "@/types";
import { Filter } from "@/types/filter";
import { PaginatedResponse } from "@/types/pagination";

export interface ResourceEndpoints {
  base: string;
  list: (qs: string) => string;
  create: string;
  detail: (id: string) => string;
  update: (id: string) => string;
  delete: (id: string) => string;
  [key: string]: unknown;
}

export interface BaseService<T, TPayload> {
  list(filter: Filter): Promise<PaginatedResponse<T>>;
  detail(id: string): Promise<T>;
  create(payload: TPayload): Promise<ApiResponse<T>>;
  update(id: string, payload: TPayload): Promise<ApiResponse<T>>;
  modify(id: string, payload: Partial<TPayload>): Promise<ApiResponse<T>>;
  remove(id: string): Promise<ApiResponse>;
}

export abstract class BaseServiceImpl<T, TPayload> implements BaseService<T, TPayload> {
  protected abstract endpoints: ResourceEndpoints;

  protected abstract serializeParams(filter: Filter): string;

  protected async fetchData<R>(url: string, options: RequestInit): Promise<R> {
    const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/${url}`, {
      ...options,
      credentials: 'include',

    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
          `Request failed with status ${response.status}: ${response.statusText}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
    }

    return response.json();
  }

  get<R>(endpoint: string): Promise<R> {
    return this.fetchData<R>(endpoint, { method: 'GET' });
  }

  post<R>(endpoint: string, data: unknown): Promise<R> {
    return this.fetchData<R>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<R>(endpoint: string, data: unknown): Promise<R> {
    return this.fetchData<R>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch<R>(endpoint: string, data: unknown): Promise<R> {
    return this.fetchData<R>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }


  delete<R>(endpoint: string, data?: unknown): Promise<R> {
    const options: RequestInit = {
      method: 'DELETE',
    };
    if (data) {
      options.body = JSON.stringify(data);
    }

    return this.fetchData<R>(endpoint, options);
  }

  async list(filter: Filter): Promise<PaginatedResponse<T>> {
    const queryString = this.serializeParams(filter);
    return this.get<PaginatedResponse<T>>(this.endpoints.list(queryString));
  }

  async detail(id: string): Promise<T> {
    return this.get<T>(this.endpoints.detail(id));
  }

  async create(payload: TPayload): Promise<ApiResponse<T>> {
    return this.post<ApiResponse<T>>(this.endpoints.create, payload);
  }

  async update(id: string, payload: TPayload): Promise<ApiResponse<T>> {
    return this.put<ApiResponse<T>>(this.endpoints.update(id), payload);
  }

  async modify(id: string, payload: TPayload): Promise<ApiResponse<T>> {
    return this.patch<ApiResponse<T>>(this.endpoints.update(id), payload);
  }

  async remove(id: string, data?: unknown): Promise<ApiResponse> {
    return this.delete<ApiResponse>(this.endpoints.delete(id), data);
  }




  protected handleApiError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Une erreur inconnue est survenue');
  }
}