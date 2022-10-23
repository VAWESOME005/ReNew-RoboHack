import axios from 'axios'

export const createProduct = async (token, data) =>
  await axios.post(`http://localhost:8080/api/create-product`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });