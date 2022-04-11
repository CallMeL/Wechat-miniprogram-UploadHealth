Component({
  properties: {
    title: {
      type: String
    },
    inputPlaceholder: {
      type: String
    },
  },
  data: {
    foodName:"",
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
      this.triggerEvent('confirm', this.data, {})
    },
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    }
  }
})
