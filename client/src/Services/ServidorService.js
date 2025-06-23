import { BACKEND_HOSTING_URL} from './constants';

export const iniciarServidor = async () => {
  const response = await fetch(`${BACKEND_HOSTING_URL}/control/start?server=${SERVER_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const detenerServidor = async () => {
  const response = await fetch(`${BACKEND_HOSTING_URL}/control/stop?server=${SERVER_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};
