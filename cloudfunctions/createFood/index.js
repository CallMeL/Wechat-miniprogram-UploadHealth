const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const {userId, foodname,foodDetail} = event
  //if (!foodName||!foodInform|| !userId) return
  try {
    const food = await db.collection('foods').add({
      data: {
        userId,
        foodname,
        foodDetail,
        createDate: new Date(),
      }
    })

    await db.collection('food-records').add({
      data: {
        foodId: food._id
      }
    })
  } catch (e) {
    console.log(e)
  }
}
