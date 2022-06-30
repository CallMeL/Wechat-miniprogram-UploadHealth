import todo from '../../components/v2/plugins/todo'
import selectable from '../../components/v2/plugins/selectable'
import solarLunar from '../../components/v2/plugins/solarLunar/index'
import timeRange from '../../components/v2/plugins/time-range'
import week from '../../components/v2/plugins/week'
import holidays from '../../components/v2/plugins/holidays/index'
import plugin from '../../components/v2/plugins/index'
import { showToast } from '../../utils/UIUtil'
import HomeModel from '../../models/home'
const globalEnv = getApp()
plugin
  .use(todo)
  .use(solarLunar)
  .use(selectable)
  .use(week)
  .use(timeRange)
  .use(holidays)

var Charts = require('../../utils/charts.js');
var wxCharts = require('../../utils/wxcharts.js');
const conf = {
  data: {
    data:0,
    pro:0,
    cho:0,
    fat:0,
    sum:0,
    kcal:0,
    recKcal:2000,
    calendarConfig: {
      theme: 'elegant',
      weekMode: true,
      preventSwipe: false,
      disableMode: {
        // 禁用某一天之前/之后的所有日期
        type: 'after', // [‘before’, 'after']
      },
      // showHolidays: true,
      // emphasisWeek: true,
      // chooseAreaMode: true
      // defaultDate: '2020-9-8',
      // autoChoosedWhenJump: true
    },
    BF:false,LC:false,DN:false,SN:false,
    pieOpt: {},
    hasCreateUser:false,
    userId:null,
    userInfo: null,
    foodList: null,
    isDataLoaded: false,
    isPieInited: false,
    isCreating: false,
    isUploading: false,
    score:60
  },
  afterTapDate(e) {
    console.log('afterTapDate', e.detail)
    this.getOneDayFoodList()
  },
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
  },
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail)
  },
  takeoverTap(e) {
    console.log('takeoverTap', e.detail)
  },
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e)
    const calendar = this.selectComponent('#calendar').calendar
    calendar.weekModeJump()
  },
  onSwipe(e) {
    console.log('onSwipe', e)
  },
  showToast(msg) {
    if (!msg || typeof msg !== 'string') return
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500
    })
  },
  generateRandomDate(type) {
    let random = ~~(Math.random() * 10)
    switch (type) {
      case 'year':
        random = 201 * 10 + ~~(Math.random() * 10)
        break
      case 'month':
        random = (~~(Math.random() * 10) % 9) + 1
        break
      case 'date':
        random = (~~(Math.random() * 100) % 27) + 1
        break
      default:
        break
    }
    return random
  },
  handleAction(e) {
    const { action, disable } = e.currentTarget.dataset
    if (disable) {
      this.showToast('抱歉，还不支持～😂')
    }
    this.setData({
      rst: []
    })
    const calendar = this.selectComponent('#calendar').calendar
    const { year, month } = calendar.getCurrentYM()
    switch (action) {
      case 'config':
        calendar
          .setCalendarConfig({
            showLunar: false,
            theme: 'elegant',
            multi: true
          })
          .then(conf => {
            console.log('设置成功：', conf)
          })
        break
      case 'getConfig':
        const config = calendar.getCalendarConfig()
        this.showToast('请在控制台查看结果')
        console.log('自定义配置: ', config)
        break
      case 'jump': {
        const year = this.generateRandomDate('year')
        const month = this.generateRandomDate('month')
        const date = this.generateRandomDate('date')
        const config = calendar.getCalendarConfig()
        if (config.weekMode) {
          calendar['weekModeJump']({ year, month, date })
        } else {
          calendar[action]({ year, month, date })
        }
        break
      }
      case 'getSelectedDates': {
        const selected = calendar[action]()
        if (!selected || !selected.length)
          return this.showToast('当前未选择任何日期')
        this.showToast('请在控制台查看结果')
        console.log('get selected dates: ', selected)
        const rst = selected.map(item => JSON.stringify(item))
        this.setData({
          rst
        })
        break
      }
      case 'cancelSelectedDates':
        const selected = calendar.getSelectedDates()
        calendar[action](selected)
        break
      case 'setTodos': {
        const dates = [
          {
            year,
            month,
            date: this.generateRandomDate('date'),
            todoText: Math.random() * 10 > 5 ? '领奖日' : ''
          }
        ]
        calendar[action]({
          showLabelAlways: true,
          dates
        })
        console.log('set todo: ', dates)
        break
      }
      case 'deleteTodos': {
        const todos = [...calendar.getTodos()]
        if (todos.length) {
          calendar[action]([todos[0]]).then(() => {
            const _todos = [...calendar.getTodos()]
            setTimeout(() => {
              const rst = _todos.map(item => JSON.stringify(item))
              this.setData(
                {
                  rst
                },
                () => {
                  console.log('delete todo: ', todos[0])
                }
              )
            })
          })
        } else {
          this.showToast('没有待办事项')
        }
        break
      }
      case 'clearTodos':
        const todos = [...calendar.getTodos()]
        if (!todos || !todos.length) {
          return this.showToast('没有待办事项')
        }
        calendar[action]()
        break
      case 'getTodos': {
        const selected = calendar[action]()
        if (!selected || !selected.length)
          return this.showToast('未设置待办事项')
        const rst = selected.map(item => JSON.stringify(item))
        rst.map(item => JSON.stringify(item))
        this.setData({
          rst
        })
        break
      }
      case 'disableDates':
        calendar[action]([
          {
            year,
            month,
            date: this.generateRandomDate('date')
          }
        ])
        break
      case 'enableArea': {
        let sDate = this.generateRandomDate('date')
        let eDate = this.generateRandomDate('date')
        if (sDate > eDate) {
          ;[eDate, sDate] = [sDate, eDate]
        }
        const area = [`${year}-${month}-${sDate}`, `${year}-${month}-${eDate}`]
        calendar[action](area)
        this.setData({
          rstStr: JSON.stringify(area)
        })
        break
      }
      case 'enableDates':
        const dates = [
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`
        ]
        calendar[action](dates)
        this.setData({
          rstStr: JSON.stringify(dates)
        })
        break
      case 'switchView':
        if (!this.week) {
          calendar[action]('week').then(calendarData => {
            console.log('switch success!', calendarData)
          })
          this.week = true
        } else {
          calendar[action]().then(calendarData => {
            console.log('switch success!', calendarData)
          })
          this.week = false
        }
        break
      case 'setSelectedDates':
        const toSet = [
          {
            year,
            month,
            date: this.generateRandomDate('date')
          },
          {
            year,
            month,
            date: this.generateRandomDate('date')
          }
        ]
        calendar[action](toSet)
        break
      case 'getCalendarDates':
        this.showToast('请在控制台查看结果')
        console.log(
          calendar.getCalendarDates({
            lunar: true
          })
        )
        break
      default:
        break
    }
  },
 calculate:function(){
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
          foodDetail:res.result.data[0].detail,
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
  getOneDayFoodList:function(){
    
    const options = {
      lunar: true // 在配置showLunar为false, 但需返回农历信息时使用该选项，使用此配置需引用农历插件
    }
    const calendar = this.selectComponent('#calendar').calendar
    console.log(calendar.getSelectedDates(options)[0])
    wx.cloud.callFunction({
       // 云函数名称
       name: 'getOneDayFoodList',
       // 传给云函数的参数
       data: {
         userId:globalEnv.data.userId,
         date:calendar.getSelectedDates(options)[0]
       },
       success: res => {
         console.log(res)
         this.setData({
           foodList: res.result.data,
           BF:false,
           LC:false,
           DN:false,
           SN:false,
           pro:0,
           cho:0,
           fat:0,
           sum:0,
           kcal:0
         })

         for (let index = 0; index < this.data.foodList.length; index++) {
          
           var up ='foodList['+index+'].Date'
           var time = new Date(this.data.foodList[index].Date)
           var hour = time.getHours()
           var min = time.getMinutes()
           var foodDetail, howmany
           //console.log(num)
           this.setData({
             [up] : (hour+':'+min),
             foodDetail:this.data.foodDetail
           })

           if (this.data.foodList[index].belongsto=='早餐'){
             this.setData({BF:true})
           }
          
           if (this.data.foodList[index].belongsto=='午餐'){
             this.setData({LC:true})
           }
           if (this.data.foodList[index].belongsto=='晚餐'){
             this.setData({DN:true})
           }
           if (this.data.foodList[index].belongsto=='零食'){
             this.setData({SN:true})
           }


          //begin calculation
          console.log(this.data.foodList)
          wx.cloud.callFunction({
            name:'getFoodByID',
            data:{
              foodId:this.data.foodList[index].foodId,
              source:this.data.foodList[index].source
            },
            success: res => {
              console.log('get foodbyID done!')
              console.log(this.data.foodList[index].foodId)
              console.log(res)
              // this.setData({
              //   Q:JSON.parse(JSON.stringify(res.result.data[0])),
              foodDetail = res.result.data[0].detail
              howmany = this.data.foodList[index].howmany
              this.setData({
                kcal: this.data.kcal + foodDetail[0].value*howmany,
                pro: this.data.pro + foodDetail[3].value*howmany,
                cho: this.data.cho + foodDetail[2].value*howmany,
                fat: this.data.fat + foodDetail[1].value*howmany,
              })
                this.setData({
                  sum: this.data.pro +  this.data.cho +  this.data.fat
                })
                this.setData({
                  pro_p:(this.data.pro/this.data.sum*100).toFixed(2),
                  cho_p:(this.data.cho/this.data.sum*100).toFixed(2),
                  fat_p:(this.data.fat/this.data.sum*100).toFixed(2),
                })
                console.log("--sum is:" + this.data.sum + "\npro is:" + this.data.pro + "\ncho:" + this.data.cho + "\nfat: " +  this.data.fat )
                console.log(this.data.kcal)
                this.setChart()

            },
            fail: res => {
              console.log('fail!'+res)
           }
          })
         }

         console.log(this.data.foodList)

         this.setChart()
       },
       fail: res => {
         console.log('fail!')
      },
     })
   },
   setChart(){
    // var ts = new Date().getTime()
    // const calendar = this.selectComponent('#calendar').calendar
    // const date = calendar.getSelectedDates({lunar:true})[0]
    // this.setData({
    //   owner: "" + date.year + date.month + date.date
    // })
    // console.log(ts)
    // console.log(!this.data.visited.includes(ts))
    //   this.setData({
    //     owner: "" + ts
    //   })
    // this.setData({
    //   owner: this.data.owner + 1
    // })
    //   console.log("11111111111sum is:" + this.data.sum + "\npro is:" + this.data.pro + "\ncho:" + this.data.cho + "\nfat: " +  this.data.fat )
    //   console.log("11111111111111111111")

      new Charts({
        type:"ring",
        data: [this.data.pro, this.data.fat,this.data.cho],
        colors: ["#7158ec", "#fec312", "#1db2f4"],
        canvasId:"chart1",// + this.data.owner,
        point: {
            x: 95,
            y: 95
        },
        radius : 60
    });
    var rest = 0
    if(this.data.kcal >= this.data.recKcal){
      rest = 0
    }
    else{
      rest = this.data.recKcal-this.data.kcal
    }
    new Charts({
        type:"ring",
        data: [this.data.kcal,rest],
        colors: ["#ff3444", "#eee"],
        canvasId: "chart2",// + this.data.owner,
        point: {
            x: 95,
            y: 95
        },
        radius : 60,
    });
    new wxCharts({
      canvasId: 'chart5',
      type: 'line',
      categories: [1,2,3],
      animation: false,
      // background: '#f5f5f5',
      series: [{
          name: '热量',
          data: [4,5,6],
          format: function (val, name) {
              return val.toFixed(2) + '万';
          }
      }],
      xAxis: {
          disableGrid: true
      },
      width: 350,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
          lineStyle: 'curve'
      }
  });
    console.log("chart1" + this.data.owner + "    chart2" + this.data.owner)
   },
   onLoad() {
     this.initUserInfo()  
   },
   onShow() {
     // 若初始化id失败则在catch中初始化userId，否则直接获取列表
     this.initOpenIdAndUserId()
       .then()
       .catch(err => {
         if (err === 0) {
           this.data.hasCreateUser = true
           return this.initUserId()        
         }
       })
       .then(() => { 
        wx.cloud.database().collection('users')
        .doc(globalEnv.data.userId).get()
        .then(res =>{
          console.log(res.data.details)
            this.setData({
              recKcal:res.data.details.activity,
            })
        })
         this.getOneDayFoodList()
       })
   },
 
   onAuthorize(e) {
     if (e.detail.userInfo) {
       this.setData({
         userInfo: e.detail.userInfo
       })
     }
   },
 
 
   onShareAppMessage() {
     return {
       title: '我在用 UploadHealth 来记录饮食'
     }
   },
 
 
   JumpToAddFoodPage(){
     if (!this.data.userInfo) {
       showToast('请先授权登录')
       return
     }
     wx.navigateTo({
       url: '../../pages/home/addFood/addFood'
     })
   },
 
   initUserInfo() {
     HomeModel.getUserInfo().then(
       res => {
         this.setData({
           userInfo: res.userInfo,
           hasCreateUser:true
         })
       },
       err => {
         showToast('请先授权登录')
         console.log(err)
       }
     )
   },
 
   initOpenIdAndUserId() {
     return new Promise((resolve, reject) => {
       HomeModel.getOpenIdAndUserId().then(
         res => {
           const idData = res.result
           globalEnv.data.openid = idData.openId
           if (idData.userId) {
             globalEnv.data.userId = idData.userId
             this.setData({
               userId:globalEnv.data.userId,
             })
             resolve()
           } else {
             reject(0)
           }
         },
         err => {
           if (err.errCode === -1) {
             showToast('网络不佳，登录失败')
           } else {
             showToast(`登录失败，错误码：${err.errCode}`)
           }
           reject(-1)
         }
       )
     })
   },
 
   initUserId() {
     return new Promise((resolve, reject) => {
       HomeModel.addUserId().then(
         res => {
           globalEnv.data.userId = res._id
           resolve()
         },
         err => {
           showToast(`添加用户id失败，错误码：${err.errCode}`)
           reject()
         }
       )
     })
   },
  
   onFoodClick(e) {
     var queryBean = JSON.stringify(e.currentTarget.dataset.inform)
     wx.navigateTo({
       url: '../home/food-detail/food-detail?queryBean='+ queryBean+"&fromSearch="+0
     })
   }
}
Page(conf)
