// pages/home/food-detail/food-detail.js
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({ 
  data: {
    temp:[],
    isShow_03: false,
    listData:[['1', '2','3', '4','5'],['1/2','1/4'],['每单位']],
    picker_03_data:[],
    unit : null,
    food:Object,
    foodDetail:null,
    note:null,
    belongsto:'早餐',
    howmany:0,
    source:true,//is from our db
  },

  onLoad: function (options) {
    var that=this
    var queryBean = JSON.parse(options.queryBean);
    that.setData({
      food: queryBean,
      foodDetail: queryBean.detail,
      listData:options.list,
      source:options.source,
      isShow_03:true
    })
    //console.log(this.data)

  },
  addFoodRecord:function(){
    wx.cloud.callFunction({
      name: 'addFoodRecord',
      data: {
        userId:globalEnv.data.userId,
        foodId:this.data.food._id,
        foodName:this.data.food.name,
        belongsto:this.data.belongsto,
        howmany:this.data.howmany,
        unit:this.data.unit,
        source:this.data.source,
        note:this.data.note
      },
      success: res => {
        console.log('done!')
        showToast('创建成功', true)
        // this.getGoalList()
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: res => {
        console.log('fail!')
        showToast('创建失败')
     },
    })
  },
  showPicker_03: function () {
    this.setData({
      isShow_03: true
    })
  },
  sureCallBack_03 (e) {
    let data = e.detail
    this.setData({
      isShow_03: false,
      picker_03_data: e.detail.choosedData,
      picker_03_index:JSON.stringify(e.detail.choosedIndexArr)
    })
    var num1 = parseInt(this.data.picker_03_data[0])
    var num2 = this.data.picker_03_data[1].replace("/","")
    num2 = parseInt(num2[1])
    var sum = Number(num1+(1/num2))
    for (let index = 0; index < this.data.foodDetail.length; index++) {
      var up ='foodDetail['+index+'].value'
      var num = this.data.foodDetail[index].value
      this.setData({
        [up] : (num * sum).toFixed(2),
        foodDetail:this.data.foodDetail
      })
    }
    this.setData({
      howmany:sum,
      unit:this.data.picker_03_data[2]
    })
    console.log(this.data.howmany)
  },
  cancleCallBack_03 () {
    this.setData({
      isShow_03: false,
    })
  },
})