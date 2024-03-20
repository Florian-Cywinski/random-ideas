import axios from 'axios';  // To import the installed package axios

class IdeasApi {
  constructor() {
    this._apiUrl = 'http://localhost:4000/api/ideas'; // To set the property
  }

  getIdeas() {
    return axios.get(this._apiUrl); // A GET request to the URL
  }
}

export default new IdeasApi();  // To initialize it here instead of bring in to a file and do it there