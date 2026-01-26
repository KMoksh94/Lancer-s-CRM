const express = require('express')
const connectionDB = require('./database-connection/connectionDB')
const app = express()
const cors = require('cors')
const overdueProjectsUpdate = require('./utilities/overdueProjects.js')
const { default: projectMigrate } = require('./utilities/projectMigrate.js')
const scheduleDelete = require('./utilities/deletedItems.js')
require('dotenv').config()
const PORT = process.env.PORT || 5000
connectionDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',require('./routes/auth-routes'))
app.use('/clients',require('./routes/client-routes.js'))
app.use('/projects',require('./routes/project-routes.js'))

overdueProjectsUpdate.start()
scheduleDelete.start()

app.listen(PORT, ()=> {console.log(`Server is running at ${PORT}`)})