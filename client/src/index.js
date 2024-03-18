import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal'; // Ti import the Modal class (constructor)
import IdeaForm from './components/IdeaForm';
import './css/style.css';

const modal = new Modal();  // To instanciate the modal
const ideaForm = new IdeaForm();    // To instanciate the idea form
ideaForm.render();  // To call the method render on this object