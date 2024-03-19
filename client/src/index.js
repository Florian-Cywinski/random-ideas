import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';         // To import the Modal class (constructor)
import IdeaForm from './components/IdeaForm';   // To import the IdeaForm class (constructor)
import IdeaList from './components/IdeaList';   // To import the IdeaList class (constructor)
import './css/style.css';

const modal = new Modal();  // To instanciate the modal
const ideaForm = new IdeaForm();    // To instanciate the idea form
ideaForm.render();  // To call the method render on this object
const ideaList = new IdeaList();    // To instanciate the idea list
ideaList.render();  // It's just rendered here