const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {  
  console.log(event)
  if(!event.foodId) return
  //if (!goalId || !goalTitle) return
  try {
    return await db.collection('foods').where({
      '_id':event.foodId,
    }).update({
      data:{
        detail:event.foodDetail,
        fat:event.fat.value,
        cho:event.cho.value,
        kcal:event.kcal.value,
        name:event.foodname,

      }
    })
  } catch (e) {
    console.log(e)
    return e
  }
}
