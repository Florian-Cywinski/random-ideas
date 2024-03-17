const mongoose = require('mongoose'); // To bring in the installed module ('mongoose')

const IdeaSchema = new mongoose.Schema({  // To create a new mongoose (Schema) instance (constructor function) - the schema takes in an object with all different options the schema shall include
  text: {
    type: String,
    required: [true, 'Please add a text field'],  // Backend validation
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Idea', IdeaSchema);  // This way we are able to bring this model in whereever it's needed (routes)