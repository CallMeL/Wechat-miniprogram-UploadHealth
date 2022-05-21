const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  console.log(event)
  //detail = foodDetail
  //if (!foodName||!foodInform|| !userId) return
  try {
    const food = await db.collection('foods').add({
      data: {
        userId:event.userId,
        name:event.foodname,
        fat:event.fat.value,
        cho:event.cho.value,
        kcal:event.kcal.value,
        detail:event.foodDetail,
        createDate: new Date(),
      }
    })
  } catch (e) {
    console.log(e)
  }
}
