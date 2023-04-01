import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_IMBD;
const IMBD_ID = import.meta.env.VITE_IMBD_ID;

export const getMovieByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/?i=${IMBD_ID}&apikey=${API_KEY}&t=${title}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch movie data from API');
  }
};