class Modal {
  constructor() {
    // Selectors
    this._modal = document.querySelector('#modal'); // The selector for the modal id  // this because this is a property of the class (Modal)
    this._modalBtn = document.querySelector('#modal-btn');
    // To call the event listeners - because the constructor is executed immediately 
    this.addEventListeners();
  }

  // Event listener
  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this)); // this.open calles the Class method open() // bind(this) is to pretain to this in open() (the modal id)
    window.addEventListener('click', this.outsideClick.bind(this));
    document.addEventListener('closemodal', () => this.close());  // To close the modal after submit - closemodal comes from IdeaForm.js
  }

  // Class Methods
  open() {
    this._modal.style.display = 'block';
  }

  close() {
    this._modal.style.display = 'none';
  }

  outsideClick(e) {
    if (e.target === this._modal) { // if the click is outside the .modal-box
      this.close();
    }
  }
}

export default Modal;
