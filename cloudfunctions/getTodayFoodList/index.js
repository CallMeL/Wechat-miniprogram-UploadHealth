const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
var today = new Date().toLocaleDateString()
exports.main = async (event, context) => {
  if (!event.userId) {
    console.log(event.userId)
    return
  }
  const _ = db.command

  try {
    console.log([new Date(today+" 00:00:00"),new Date(today+" 23:59:59")])
    console.log('in cloud search ' + event.userId)
    return await db
      .collection('food-records')
      .where({
        userId:event.userId,
        Date:_.and(_.gte(new Date(today+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
      })
      .get()
  } catch (e) {
    console.log(e)
  }
}
