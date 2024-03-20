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

  async getIdeas() {  // To get the data - From the imported IdeasApi which fetches all ideas from the DB
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();  // To render the list - make it visible on the DOM
    } catch (error) {
      console.log(error);
    }
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
        // To put each idea as HTML code into the output array 
        return `
      <div class="card">
      <button class="delete"><i class="fas fa-times"></i></button>
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
  }
}

export default IdeaList;  // The import is implemented in index.js
