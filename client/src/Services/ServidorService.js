import { URL, SERVER_ID } from './constants';

export const iniciarServidor = async () => {
  const response = await fetch(`${URL}control/start?server=${SERVER_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const detenerServidor = async () => {
  const response = await fetch(`${URL}control/stop?server=${SERVER_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};
