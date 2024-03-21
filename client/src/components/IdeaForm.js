import IdeasApi from '../services/ideasApi';  // To bring in the IdeasAPI (with GET and POST)
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');  // To select the form
    this._ideaList = new IdeaList();  // To instanciate the list 
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));  // bind(this) to not pretain to the .this in the handleSubmit() method but on the class (IdeaForm)
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Frontend validation - If any field is empty an alert pops up
    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert('Please enter all fields');
      return;
    }

    // Save user to local storage
    localStorage.setItem('username', this._form.elements.username.value); // key, value
    
    const idea = {  // Here, the input entered in the three input fields of the form is written to the object
      // To target the three input fields of the form (Enter a Username, What's Your Idea? and Tag)
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);  // newIdea.data returns the whole object -> the data we want are behind the key data

    // Clear fields after submit
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();  // To render the form again after submitting a new idea

    document.dispatchEvent(new Event('closemodal'));  // To be able to listen for this event in the Modal component // closemodal is just a made up name  // new Event to create a custom event (closemodal) (which we use in Modal.js (eventListener)) 
    // document.addEventListener('closemodal', () => this.close()); - this is the code from Modal.js (to better understand)
  }

  render() {  // A method to create the form
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${
        localStorage.getItem('username') ? localStorage.getItem('username') : ''
      }" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.querySelector('#idea-form');  // To select the just created form
    this.addEventListeners(); // To add an event listener to the just created form
  }
}

export default IdeaForm;
