const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
var today = new Date().toLocaleDateString()

console.log(time)
exports.main = async (event, context) => {
  const { ID } = event
  if (!ID) {
    console.log('no user found')
    return
  }
  try {
    console.log('in cloud'+ID)
    return await db
      .collection('food-records')
      .where({
        userId:ID,
        addDate:_.and(_.gte(new Date(today+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
      })
      .get()
  } catch (e) {
    console.log(e)
  }
}
