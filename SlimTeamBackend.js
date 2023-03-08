const path = require("path");
require('dotenv/config')
require('./slimTeamDatabase')
const cookieParser = require("cookie-parser");

const express = require('express')
const PORT = 8888
const slimTeam = express()
const cors = require('cors')
const slimTeamRouter = require('./Routes/slimTeamRoutes')
const userAuthenticationRouter = require('./Routes/UserAuthenticationRoutes')
const jobWallRouter = require('./Routes/JobWallRoutes')
const CalenderRoutes = require('./Routes/CalenderRoutes')
const profilePicRouter = require('./Routes/profilepic');
const { errorHandler } = require('./middlewares/errorHandler')

slimTeam.use(express.static(path.resolve(__dirname, "slimteam-frontend", "build")));

slimTeam.use(cookieParser());
slimTeam.use(express.json({
    limit: '50mb'
  }));
slimTeam.use(cors({
  origin: ["http://localhost:3000"], 
  credentials: true
}))

slimTeam.use('/api/explore-experts', slimTeamRouter)
//slimTeam.use('/explore-experts', slimTeamRouter)
//slimTeam.use('/explore-experts/:name', slimTeamRouter)
slimTeam.use('/api/calendar', CalenderRoutes)
slimTeam.use('/api/auth', userAuthenticationRouter)
slimTeam.use('/api/jobwall', jobWallRouter)
slimTeam.use('/api/picture', profilePicRouter);
//slimTeam.use('/api/calendar/book-online/:name', slimTeamRouter)

slimTeam.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "slimteam-frontend", "build", "index.html"));
 });

slimTeam.use(errorHandler)

slimTeam.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})

 