export interface ApiResponse<T = void> {
    message: string;
    data?: { data: T } | T;
    status: number;
  }
 