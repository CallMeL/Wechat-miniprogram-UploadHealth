const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  const thedetails = {
    activity:1700,
    age:20,
    email:'0@example',
    gender:0,
    height:170,
    weight:70
  }
  try {
    return await db.collection('users').add({
      data: {
        _openid: wxContext.OPENID,
        details: thedetails
      }
    })
  } catch (e) {
    console.log(e)
  }
}