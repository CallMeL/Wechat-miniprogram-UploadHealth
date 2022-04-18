const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const searchContent = event.searchContent
  const z = event.source
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
        foodname:{
          $regex:'.*' + searchContent + '.*'
        }

      })
      .get()
    }else{
      return await db
      .collection('food')
      .where({
        name:{
          $regex:'.*' + searchContent + '.*'
        }
      })
      .get()    
    }

  } catch (e) {
    console.log(e)
  }
}
