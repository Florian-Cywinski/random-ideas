import axios from 'axios';  // To import the installed package axios

class IdeasApi {
  constructor() {
    this._apiUrl = 'http://localhost:5000/api/ideas'; // To set the property
  }

  getIdeas() {
    return axios.get(this._apiUrl); // A GET request to the URL
  }

  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }
}

export default new IdeasApi();  // To initialize it here instead of bring in to a file and do it there