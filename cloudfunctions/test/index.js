const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
var today = new Date().toLocaleDateString()
exports.main = async (event, context) => {
  if (!event.userId) {
    console.log(event.userId)
    return
  }
await db.collection('food-records').aggregate()
  .match({
    userId:event.userId,
    Date:_.and(_.gte(new Date(today+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
  })
  .lookup({
    from: 'food',
    let: {
      id: '$foodId',
    },
    pipeline: $.pipeline()
      .match(_.expr($.and([
        $.eq(['$_id', '$$id']),
      ])))
      .project({
        //foodDetail: ["$name", "$kind", "$tips", "$src", "$src"],
        name: 1,
        kind: 1,
        ratio: 1,
        tips:1,
        src:1,
      })
      .done(),
    as: 'foodDetail1',
  })
  .lookup({
    from: 'foods',
    let: {
      id: '$foodId',
    },
    pipeline: $.pipeline()
      .match(_.expr($.and([
        $.eq(['$_id', '$$id']),
      ])))
      .project({
        //foodDetail: ["$name", "$kind", "$tips", "$src", "$src"],
        name: 1,
      })
      .done(),
      as: 'foodDetail2',
  })  
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$foodDetail1', 0]), $.arrayElemAt(['$foodDetail2', 0]) ])
  })
    .end()
    .then(res => {
      console.log("find")
      console.log(res)
      return res
    })
    .catch(err => console.error(err))
}
