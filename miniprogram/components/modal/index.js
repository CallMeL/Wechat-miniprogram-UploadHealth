Component({
  properties: {
    food:Object,
    foodName:String,
    // foodDetail:{
    //   foodFat:Number,
    //   foodKcal:Number,
    //   foodFat:Number,
    //   foodCho:Number,
    // }
  },
  data: {
    isShow_03: true,
    listData_03:[['男', '女'],['已婚','未婚'],['在职','离职']],
    picker_03_data:[],

    // foodName:"",
    list: [{
        inputData: '',
        name: '蛋白质',
        union: '100g',
      }, {
        inputData: '',
        name: '脂肪',
        union: '50g',
      }],
      inputValue: '',
      focusId: ''
  },

  methods: {
    showPicker_03: function () {
      this.setData({
        isShow_03: true
      })
      console.log(this.data.isShow_03)
    },
    sureCallBack_03 (e) {
      let data = e.detail
      this.setData({
        isShow_03: false,
        picker_03_data: e.detail.choosedData,
        picker_03_index:JSON.stringify(e.detail.choosedIndexArr)
      })
    },
    cancleCallBack_03 () {
      this.setData({
        isShow_03: false,
      })
    },

    bindFocus: function (event) {
      let id = event.currentTarget.dataset.id
      console.log(id)
      this.setData({
        focusId: id
      })
    },
    inputTitle:function(event){
      let that = this;
      this.setData({
        foodName: event.detail.value
      })
    },
    bindKeyInput: function (event) {
      let that = this;
      let value = Number(event.detail.value)
      let id = event.currentTarget.dataset.id
      var up = 'list[' + id + '].inputData';
      this.setData({
        [up]:value 
      })
      console.log(that.data.focusId)
      console.log(that.data.list)
    },
    onInput(e) {
      this.data.inputData = e.detail.value
      this.triggerEvent('input', e.detail.value, {})
    },
    onConfirm() {
      console.log(this.properties.food)
      this.triggerEvent('confirm', this.data, {})
    },
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    }
  }
})
