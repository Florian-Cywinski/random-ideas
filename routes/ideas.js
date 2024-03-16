const express = require('express'); // To bring in the module
const router = express.Router();  // To create the router

// To have just some data (normally it would come from a database)
const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

// Get all ideas - http://127.0.0.1:5000/api/ideas
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas }); // The response from the server - to transfer the data (all ideas)
});

// Get single idea - http://127.0.0.1:5000/api/ideas/2
router.get('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);  // To find the idea // req.params.id is a id as string -> to change it into a number the + sign is used

  if (!idea) {  // If there is no idea in the ideas array
    return res  // Due to the return we don't need an else
      .status(404)  // To send a status code
      .json({ success: false, error: 'Resource not found' }); // To send a message
  }

  res.json({ success: true, data: idea });  // The response from the server - to transfer the data (a single idea) if there is one
});

// Add an idea
router.post('/', (req, res) => {  // 127.0.0.1:5000/api/ideas
  // res.send('Post success'); // The response from the API after sending the post  // This is just for testing purposes

  const idea = {  // To create a new idea object  
    id: ideas.length + 1, // To create a new id - increment
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  console.log(idea);

  ideas.push(idea);

  res.json({ success: true, data: idea });
});

// Update idea
router.put('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);  // To find the idea to be updated

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  idea.text = req.body.text || idea.text; // To update the text // req.body.tag -> what ever comes into the body  || idea.tag -> to keep the previous content if nothing was passed for the text in the request
  idea.tag = req.body.tag || idea.tag;  // To update the tag  // req.body.tag -> what ever comes into the body  || idea.tag -> to keep the previous content if nothing was passed for the tag in the request

  res.json({ success: true, data: idea });
});

// Delete idea
router.delete('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);  // To find the idea to be deleted

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  const index = ideas.indexOf(idea);  // To find the index of the idea to be deleted
  ideas.splice(index, 1); // To delete the specific idea from the ideas array

  res.json({ success: true, data: {} });
});

module.exports = router;  // To export the router
