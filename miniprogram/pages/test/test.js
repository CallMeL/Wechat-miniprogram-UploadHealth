Page({

  data: {
    recordList:[]
  },

  getData(dataBaseName = "buyerBasics", skipNumber = 0, needNumber = 50){
    wx.cloud.callFunction({
      name:"test",
      data:{
        searchContent:"啤酒",
        source:false,
        databaseName:dataBaseName,
        skipNumber:skipNumber,
        needNumber:needNumber
      }
    })
    .then(res=>{
      console.log(res.result)

      var oldRecordList = this.data.recordList
      var newRecordList = oldRecordList.concat(res.result.data)
      this.setData({
        recordList:newRecordList
      })
    })
  },

  onLoad: function (options) {
    this.getData()
  },

  onReachBottom: function () {
    this.getData("buyerBasics",this.data.recordList.length,3)
  }
})
