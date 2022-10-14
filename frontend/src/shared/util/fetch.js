import axios from 'axios';

import { URLS } from './urls';

export const getDtcList = async () => {
  const url = `${URLS.apiUrl}/dtc`;
  const { data } = await axios.get(url);

  return data;
};
