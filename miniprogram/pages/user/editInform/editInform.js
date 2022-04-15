// pages/user/editInform/editInform.js
import HomeModel from '../../../models/home'
import { showToast } from '../../../utils/UIUtil'
const globalEnv = getApp()
Page({
  data: {
    Details:null,
    activity: 0,
    email:"",
    inputValue: '',
    gender:null,
    height:null,
    weight:null,
    age:null,

  },
  onLoad() {
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
       })
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
  editWeight:function(e) {
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
    wx.cloud.callFunction({
      name: 'editUser',
      data: {
        userId:globalEnv.data.userId,
        activity:this.data.activity,
        email:this.data.email,
        gender:this.data.gender,
        age:this.data.age,
        weight:this.data.weight,
        height:this.data.height,
      }
    }).then(
      
      wx.navigateBack({
        delta: 1
      })
    )
  }
})
