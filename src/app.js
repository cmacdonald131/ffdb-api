//require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const teamsRouter = require('./teams/teams-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const addTeamsRouter = require('./add-team/addteams-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  }))

app.use(helmet())
app.use(cors())


app.use("/api/team-page", teamsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/add-team', addTeamsRouter)

app.get('/', (req, res) => {
    res.send('Time to win!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app