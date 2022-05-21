const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {  
  try {
    return await db.collection('food-records').where({
      '_id':event.recordId,
    }).update({
      data:{
        howmany:event.howmany,
        Date:new Date()
      }
    })
  } catch (e) {
    console.log(e)
    return e
  }
}
