const path = require('path'); // To bring in the installed module ('path')
const express = require('express'); // To bring in the installed module ('express')
const cors = require('cors'); // To bring in the installed module ('cors')  // To enable requests from localhost:3000 (frontend dev server)
require('dotenv').config(); // To bring in the installed module ('dotenv') and call the config method of it
const port = process.env.PORT || 5000;    // Connects to the port we set in .env (PORT=8000) - if it can't find it connect to port 5000
const connectDB = require('./config/db'); // To bring in the config file to connect to the MongoDB DB

connectDB();  // To call the function from the db.js file

const app = express();  // Initialization

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));  // To make the public folder (index.html) static

// Body parser middleware - This way it is used in most APIs
app.use(express.json());  // To be able to send json to the server
app.use(express.urlencoded({ extended: false }));

// cors middleware - CORS is Cross Origin Resource Sharing
// app.use(cors());   // To allow every URL - This is not recommended
app.use(
  cors({
    // origin: 'http://127.0.0.1:3000',
    origin: ['http://localhost:4000', 'http://localhost:3000'], // To have an array with all allowed URLs
    credentials: true,
  })
);

// cors({
//   origin: 'http://127.0.0.1:3000',
//   // origin: ['http://localhost:4000', 'http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// })

// "Welcome" rout
app.get('/', (req, res) => {  // To create a route (get request -> type of rout (it also could be delete, post, put or get))  // / = index  // req = request object // res = response object
  res.json({ message: 'Welcome to the RandomIdeas API' });  // The response from the server - to transfer the data (Welcome message)
});

const ideasRouter = require('./routes/ideas');  // The (ideas) router
app.use('/api/ideas', ideasRouter); // To have the endpoint (http://127.0.0.1:5000/api/ideas) go to the router (ideas.js)

app.listen(port, () => console.log(`Server listening on port ${port}`));  // To have the server listening on port 5000