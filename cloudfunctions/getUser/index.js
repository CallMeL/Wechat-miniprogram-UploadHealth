const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { userId } = event.userId

  if (!userId) {
    return
  }

  try {
    const value = await db
      .collection('users')
      .where({
        userId:userId
      })
      .get({
        success:res=> {
          return res
        }
      })

  } catch (e) {
    console.log(e)
  }
}
