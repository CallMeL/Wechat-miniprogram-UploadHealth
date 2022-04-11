// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    list:[
        {
           name:'嘻嘻1',
           task_startTime:'2020/12/03 12:56',
           task_endTime:'2020/12/03 15:56',
           work_hours:'3.0',
           money:0
         },
         {
          name:'嘻嘻2',
          task_startTime:'2020/12/03 12:56',
          task_endTime:'2020/12/03 15:56',
          work_hours:'3.0',
          money:0
        },
        {
          name:'嘻嘻3',
          task_startTime:'2020/12/03 12:56',
          task_endTime:'2020/12/03 15:56',
          work_hours:'3.0',
          money:0
        }
        
       ],
    inputValue: '',
    focusId: ''
   },
    bindFocus: function (event) {
       let id = event.currentTarget.dataset.id
       console.log(id)
       this.setData({
         focusId: id
       })
     },
    
     bindKeyInput: function (event) {
          let that = this;
       let value = Number(event.detail.value)
       let id = event.currentTarget.dataset.id
     
      
       var up = 'list[' + id + '].money';
       this.setData({
         [up]:value 
       })
    
       console.log(that.data.focusId)
       console.log(that.data.list)
      
     },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})