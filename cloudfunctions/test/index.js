const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  var databaseName = event.databaseName
  var skipNumber = Number(event.skipNumber)
  var needNumber = Number(event.needNumber)


  const searchContent = event.searchContent
  const source = event.source
  //source 1: foods,customs food db
  //source 0: food, system food db
  if (!searchContent) {
    console.log('foodName cannot be null ')
    return
  }
  try {
    console.log('in cloud search for'+searchContent)
    if(source){
      return await db
      .collection('foods')
      .where({
        name:{
          $regex:'.*' + searchContent + '.*'
        }
      })
      .skip(skipNumber).limit(needNumber)
      .get()
    }else{
      return await db
      .collection('food')
      .where({
        name:{
          $regex:'.*' + searchContent + '.*'
        }
      })
      .skip(skipNumber).limit(needNumber)
      .get()    
    }

  } catch (e) {
    console.log(e)
  }
}
