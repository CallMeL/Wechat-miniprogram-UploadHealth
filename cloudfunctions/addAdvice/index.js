const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  console.log(event)
  try {
    await db.collection('advice').add({
      data: {
        userId:event.userId,
        title:event.title,
        content:event.content,
        createDate: new Date(),
      }
    })
  } catch (e) {
    console.log(e)
  }
}
