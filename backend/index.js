const express = require('express')
const connectionDB = require('./database-connection/connectionDB')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 6000
connectionDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',require('./routes/auth-routes'))

app.listen(PORT, ()=> {console.log(`Server is running at ${PORT}`)})