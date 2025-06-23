import { Avatar, AvatarPayload } from './types';
import { avatarService } from './query';
import { API_ENDPOINTS } from '@/config/api';

export const AvatarService = {
  getAll: async (): Promise<Avatar[]> => {
    const response = await avatarService.list({});
    const data = response.data as unknown as { items: Avatar[] };
    
    if (!data || !data.items) {
      throw new Error('Failed to fetch avatars');
    }
    const avatars = data.items as Avatar[];
  
    return avatars;
  },

  select: async (payload: AvatarPayload): Promise<Avatar> => {
    const url = API_ENDPOINTS.children.select(payload.id);
    return await avatarService.patch(url, payload);
  }
};
