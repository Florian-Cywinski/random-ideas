import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');  // The selector where the cards will be inserted
    this._ideas = []; // To initialize an array for the ideas, later the data fetched from the DB will be added there
    this.getIdeas();  // From the imported IdeasApi // Which fetches all ideas from the DB

    // To have for each tag / category a different color
    this._validTags = new Set();  // A Set is a collection of unique values. Each value can only occur once in a Set. A Set can hold any value of any data type.
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {      // fa-times is the class of the delete button (x)
        e.stopImmediatePropagation(); //  The stopImmediatePropagation() method of the Event interface prevents other listeners of the same event from being called. If several listeners are attached to the same element for the same event type, they are called in the order in which they were added. If stopImmediatePropagation() is invoked during one such call, no remaining listeners will be called, either on that element or any other element.
        const ideaId = e.target.parentElement.parentElement.dataset.id; // <button class="delete"> . <div class="card" data-id="${idea._id}"> // data-id we access with dataset -> the attribute is id
        this.deleteIdea(ideaId);  // To delete it from the server and from the DOM
      }
    });
  }

  async getIdeas() {  // To get the data - From the imported IdeasApi which fetches all ideas from the DB // async because axios returns a promise
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();  // To render the list - make it visible on the DOM
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {  // async because axios returns a promise
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);
      // Delete from DOM
      this._ideas.filter((idea) => idea._id !== ideaId);  // To filter it out from the _ideas array -> give all back but the one deleted
      this.getIdeas();  // To update the DOM (render again)
    } catch (error) {
      alert('You can not delete this resource');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {  // To get the correct tag - To have for each tag / category a different color
    tag = tag.toLowerCase();
    let tagClass = '';  // To initialize the variable tagClass
    if (this._validTags.has(tag)) { // To check whether the tag is part of the set
      tagClass = `tag-${tag}`;  // e.g. .tag-technology
    } else {
      tagClass = '';  // The default color is black
    }
    return tagClass;
  }

  render() {  // To create / render HTML code (the idea cards)
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {  // To loop through the ideas array
        const tagClass = this.getTagClass(idea.tag);  // To get the correct tag / category e.g. technology
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`  // if the username is in local storage the delete icon is there
            : ''; // if not there is no delete icon
        // To put each idea as HTML code into the output array 
        return `
      <div class="card" data-id="${idea._id}">
      ${deleteBtn}
        <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
      `;
      })
      .join('');  // To turn the array (the map output with the HTML code for each idea card) back into a string
    this.addEventListeners(); // Normaly it would goes into the constructor but in this case it has to come in after rendering
  }
}

export default IdeaList;  // The import is implemented in index.js
