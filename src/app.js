require('dotenv').config({silent: true})
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const teamsRouter = require('./teams/teams-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const errorHandler = require('./error-handler')


const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(helmet())
app.use(cors())


app.use('/api/teams', teamsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('Time to win!')
})

app.use(errorHandler)

module.exports = app