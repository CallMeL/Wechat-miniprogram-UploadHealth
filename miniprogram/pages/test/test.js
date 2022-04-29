Page({
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var array = that.data.food;
    var name = '';
    if(that.data.TabCur == 0){
      name = 'zaoCan'
    }else if(that.data.TabCur == 1){
      name = 'wuCan'
    }else if(that.data.TabCur == 2){
      name = 'wanCan'
    }
    if(that.data.value == ''){
      db.collection(name).skip(array.length).get({
        success(res){
          if(res.data.length !== 0){
            for(var i = 0; i < res.data.length; i++){
              array.push(res.data[i]);
            }
            console.log(array);
            that.setData({
              food:array
            })
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '加载成功',
                })
              },
            })
          }else {
            wx.showToast({
              icon:'none',
              title: '无更多菜谱',
            })
          }
        }
      })
    }else {
      db.collection(name).skip(array.length).where({
        name:db.RegExp({
          regexp:that.data.value,
          options:'i'
        })
      }).get({
        success(res){
          if(res.data.length !== 0){
            console.log(res.data);
            for(var i = 0; i < res.data.length; i++){
              array.push(res.data[i]);
            }
            console.log(array);
            that.setData({
              food:array
            })
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '加载成功',
                })
              },
            })
          }else {
            wx.showToast({
              icon:'none',
              title: '无更多信息',
            })
          }
        }
      })
    }
  },
})
