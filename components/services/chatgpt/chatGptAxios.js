import axios from 'axios';
import { CHATGPT_API_KEY, CHATGPT_API_URL } from '../../../config/apiConfig';

const chatGptAxios = axios.create({
  baseURL: `${CHATGPT_API_URL}`,
  headers: {
    'Authorization': `Bearer ${CHATGPT_API_KEY}`,
    'Content-Type': 'multipart/form-data',
  },
});

export default chatGptAxios;
