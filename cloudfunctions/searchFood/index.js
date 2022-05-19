const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  //let old_data = event.old_data;
  //console.log(old_data)
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
