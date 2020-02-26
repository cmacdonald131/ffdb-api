const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 containing "Time to win!"', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Time to win!')
    })
})