import axios from 'axios'

import { BASE_API_URL } from '@shared/constants/api'

const apiClient = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
})

export { apiClient }
