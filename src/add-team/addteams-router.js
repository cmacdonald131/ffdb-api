const express = require('express')
const path = require('path')
const AddTeamsService = require('./addteams-service')

const addTeamsRouter = express.Router()
const jsonBodyParser = express.json()

addTeamsRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, username, name, website } = req.body

    for (const field of ['name', 'username', 'password', 'website'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    
    const passwordError = AddTeamsService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    AddTeamsService.hasTeamWithTeamName(
      req.app.get('db'),
      teamname
    )
      .then(hasTeamWithTeamName => {
        if (hasTeamWithTeamName)
          return res.status(400).json({ error: `Team already added` })

        return AddTeamsService.hashPassword(password)
          .then(hashedPassword => {
            const newTeam = {
              username,
              password: hashedPassword,
              name,
              website
            }

            return AddTeamsService.insertTeam(
              req.app.get('db'),
              newTeam
            )
              .then(team => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${team.id}`))
                  .json(AddTeamsService.serializeAddTeam(team))
              })
          })
      })
      .catch(next)
  })

module.exports = addTeamsRouter
