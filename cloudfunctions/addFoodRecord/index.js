const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
console.log(event.userId)
  if (!event.foodId) {
    return
  }
  try {
    return await db.collection('food-records').add({
      data: {
        userId: event.userId,
        foodName:event.foodName,
        foodId: event.foodId,
        belongsto:event.belongsto,
        howmany:event.howmany,
        unit:event.unit,
        source:event.source,
        note:event.note,
        Date:new Date()
      }
    })
  } catch (e) {
    console.log(e)
  }
}
