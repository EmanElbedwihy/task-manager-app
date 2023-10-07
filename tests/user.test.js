const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const{userOne,setup}=require('./fixtures/db')

beforeEach(setup)


test('signup a new user', async () => {
    const res = await request(app).post('/users').send({
        name: 'eman',
        email: 'eman@gmail.com',
        password: 'eman12345'
    }).expect(201)

    const user = await User.findById(res.body.user._id)
    expect(user).not.toBeNull()

    expect(res.body).toMatchObject({
        user: {
            name: 'eman',
            email: 'eman@gmail.com'
        },
        token: user.tokens[0].token
    })
})

test('login', async () => {
    const res = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(res.body.user._id)
    expect(res.body.token).toBe(user.tokens[1].token)
})
test('unsuccessful login', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'yamen1234'
    }).expect(400)
})

test('get profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('get profile for unaothorized user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})
test('delete account', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})
test('delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
test('upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/panda.jpg')
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('update user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name:'yazan'})
        .expect(200)

        const user=await User.findById(userOne._id)
        expect(user.name).toBe('yazan')
})

test(' unsuccessful update user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({loc:'Egypt'})
        .expect(400)

})


