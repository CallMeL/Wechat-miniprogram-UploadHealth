const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { recordId } = event

  if (!recordId) {
    return
  }

  try {
    await db
      .collection('food-records')
      .where({
        _id:recordId
      })
      .remove()
  } catch (e) {
    console.log(e)
  }
}
