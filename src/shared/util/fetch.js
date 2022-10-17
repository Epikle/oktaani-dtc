import axios from 'axios';

import { URLS } from './urls';

const getHeaders = (accessToken) => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};

export const getDtcList = async () => {
  const url = `${URLS.apiUrl}/dtc`;
  const { data } = await axios.get(url);

  return data;
};

export const createDtc = async (dtcData, accessToken) => {
  const url = `${URLS.apiUrl}/dtc`;
  const config = getHeaders(accessToken);
  await axios.post(url, dtcData, config);
};

export const deleteDtc = async (id, accessToken) => {
  const url = `${URLS.apiUrl}/dtc/${id}`;
  const config = getHeaders(accessToken);
  await axios.delete(url, config);
};

export const updateDtc = async (id, dtcData, accessToken) => {
  const url = `${URLS.apiUrl}/dtc/${id}`;
  const config = getHeaders(accessToken);
  await axios.patch(url, dtcData, config);
};
