const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { foodId, addData, note} = event

  if (!foodId) {
    return
  }

  try {
    await db
      .collection('food-records')
      .where({
        foodId
      })
      .update({
        data: {
          records: _.push([
            {
              addData,
              note
            }
          ])
        }
      })

    await db
      .collection('foods')
      .doc(foodId)
      .update()
  } catch (e) {
    console.log(e)
  }
}
