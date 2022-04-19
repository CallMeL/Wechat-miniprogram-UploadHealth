const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const ID = event.ID
  if (!ID) {
    console.log('no user found')
    return
  }
  try {
    console.log('in cloud'+ID)
    return await db
      .collection('foods')
      .where({
        userId:ID
      })
      .get()
  } catch (e) {
    console.log(e)
  }
}
