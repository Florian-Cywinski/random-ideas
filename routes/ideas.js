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
  const idea = ideas.find((idea) => idea.id === +req.params.id);  // req.params.id is a id as string -> to change it into a number we use the + sign

  if (!idea) {  // If there is no idea in the ideas array
    return res  // Due to the return we don't need an else
      .status(404)  // To send a status code
      .json({ success: false, error: 'Resource not found' }); // To send a message
  }

  res.json({ success: true, data: idea });  // The response from the server - to transfer the data (a single idea) if there is one
});

module.exports = router;  // To export the router
