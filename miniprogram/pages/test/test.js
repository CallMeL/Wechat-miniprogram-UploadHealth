//index.js
//获取应用实例
var WxSearch = require('../../models/wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    wxSearchData:{
      view:{
        isShow: true
      }, 
    },
    //mindKeys:['米饭','牛奶','苹果','黄瓜'],
    keys:['米饭'],//自定义热门搜索   
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
   WxSearch.init(that,43,this.data.keys);
   //WxSearch.initMindKeys(this.data.mindKeys);
  },
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    
  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
    console.log(e.detail.value)
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})
