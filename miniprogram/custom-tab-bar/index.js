const app = getApp()
Component({
  onShow(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0   // 根据tab的索引值设置
      }) 
    }
  },
  ready:function(){
    this.setData({
      selected: app.globalData.selectedIndex
    })
  },
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#31869B",
    fontWeight:'bold',
    "list": [
      {
        "current": 0,
        "pagePath": "/pages/home/index",
        "text": "主页",
        "iconPath": "../images/tab-bar/home.png",
        "selectedIconPath": "../images/tab-bar/home-act.png"
      },
      {
        "current": 1,
        "pagePath": "/pages/calendar/index",
        "text": "日历",
        "iconPath": "../images/tab-bar/cal.png",
        "selectedIconPath": "../images/tab-bar/cal-act.png"
      },
      {
        "current": 2,
        "pagePath": "/pages/user/index",
        "text": "我的",
        "iconPath": "../images/tab-bar/user.png",
        "selectedIconPath": "../images/tab-bar/user-act.png"
      }
    ]
  },
  attached() {
  },
  methods: {

    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      app.globalData.selectedIndex = data.index;
      wx.switchTab({ 
        url: url
        })
    }
  }
})
