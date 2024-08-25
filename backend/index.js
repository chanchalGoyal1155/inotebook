const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

app.use(express.json())

//Available Routes 

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Root Route
// app.get('/', (req, res) => {
//   res.send('Welcome to the iNotebook API!');
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})