// pages/user/editInform/editInform.js
import HomeModel from '../../../models/home'
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({
  data: {
    parameter: [{ id: 1, name: '千克' }, { id: 2, name: '克' }],
    parameter2: [{ id: 1, name: '厘米' }, { id: 2, name: '米' }],
    Details:null,
    activity: 0,
    email:"",
    inputValue: '',
    gender:null,
    height:null,
    weight:null,
    age:null,
    save_unit2:null,
    save_unit:null,

  },
  onLoad() {
    this.data.parameter[0].checked = true;
    this.data.parameter2[0].checked = true;
      wx.cloud.database().collection('users')
      .doc(globalEnv.data.userId).get()
     .then(res =>{
      console.log(res.data.details)
        this.setData({
          Details:res.data.details,
        })
     })
     .then(res =>{
       this.setData({
        activity:this.data.Details.activity,
        email:this.data.Details.email,
        gender:this.data.Details.gender,
        age:this.data.Details.age,
        height:this.data.Details.height,
        weight:this.data.Details.weight,
        parameter: this.data.parameter,
        parameter2: this.data.parameter2,
       })
     })
     
  },
  parameterTap:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
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
  parameterTap2:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList2 = this.data.parameter2//获取Json数组
    for (var i = 0; i < parameterList2.length;i++){
      if (parameterList2[i].id == this_checked){
        parameterList2[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        parameterList2[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter2: parameterList2
    })
  },
  editActivity: function(e) {
    this.setData({
      activity: e.detail.value,
    })
  },
  editEmail:function(e) {
    this.setData({
      email: e.detail.value,
    })
  },
  editAge:function(e) {
    this.setData({
      age: e.detail.value,
    })
  },
  editHeight:function(e) {
    this.setData({
      height: e.detail.value,
    })
  },
  editWeitght:function(e) {
    this.setData({
      weight: e.detail.value,
    })
  }, 
  editGender:function(e) {
    this.setData({
      gender: e.detail.value,
    })
  },
  onCancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  onConfirm(){
    var realWeight,realHeight;
    realWeight = this.data.weight
    realHeight = this.data.height
    if(!this.data.parameter[0].checked){
      realWeight = (this.data.weight / 2).toFixed(2)
      console.log(realWeight)
    }
    if(!this.data.parameter2[0].checked){
      realHeight = (this.data.height * 100).toFixed(2)
      console.log(realHeight)
    }
    wx.cloud.callFunction({
      name: 'editUser',
      data: {
        userId:globalEnv.data.userId,
        activity:this.data.activity,
        email:this.data.email,
        gender:this.data.gender,
        age:this.data.age,
        weight:realWeight,
        height:realHeight,
      }
    }).then(
      
      wx.navigateBack({
        delta: 1
      })
    )
  }
})
