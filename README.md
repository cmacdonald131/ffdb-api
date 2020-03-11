# Fantasy Football Database (FFDb) API

The live link to the app is https://ffdb-app.now.sh/

## API Documentation

This endpoint is used to fetch a user’s teams

getTeams = () => {
    fetch(`${config.API_ENDPOINT}/teams`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      }
    })
 
      .then(teams => {
        return teams.json()
      }).then(data => {
        this.setState({
          teams: data
        })
      })
  }



0: {id: 72, name: "Test Team", username: "testTeam", website: "www.website.com", password: "Password123!"}
id: 72
name: "Test Team"
username: "testTeam"
website: "www.website.com"
password: "Password123!"
1: {id: 75, name: "Sportsters", username: "batman",…}
id: 75
name: "Sportsters"
username: "batman"
website: "nanananananananananananananaanna.website.com"
password: "robin"


This endpoint is used to post a new team to user’s page

fetch(`${config.API_ENDPOINT}/teams`, {
            method: "Post",
            body: JSON.stringify({
                name: teamname,
                website: website,
                username: username,
                password: password,
                id: id,
 
            }),
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
 
            .then(team => {
                return team.json()
            }).then(data => {
                this.props.history.push('/team-page')
            })

{id: 76, name: "Try it Out", username: "Test Team 2", website: "www.newteam.com",…}
id: 76
name: "Try it Out"
username: "Test Team 2"
website: "www.newteam.com"
password: "Password123!"

This endpoint is used to create a new user

postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }

{id: 13, name: "New User", username: "newUser", email: "newuser@newuser.com"}
id: 13
name: "New User"
username: "newUser"
email: "newuser@newuser.com"

### Technology Used

This app was built using:
React,
CSS,
Node,
Express,
PostreSQL
