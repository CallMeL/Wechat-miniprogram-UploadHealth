// pages/home/food-detail/food-detail.js

const globalEnv = getApp()
Page({ 
  data: {
    temp:[],
    isShow_03: false,
    listData_03:[['1', '2','3', '4','5'],['1/2','1/4'],['每单位']],
    picker_03_data:[],
    unit : null,
    food:Object,
    foodId:null,
    foodDetail:null
  },

  onLoad: function (options) {
    var that=this
    var queryBean = JSON.parse(options.queryBean);
    that.setData({
      food: queryBean,
      foodDetail: queryBean.detail,
      listData_03:options.list,
      isShow_03:true
    })

    //this.data.listData_03[2].push(this.data.food.units[0].unit)
    console.log(this.data.listData_03)
    //console.log(this.data.food) 
    //console.log(this.data.food.units[0].gram) 
  },
          //* 金额千分位加逗号，保留2位小数，不足补零，否则四舍五入
        // * 参数说明：
        // * num：要格式化的数字 string或者number
        // * decimals：保留几位小数
        // * thousandsSep：千分位符号
        // return 金额格式的字符串,如'1,234,567.45'
        // * */
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
    //console.log(this.data.listData_03[0])
    var num2 = this.data.picker_03_data[1].replace("/","")
    //console.log(num2[1])
    num2 = parseInt(num2[1])
    var sum = Number(num1+(1/num2))
    //console.log(sum)
    for (let index = 0; index < this.data.foodDetail.length; index++) {
      var up ='foodDetail['+index+'].value'
      var num = this.data.foodDetail[index].value
      this.setData({
        [up] : (num * sum).toFixed(2),
        foodDetail:this.data.foodDetail
      })
    }
    console.log(this.data.foodDetail)
  },
  cancleCallBack_03 () {
    this.setData({
      isShow_03: false,
    })
  },
})