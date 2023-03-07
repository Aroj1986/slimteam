require('dotenv/config')
require('./slimTeamDatabase')
const cookieParser = require("cookie-parser");
const path = require("path");

const express = require('express')
const PORT = 8888
const slimTeam = express()
const cors = require('cors')
const slimTeamRouter = require('./Routes/slimTeamRoutes')
const userAuthenticationRouter = require('./Routes/UserAuthenticationRoutes')
const jobWallRouter = require('./Routes/JobWallRoutes')
const CalenderRoutes = require('./Routes/CalenderRoutes')
const profilePicRouter = require('./routes/profilepic');
const { errorHandler } = require('./middlewares/errorHandler')

slimTeam.use(cookieParser());
slimTeam.use(express.json({
    limit: '50mb'
  }));
slimTeam.use(cors({
  origin: ["http://localhost:3000"], 
  credentials: true
}))

slimTeam.use('/', slimTeamRouter)
slimTeam.use('/explore-experts', slimTeamRouter)
slimTeam.use('/explore-experts/:name', slimTeamRouter)
slimTeam.use('/', CalenderRoutes)
slimTeam.use('/', userAuthenticationRouter)
slimTeam.use('/jobwall', jobWallRouter)
slimTeam.use('/', profilePicRouter);
slimTeam.use('/book-online/:name', slimTeamRouter)

slimTeam.use(errorHandler)

slimTeam.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})