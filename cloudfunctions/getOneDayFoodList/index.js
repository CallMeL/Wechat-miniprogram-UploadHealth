const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
var today = new Date().toLocaleDateString()
exports.main = async (event, context) => {
  var yy = event.date.year
  var mm = event.date.month-1
  var dd = event.date.date
  var start = new Date(yy,mm,dd,0,0,0)
  var end = new Date(yy,mm,dd,23,59,59)
  var start2 = new Date(today+" 00:00:00")
  var end2 = new Date(today+" 23:59:59")
  if (!event.userId) {
    console.log(event.userId)
    return
  }
  const _ = db.command

  try {
    console.log("calendar")
    console.log(start)
    console.log(end)
    console.log("today")
    console.log(start2)
    console.log(end2)
    console.log('in cloud search ' + event.userId)
    return await db
      .collection('food-records')
      .where({
        userId:event.userId,
        //Date:_.and(_.gte(),_.lte())
        Date:_.and(_.gte(start),_.lte(end))
      })
      .get()
  } catch (e) {
    console.log(e)
  }
}

// const cloud = require('wx-server-sdk')

// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// })
// const db = cloud.database()
// const _ = db.command
// var today = new Date().toLocaleDateString()
// exports.main = async (event, context) => {
//   if (!event.userId) {
//     console.log(event.userId)
//     return
//   }
//   const _ = db.command

//   try {
//     console.log([new Date(today+" 00:00:00"),new Date(today+" 23:59:59")])
//     console.log('in cloud search ' + event.userId)
//     return await db
//       .collection('food-records')
//       .where({
//         userId:event.userId,
//         Date:_.and(_.gte(new Date(today+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
//       })
//       .get()
//   } catch (e) {
//     console.log(e)
//   }
// }

