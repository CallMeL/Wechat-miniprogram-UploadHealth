import { showToast} from '../../../utils/UIUtil'
Page({
  data: {
    userId:null,
    focus: false,
    title:null,content:null
  },
  onLoad: function(options) {
    this.data.userId = options.id
    console.log(this.data.userId)
},
  textareaInput1: function(e) {
    this.data.title = e.detail.value
    //console.log(e.detail.value)
  },
  textareaInput2: function (e) {
    this.data.content = e.detail.value
   // console.log(e.detail.value)
  },

  onCancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  onAddAdvice(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否提交意见',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name:'addAdvice',
            data:{
              userId:that.data.userId,
              title:that.data.title,
              content:that.data.content
            },
            success: res => {
              console.log('done!')
              wx.showToast({
                title: '反馈成功',
                icon: 'success',
                duration: 2000,
                success:function(){
                  setTimeout(function () {
                    //要延时执行的代码
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 2000) //延迟时间
                }
              })

            },
            fail: res => {
              console.log('fail!')
              showToast('添加失败',false)
           },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  }


})
