var WxSearch = require('../../../models/wxSearch/wxSearch.js')
var app = getApp()
Page({
  data:{
    isAdding:false,
    nowAddingFood:null,
    wxSearchData:{
      view:{
        isShow: true
      }, 
      mindKeys:['米饭','牛奶','苹果','黄瓜'],
    },
    
    keys:['米饭'],//自定义热门搜索     
    tabs: ['系统食物','我的食物'],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false,      
    },
    activeTab: 0
  },
  onLoad:function(options){
    var that = this
    //初始化的时候渲染wxSearchdata
   WxSearch.init(that,43,this.data.keys);
   //WxSearch.initMindKeys(this.data.mindKeys);
   try {
      let {tabs} = this.data; 
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({stv: this.data.stv})
      this.tabsCount = tabs.length;
    } catch (e) {
    }
  },
  _updateSelectedPage(page) {
    let {tabs, stv, activeTab} = this.data;
    activeTab = page;
    this.setData({activeTab: activeTab})
    stv.offset = stv.windowWidth*activeTab;
    this.setData({stv: this.data.stv})
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
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
  },
  wxSearchOnAddFood:function(e){
    var that = this
    var list = [['1', '2','3', '4','5'],['1/2','1/4'],['克']];
    WxSearch.wxSearchOnAddFood(e,that);
    console.log(this.data.nowAddingFood)
    var units = this.data.nowAddingFood.units
    // if (units.length>0) {
    //   for (let index = 0; index < units.length; index++) {
    //     const unit = this.data.nowAddingFood.units[index].unit
    //     list[2].push(unit);       
    //   }    
    // }
    var queryBean = JSON.stringify(this.data.nowAddingFood)
    wx.navigateTo({
      url: '../../home/food-detail/food-detail?queryBean='+ queryBean+ "&list=" + list+ "&source=" + this.data.activeTab+'&fromSearch='+true,
    })
  }
  
})