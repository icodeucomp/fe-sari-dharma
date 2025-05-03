import axios from 'axios';

/**
 * Mengambil detail event community berdasarkan slug dan id
 */
export const getEventCommunityDetail = async (slug: string, id: string) => {
  try {
    const response = await axios.get(`/api/event-community/${slug}/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Event tidak ditemukan');
    }
    throw error;
  }
};
