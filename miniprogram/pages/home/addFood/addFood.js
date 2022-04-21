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
    },
    //mindKeys:['米饭','牛奶','苹果','黄瓜'],
    keys:['米饭'],//自定义热门搜索     
    tabs: ['收入', '支出', '通知','我的'],
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
  handlerStart(e) {
    let {clientX, clientY} = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({stv: this.data.stv})
  },
  handlerMove(e) {
    let {clientX, clientY} = e.touches[0];
    let {stv} = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if(stv.offset <= 0) {
      stv.offset = 0;
    } else if(stv.offset >= stv.windowWidth*(this.tabsCount-1)) {
      stv.offset = stv.windowWidth*(this.tabsCount-1);
    }
    this.setData({stv: stv});
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    let {tabs, stv, activeTab} = this.data;
    let {offset, windowWidth} = stv;
    //快速滑动
    if(endTime - this.tapStartTime <= 300) {
      //向左
      if(Math.abs(this.tapStartY - clientY) < 50) {
        if(this.tapStartX - clientX > 5) {
          if(activeTab < this.tabsCount -1) {
            this.setData({activeTab: ++activeTab})
          }
        } else {
          if(activeTab > 0) {
            this.setData({activeTab: --activeTab})
          }
        }
        stv.offset = stv.windowWidth*activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset/windowWidth);
        if (activeTab != page) {
          this.setData({activeTab: page})
        }
        stv.offset = stv.windowWidth*page;
      }
    } else {
      let page = Math.round(offset/windowWidth);
      if (activeTab != page) {
        this.setData({activeTab: page})
      }
      stv.offset = stv.windowWidth*page;
    }
    stv.tStart = false;
    this.setData({stv: this.data.stv})
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
    WxSearch.wxSearchOnAddFood(e,that);
    console.log(this.data.nowAddingFood)
    var queryBean = JSON.stringify(this.data.nowAddingFood)
    wx.navigateTo({
      url: '../../home/food-detail/food-detail?queryBean='+ queryBean
    })
  }
  
})