const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const userId = event.userId
  const newemail = event.email
  const newage = event.age
  const newgender = event.gender
  const newheight = event.height
  const newweight = event.weight
  const newactivity = event.activity
  
  console.log(event)
  if(!userId) return
  //if (!goalId || !goalTitle) return
  try {
    return await db.collection('users').where({
      '_id':userId,
    }).update({
      data:{
        'details':db.command.set({
          email:newemail,
          activity:newactivity,
          age:newage,
          gender:newgender,
          height:newheight,
          weight:newweight
        }),
      }
    })
  } catch (e) {
    console.log(e)
    return e
  }
}
