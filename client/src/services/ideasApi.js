import axios from 'axios';  // To import the installed package axios

class IdeasApi {
  constructor() {
    // this._apiUrl = 'http://localhost:5000/api/ideas';  // For development
    this._apiUrl = '/api/ideas';  // For production
  }

  getIdeas() {
    return axios.get(this._apiUrl); // A GET request to the URL
  }

  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    const username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        // username: username,
        username,
      },
    });
  }
}

export default new IdeasApi();  // To initialize it here instead of bring in to a file and do it there