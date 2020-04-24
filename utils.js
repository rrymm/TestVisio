import axios from 'axios';
import urlJoin from 'url-join';

const URL_BACKEND = 'https://visio-portal.telecomsante.com/api';
const URL_BACKEND_FETCH_VISIO_INFOS = urlJoin(URL_BACKEND, 'visio-infos');
const URL_BACKEND_FETCH_ROOM_AND_JWT = urlJoin(URL_BACKEND, 'mobile-room');
export const DEFAULT_VISIO_URL = 'https://visio-server.telecomsante.com';

export async function fetchVisioInformations() {
  try {
    const { data: { url } } = await axios.get(URL_BACKEND_FETCH_VISIO_INFOS);
    console.log(`Using visio url : ${url}`);
    return url;
  } catch(err) {
    console.log(`Failed to get visio url, using ${DEFAULT_VISIO_URL}`, err);
    return DEFAULT_VISIO_URL;
  }
}

export async function fetchRoomAndJwtFromCode(code) {
  try {
    const { data } = await axios.get(urlJoin(URL_BACKEND_FETCH_ROOM_AND_JWT, code));
    console.log(`Using room ${data.room}`);
    return data;
  } catch(err) {
    console.log(`Failed to get room and jwt using code : ${code}`, err);
    throw 'Failed get room';
  }
}