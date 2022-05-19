const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { foodId } = event
console.log(foodId)
  if (!foodId) {
    return
  }

  try {
    await db
      .collection('foods')
      .where({
        _id:foodId
      })
      .remove()
  } catch (e) {
    console.log(e)
  }
}
