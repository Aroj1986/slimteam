require('dotenv/config')
require('./slimTeamDatabase')

const express = require('express')
const PORT = 8888
const slimTeam = express()
const cors = require('cors')
const slimTeamRouter = require('./Routes/slimTeamRoutes')
const userAuthenticationRouter = require('./Routes/UserAuthenticationRoutes')
const jobWallRouter = require('./Routes/JobWallRoutes')
const {errorHandler} = require('./middlewares/errorHandler')
const CalenderRoutes = require('./Routes/CalenderRoutes')

slimTeam.use(express.json())
slimTeam.use(cors())
slimTeam.use('/', slimTeamRouter)
slimTeam.use('/explore-experts', slimTeamRouter)
slimTeam.use('/explore-experts/:name', slimTeamRouter)
slimTeam.use('/', CalenderRoutes)
slimTeam.use('/', userAuthenticationRouter)
slimTeam.use('/', jobWallRouter)


slimTeam.use(errorHandler)

slimTeam.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})