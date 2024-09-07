const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

//Available Routes 

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the iNotebook API!');
});


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})