require('dotenv/config')
require('./slimTeamDatabase')

const express = require('express')
const PORT = 8888
const slimTeam = express()
const cors = require('cors')
const slimTeamRouter = require('./Routes/slimTeamRoutes')

slimTeam.use(express.json())
slimTeam.use(cors())
slimTeam.use('/', slimTeamRouter)
slimTeam.use('/explore-experts', slimTeamRouter)
slimTeam.use('/explore-experts/:name', slimTeamRouter)

slimTeam.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})