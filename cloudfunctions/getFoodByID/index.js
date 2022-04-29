const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
var today = new Date().toLocaleDateString()
exports.main = async (event, context) => {
  const _ = db.command

  try {
    console.log('in cloud search ' + event.foodId)
    if(event.source==1){//自定义食物
      return await db
      .collection('foods')
      .where({
        _id:event.foodId,
      })
      .get()
    }else{
      return await db
      .collection('food')
      .where({
        _id:event.foodId,
      })
      .get()
    }

  } catch (e) {
    console.log(e)
  }
}
