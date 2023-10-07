const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'yamen',
    email: 'y@gmail.com',
    password: 'yamen12345',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'thisismytaskapp')
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'rahma',
    email: 'r@gmail.com',
    password: 'rahma12345',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, 'thisismytaskapp')
    }]
}
const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:'first task',
    completed:false,
    owner:userOne._id
}
const tasktwo={
    _id:new mongoose.Types.ObjectId(),
    description:'second task',
    completed:true,
    owner:userOne._id
}
const taskthree={
    _id:new mongoose.Types.ObjectId(),
    description:'third task',
    completed:false,
    owner:userTwo._id
}
const taskfour={
    _id:new mongoose.Types.ObjectId(),
    description:'fourth task',
    completed:true,
    owner:userTwo._id
}

const setup=async () =>{
    await User.deleteMany()
    await Task.deleteMany()

    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(tasktwo).save()
    await new Task(taskthree).save()
    await new Task(taskfour).save()
}

module.exports={
   
    userOne,
    userTwo,
    taskOne,
    setup
    


}