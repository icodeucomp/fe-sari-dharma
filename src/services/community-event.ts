import axios from 'axios';

export const getCommunityEventDetail = async (slug: string, id: string) => {
  try {
    const response = await axios.get(`/api/community-events/${slug}/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Event tidak ditemukan');
    }
    throw error;
  }
};
