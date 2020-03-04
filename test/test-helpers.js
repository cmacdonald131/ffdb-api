const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      email: 'testuser1@test.com',
      password: 'password',
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      email: 'testuser2@test.com',
      password: 'password',
    },
    {
      id: 3,
      username: 'test-user-3',
      name: 'Test user 3',
      email: 'testuser3@test.com',
      password: 'password',
    },
    {
      id: 4,
      username: 'test-user-4',
      name: 'Test user 4',
      email: 'testuser4@test.com',
      password: 'password',
    },
  ]
}

function makeTeamsArray(users) {
  return [
    {
      id: 1,
      name: 'Team name',
      username: 'Your team username',
      user_id: users[0].id,
    },
    {
      id: 2,
      name: 'Team name',
      username: 'Your team username',
      user_id: users[1].id,
    },
    {
      id: 3,
      name: 'Team name',
      username: 'Your team username',
      user_id: users[2].id,
    },
    {
      id: 4,
      name: 'Team name',
      username: 'Your team username',
      user_id: users[3].id,
    },
  ]
}

function makeExpectedTeam(users, team=[]) {
  const users = users
    .find(user => user.id === team.user_id)

  const number_of_teams = teams
    .filter(teams => teams.user_id === user.id)
    .length

  return {
    id: user.id,
    username: team.username,
    name: team.name,
    website: team.website,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      website: user.website,
    },
  }
}

function makeTeamsFixtures() {
  const testUsers = makeUsersArray()
  const testTeams = makeTeamsArray(testUsers)
  return { testUsers, testTeams }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        ffdb_users,
        ffdb_team
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE ffdb_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE ffdb_team_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('ffdb_users_id_seq', 0)`),
        trx.raw(`SELECT setval('ffdb_team_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('ffdb_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('ffdb_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedTeamsTables(db, users, teams=[]) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('ffdb_team').insert(teams)
    await trx.raw(
      `SELECT setval('ffdb_team_id_seq', ?)`,
      [teams[teams.length - 1].id],
    )
    if (teams.length) {
      await trx.into('ffdb_team').insert(teams)
      await trx.raw(
        `SELECT setval('ffdb_teams_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeTeamsArray,

  makeTeamsFixtures,
  makeExpectedTeam,
  cleanTables,
  seedTeamsTables,
  makeAuthHeader,
  seedUsers,
}
