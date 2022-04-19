// pages/demosearch/demosearch.js
Component({
  properties: {
    warn: String,
    tips: String
  },
  /**
   * 页面的初始数据
   */
  data: {
  // list: [{'name':'连花清瘟胶囊','num':'1盒'},{'name':'感冒灵颗粒','num':'1盒'},{'name':'维生素C','num':'2瓶'},{'name':'蒲地蓝消炎片','num':'3盒'}],	//这是搜索到的结果
  // list2: [{'name':'连花清瘟胶囊','num':'1盒'},{'name':'感冒灵颗粒','num':'1盒'},{'name':'维生素C','num':'2瓶'},{'name':'蒲地蓝消炎片','num':'3盒'}],	//这是所有可供查询的记录
  focus:false,  //控制是否显示带取消按钮的搜索框
  inputValue:""
  },
methods: {
  focusHandler(e){
    this.setData({focus:true});
  },
  cancelHandler(e)
  {
    this.setData({focus:false});
  },

  query(e){
    this.setData({
      inputValue: e.detail.value
  })  //首先回显输入的字符串
  this.setData({
    list: wx.cloud.callFunction({
      name: 'searchFood',
      data: {
        searchContent:this.data.inputValue,
        source:0
      }
    })
  })
  console.log(this.data.list)
  


/***
     //实现搜索的功能
    var list = this.data.list2;		//先把第二条json存起来
    var list2 = [];		//定义一个数组
    //循环去取数据
    for(var i=0;i<list.length;i++){
      var string = list[i].name;
      //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
      if(string.indexOf(e.detail.value) >= 0){
        list2.push(list[i]);
      }
    }
    //到这里list2就已经是你查出的数据
    //如果输入的关键词为空就加载原来的全部数据，不是空就加载搜索到的数据
    if(e.detail.value == ""){
      //加载全部
      this.setData({
        list: null //list: list
      })
    } else {
      this.setData({
        list: list2
      })
    }



 */

  },

}
})