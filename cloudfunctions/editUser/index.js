const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const userId = event.userId
  const nickname = event.nickname
  const age = event.age
  const gender = event.gender
  const height = event.height
  const weight = event.weight
  const activity = event.activity
  const email = event.email
  userInform = {nickname,gender,email}
  if(!userId) return
  //if (!goalId || !goalTitle) return
  try {
    return await db.collection('users').where({
      '_id':userId,
    }).update({
      data:{
        'Details':db.command.set({
          nickname:nickname,
          age:age,
          email:email,
          gender:gender,
          height:height,
          weight:weight,
          activity:activity
        }),
      }
    })
  } catch (e) {
    console.log(e)
    return e
  }
}
