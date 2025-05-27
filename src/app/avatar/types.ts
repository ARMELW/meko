export interface Avatar {
  id: string;
  name: string;
  url: string;
  isSelected?: boolean;
}

export type AvatarPayload = {
  id: string;
  avatarUrl: string;
};

export interface AvatarResponse {
  items: Avatar[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  success: boolean;
}
