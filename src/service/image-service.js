import axios from 'axios';

const API_KEY = 'ckZRr3MpBAEorZp4zvZO6IdB0iBlklQ0jH3VgQS8uVPcfaXudzx4dp7c';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query="cat", page=1) => {
const {data} = await axios.get(`search?query=${query}&page=${page}`)
return data;
};

