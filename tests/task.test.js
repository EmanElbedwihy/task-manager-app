const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {  userOne,userTwo,taskOne, setup } = require('./fixtures/db')

beforeEach(setup)

test('create task for user', async () => {
    const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'my test',

        }).expect(201)

        const task=await Task.findById(res.body._id)
        expect(task).not.toBeNull()
})
test('fetch tasks', async () => {
    const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        
        expect(res.body.length).toBe(2)
})
test('delete tasks', async () => {
    const res = await request(app)
        .delete('/tasks/'+taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

        const task=await Task.findById(taskOne._id)
        expect(task).not.toBeNull()
})