import { Avatar, AvatarPayload } from './types';
import { childrenService } from './query';
import { API_ENDPOINTS } from '@/config/api';
import { generateUrl } from '@/utils/utils';

export const AvatarService = {
  getAll: async (): Promise<Avatar[]> => {
    const response = await childrenService.list({});
    const data = response.data as any;
    
    if (!data || !data.items) {
      throw new Error('Failed to fetch avatars');
    }
    const avatars = data.items as Avatar[];
  
    avatars.map((avatar) => {
      avatar.url = generateUrl(avatar.url);
      return avatar;
    });
    return avatars;
  },

  select: async (payload: AvatarPayload): Promise<Avatar> => {
    const url = API_ENDPOINTS.children.select(payload.id);
    return await childrenService.patch(url, payload);
  }
};
