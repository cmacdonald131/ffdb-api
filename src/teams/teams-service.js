const TeamsService = {
    getAllTeams(knex) {
      return knex.select('*').from('ffdb_team')
    },
  
    insertTeam(knex, newTeam) {
      return knex
        .insert(newTeam)
        .into('ffdb_team')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('ffdb_team')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteTeam(knex, id) {
      return knex('ffdb_team')
        .where({ id })
        .delete()
    },
  
    updateTeam(knex, id, newTeamFields) {
      return knex('ffdb_team')
        .where({ id })
        .update(newTeamFields)
    },
  }
  
  module.exports = TeamsService