// 定义数据格式

/***
 * 
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 * 
 * 
 */
var __keysColor = [];

var __mindKeys = [];

function initColors(colors){
    __keysColor = colors;
}

function initMindKeys(keys){
    __mindKeys = keys;
}

function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
    var temData = {};
    var view = {
        barHeight: barHeight,
        isShow: false
    }
    
    if(typeof(isShowKey) == 'undefined'){
        view.isShowSearchKey = true;
    }else{
        view.isShowSearchKey = isShowKey;
    }

    if(typeof(isShowHis) == 'undefined'){
        view.isShowSearchHistory = true;
    }else{
        view.isShowSearchHistory = isShowHis;
    }
    temData.keys = keys;
    wx.getSystemInfo({
        success: function(res) {
            var wHeight = res.windowHeight;
            view.seachHeight = wHeight-barHeight;
            temData.view = view;
            that.setData({
                wxSearchData: temData
            });
        }
    })
    
    if (typeof (callBack) == "function") {
        callBack();
    }
    
    getHisKeys(that);
}

function wxSearchInput(e, that, callBack){
    var temData = that.data.wxSearchData;
    var text = e.detail.value;
    var mindKeys = [];
   let returnFoodList = [];
    if(typeof(text) == "undefined" || text.length == 0){
        
    }else{
    }
    temData.mindKeys = returnFoodList
    temData.value = text;
    if(text==""){
      temData.view.isShowSearchHistory=true;
    }else{
      temData.view.isShowSearchHistory=false;
    }
   
    //temData.mindKeys = mindKeys;
    that.setData({
        wxSearchData: temData
    });

    console.log(temData)
}

function wxSearchFocus(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.view.isShow = true;
    that.setData({
        wxSearchData: temData
    });
    //回调
    if (typeof (callBack) == "function") {
        callBack();
    }
}
function wxSearchBlur(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.value = e.detail.value;
    that.setData({
        wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
        callBack();
    }
}

function wxSearchHiddenPancel(that){
    var temData = that.data.wxSearchData;
    temData.view.isShow = false;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchKeyTap(e, that, callBack) {
    //回调
    var temData = that.data.wxSearchData;
    var text = e.target.dataset.key
    temData.value = text;
    that.setData({
      wxSearchData: temData
  });

}
function wxSearchOnAddFood(e,that){
  console.log(e.target.dataset)
    that.setData({
        isAdding: true,
        nowAddingFood:e.target.dataset.key
      })
}
function getHisKeys(that) {
    var value = [];
    try {
        value = wx.getStorageSync('wxSearchHisKeys')
        if (value) {
            // Do something with return value
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        }
    } catch (e) {
        // Do something when catch error
    }
    
}
function wxSearchAddHisKey(that) {
    wxSearchHiddenPancel(that);
    var text = that.data.wxSearchData.value;
    //var array = that.data.wxSearchData.mindKeys;
    var sour = that.data.activeTab;
    if(typeof(text) == "undefined" || text.length == 0){return;}
    wx.cloud.callFunction({
        name: 'searchFood',
        data: {
            searchContent:text,
            source:sour,
            limit: 20, //每次拉取数量
            //old_data:array
        },
        complete: res => {
            var returnFoodList = res.result.data
            //console.log(returnFoodList)
            var temData = that.data.wxSearchData;
            temData.mindKeys = returnFoodList
            temData.value = text;
            temData.view.isShow = true;
            temData.view.isShowSearchKey=false;
            temData.view.isShowSearchHistory=false;
            that.setData({
                wxSearchData: temData
            });
            console.log(temData)
            console.log(sour)
          },
      })
    
    var value = wx.getStorageSync('wxSearchHisKeys');
    if(value){
        if(value.indexOf(text) < 0){
            value.unshift(text);
        }
        wx.setStorage({
            key:"wxSearchHisKeys",
            data:value,
            success: function(){
                getHisKeys(that);
            }
        })
    }else{
        value = [];
        value.push(text);
        wx.setStorage({
            key:"wxSearchHisKeys",
            data:value,
            success: function(){
                getHisKeys(that);
            }
        })
    }
    
    
}
function wxSearchDeleteKey(e,that) {
    var text = e.target.dataset.key;
    var value = wx.getStorageSync('wxSearchHisKeys');
    value.splice(value.indexOf(text),1);
    wx.setStorage({
        key:"wxSearchHisKeys",
        data:value,
        success: function(){
            getHisKeys(that);
        }
    })
}
function wxSearchDeleteAll(that){
    wx.removeStorage({
        key: 'wxSearchHisKeys',
        success: function(res) {
            var value = [];
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        } 
    })
}
function onReachBottom() {  
    !this.data.isEndOfList && this.getData()
  }


module.exports = {
    init: init,
    initColor: initColors,
    initMindKeys: initMindKeys,
    wxSearchInput: wxSearchInput,
    wxSearchFocus: wxSearchFocus,
    wxSearchBlur: wxSearchBlur,
    wxSearchKeyTap: wxSearchKeyTap,
    wxSearchAddHisKey:wxSearchAddHisKey,
    wxSearchDeleteKey:wxSearchDeleteKey,
    wxSearchDeleteAll:wxSearchDeleteAll,
    wxSearchHiddenPancel:wxSearchHiddenPancel,
    wxSearchOnAddFood:wxSearchOnAddFood
}