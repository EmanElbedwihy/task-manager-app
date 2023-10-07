require('../src/db/mongoose')
const Task = require('../src/models/task')

//64da666637532404a85f779e
// Task.findByIdAndRemove('64da418a860aec14b40cb3c2').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const deleteAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count

}
deleteAndCount('64da800a35013b3f0c61a6dc').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})
