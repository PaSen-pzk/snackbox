// components/copyText/copyText.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    copyText: String
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
    handleCopyText(){
      //剪贴板
      wx.setClipboardData({
        data: this.data.copyText,
        success(res) {
          wx.showToast({
            title: '内容已复制',
          })
          // wx.getClipboardData({
          //   success(res) {
          //     console.log(res.data) // data
          //   }
          // })
        }
      })
    }
  }
})
