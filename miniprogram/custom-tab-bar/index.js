Component({
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2    // 根据tab的索引值设置
      }) 
    }
  },
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#31869B",
    fontWeight:'bold',
    "list": [
      {
        "current": 0,
        "pagePath": "pages/home/index",
        "text": "主页",
        "iconPath": "../images/tab-bar/home.png",
        "selectedIconPath": "../images/tab-bar/home-selected.png"
      },
      {
        "current": 1,
        "pagePath": "pages/detail/index",
        "text": "日历",
        "iconPath": "../images/tab-bar/calender.png",
        "selectedIconPath": "/images/sui-selected.png"
      },
      {
        "current": 2,
        "pagePath": "pages/user/index",
        "text": "我的",
        "iconPath": "../images/tab-bar/user.png",
        "selectedIconPath": "/images/board-selected.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log(e);
      const idx = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path
      // this.setData({
      //   selected: idx
      // })
      wx.switchTab({
        url: path,
      });
    }
  }
})
