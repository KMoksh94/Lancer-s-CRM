const express = require('express')
const connectionDB = require('./database-connection/connectionDB')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 6000
connectionDB()

app.use(express.json())

app.listen(PORT, ()=> {console.log(`Server is running at ${PORT}`)})