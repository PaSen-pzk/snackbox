// components/callPhone/callPhone.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    //指定特殊的样式隔离选项 : isolated,启动样式隔离，使用 class 指定的样式将不会相互影响。
    //apply-shared,页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面
    styleIsolation: 'apply-shared'
  },
  properties: {
    phoneNumber: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCallPhone() {
      //拨打电话
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber //仅为示例，并非真实的电话号码
      })
    }
  }
})
