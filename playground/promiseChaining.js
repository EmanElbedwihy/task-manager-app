require('../src/db/mongoose')
const User=require('../src/models/user')

//64da666637532404a85f779e
// User.findByIdAndUpdate('64da666637532404a85f779e',{age:21}).then((user)=>{
// console.log(user)
// return User.countDocuments({age:21})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

const updateAgeandCount=async(id,age)=>{
const user=await User.findByIdAndUpdate(id,{age})
const count =await User.countDocuments({age})
return count
}
updateAgeandCount('64da666637532404a85f779e',21).then((count)=>{
console.log(count)
}).catch((e)=>{
console.log(e)
})