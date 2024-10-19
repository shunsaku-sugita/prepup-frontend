import { io } from 'socket.io-client';
import { SOCKET_BASE_URL } from '../../config/apiConfig';


export const socket = io(SOCKET_BASE_URL);