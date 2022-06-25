import axios from 'axios'

import {BASE_API_URL_V1} from '@shared/constants/api';

const apiClientV1 = axios.create({
  baseURL: `${BASE_API_URL_V1}/`,
})

export { apiClientV1 }
