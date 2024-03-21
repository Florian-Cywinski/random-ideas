const express = require('express'); // To bring in the module
const router = express.Router();  // To create the router
const Idea = require('../models/Idea'); // To bring in the model (Idea)

// Get all ideas  - 127.0.0.1:5000/api/ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();  // To get all ideas from the DB // find() is a method used on the model
    res.json({ success: true, data: ideas }); // To put the data from the DB (ideas) in data
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });  // 500 is a server error
  }
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error); // Just to see if there occur an error
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({ // To create a new instance of Idea
    text: req.body.text,  // It comes from the HTTP-Request body
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();  // save() is a method used on the (new created) instance
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Update (PUT) idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);    // The get the idea to deleted by its id

    // Match the usernames
    if (idea.username === req.body.username) {  // if the username of the idea matches the typed in username
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: { // $set to target the keys to be updated
            text: req.body.text,
            tag: req.body.tag,
            // username: req.body.username,   // I added this line of code
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }

    // Usernames do not match
    res
    .status(403)  // 403 is unauthorized
    .json({
      success: false,
      error: 'You are not authorized to update this resource',
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Delete idea - // To just mimic a real validation with e.g. a token to delete an idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);    // The get the idea to deleted by its id

    // Match the usernames
    if (idea.username === req.body.username) {  // if the username of the idea matches the typed in username
      await Idea.findByIdAndDelete(req.params.id);  // Deletes the idea with the matched username
      return res.json({ success: true, data: {} }); // Hint from Will: It's important to return from an Express route handler so that you do not try and send back more than one response, which you cannot do.
    }

    // Usernames do not match
    res
      .status(403)  // 403 is unauthorized
      .json({
        success: false,
        error: 'You are not authorized to delete this resource',
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;  // To export the router