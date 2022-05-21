// pages/home/food-detail/food-detail.js
import { showToast , showModal} from '../../../utils/UIUtil'
import HomeModel from '../../../models/home'
const globalEnv = getApp()
Page({ 
  data: {
    
    parameter: [{ id: 1, name: '早餐' }, { id: 2, name: '午餐' },{ id: 3, name: '晚餐' },{ id: 4, name: '零食' }],
    showmore:false,
    Q:null,photo:null,
    fromSearch:null,//false: direct from search Page, true: direct from home Page
    temp:[],
    isShow_03: false,listData:[['1', '2','3', '4','5'],['0','1/2','1/4'],['每单位']],picker_03_data:[],
    unit : null,
    food:Object,foodId:null,foodDetail:null,foodName:null,recordId:null,
    note:null,
    belongsto:'早餐',howmany:0,source:null,//is from our db
  },
  onLoad: function (options) {
    var myDate = new Date();
    var that=this
    var queryBean = JSON.parse(options.queryBean);
    this.data.Q = JSON.parse(options.queryBean),
    console.log('from Search?'+options.fromSearch)
    console.log(queryBean)
    if(options.fromSearch==1){
      console.log('in true')
      that.setData({   
        fromSearch:options.fromSearch,
        food: queryBean,
        recordId:queryBean._id,
        photo:queryBean.src,
        foodName:queryBean.name,
        foodDetail: queryBean.detail,
        listData:options.list,
        source:options.source,
        isShow_03:true
      })
    }else{
      this.setData({
        foodId:queryBean.foodId,
        recordId:queryBean._id,
        belongsto:queryBean.belongsto,
        howmany:queryBean.howmany,
        source:queryBean.source,
        isShow_03:false,
      })
      this.getFoodById()
    }
    if(myDate.getHours()<11){
      this.data.parameter[0].checked = true;
    }
    if(10<myDate.getHours()){
      if(myDate.getHours()<17)this.data.parameter[1].checked = true;
    }
    if(16<myDate.getHours()){
      this.data.parameter[2].checked = true;
    }
   
    this.setData({
      parameter: this.data.parameter,
    })
    //console.log(this.data)
  },
  getFoodById:function(){
    wx.cloud.callFunction({
      name:'getFoodByID',
      data:{
        foodId:this.data.foodId,
        source:this.data.source
      },
      success: res => {
        console.log('get foodbyID done!')
        console.log(this.data.foodId)
        console.log(res)
        this.setData({
          Q:JSON.parse(JSON.stringify(res.result.data[0])),
          food:res.result.data[0],
          foodDetail:res.result.data[0].detail,
          foodName:res.result.data[0].name,
          photo:res.result.data[0].src,
          createDate:res.result.data[0].createDate,
        })
        for (let index = 0; index < this.data.foodDetail.length; index++) {
          var up ='foodDetail['+index+'].value'
          var num = this.data.foodDetail[index].value
          this.setData({
            [up] : (num * this.data.howmany).toFixed(2),
            foodDetail:this.data.foodDetail
          })
        }
      },
      fail: res => {
        console.log('fail!'+res)
     },
    })
  },
  editFoodRecord:function(){
    var that = this
    wx.showModal({
      title: '是否修改',
      content: '份数为'+this.data.howmany,
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name:'editFoodRecord',
            data:{
              recordId:that.data.recordId,
              howmany:that.data.howmany
            },
            success: res => {
              console.log('done!')
              showToast('修改成功', true)
              wx.navigateBack({
                delta: 1,
              })
            },
            fail: res => {
              console.log('fail!')
              showToast('修改失败',false)
           },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addFoodRecord:function(){
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length;i++){
      if (parameterList[i].checked == true){
       this.data.belongsto = parameterList[i].name//当前点击的位置为true即选中
      }
    }
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
  deletFoodRecord:function() {
    console.log("delete "+this.data.recordId)
    showModal('', "是否删除", () => {
      HomeModel.removeRecord(this.data.recordId).then(
        res => {
          wx.navigateBack({
            delta: 1
          })
        },
        err => {
          showToast('删除失败')
        }
      )
    })

  },
  showPicker_03: function () {
   
    this.setData({
      isShow_03: true
    })
    console.log(this.data.isShow_03)
  },
  sureCallBack_03 (e) {
    //console.log(e.detail)
    this.setData({
      isShow_03: false,
      picker_03_data: e.detail.choosedData,
      picker_03_index:JSON.stringify(e.detail.choosedIndexArr)
    })
    console.log(this.data.picker_03_data)
    var num1 = parseInt(this.data.picker_03_data[0])
    var num2 = 0
    if(this.data.picker_03_data[1]==0){
      num2 = 0
    }else{
      num2 = this.data.picker_03_data[1].replace("/","")
    }
    if(num2!=0){
      num2 = parseInt(num2[1])
      var sum = Number(num1+(1/num2))
    }else{
      var sum = Number(num1)
    }
    //console.log(this.data.foodDetail)
    for (let index = 0; index < this.data.foodDetail.length; index++) {
      var up ='foodDetail['+index+'].value'
      //console.log(num)
      this.setData({
        [up] : (this.data.Q.detail[index].value * sum).toFixed(2),
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
  show: function () {
    this.setData({
      showmore: !this.data.showmore
    })
  },
  parameterTap:function(e){
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length;i++){
      if (parameterList[i].id == this_checked){
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList
    })
  },
})