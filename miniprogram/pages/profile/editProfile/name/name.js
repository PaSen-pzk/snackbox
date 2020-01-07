// miniprogram/pages/profile/editProfile/name/name.js

const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      nickName: app.userInfo.nickName
    })
  },
  handleName(){
    this.updateName();
  },
  cancleName(){
    this.setData({
      nickName: ''
    })
  },
  handleinput(ev){
    let value = ev.detail.value;
    this.setData({
      nickName: value
    });
  },
  updateName(){
    wx.showLoading({
      title: '更新中',
    });
    if(this.data.nickName){
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          nickName: this.data.nickName,
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '更新成功',
        });
        app.userInfo.nickName = this.data.nickName;
      });
    }else{
      wx.hideLoading();
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
    }
    
  },
  //使用微信昵称
  bindGetUserInfo(ev) {
    
    let userInfo = ev.detail.userInfo;
    console.log('获取微信昵称' + JSON.stringify(userInfo) )
    this.setData({
      nickName: userInfo.nickName
    })
    this.updateName();
    // if (!this.data.logged && userInfo) {
    //   db.collection('users').add({
    //     data: {
    //       userPhoto: userInfo.avatarUrl,
    //       nickName: userInfo.nickName,
    //       signature: '',
    //       phoneNumber: '',
    //       weixinNumber: '',
    //       links: 0,
    //       time: new Date(),
    //       isLocation: true
    //     }
    //   }).then(res => {
        // db.collection('users').doc(app.userInfo._id).get().then(res => {
        //   console.log(res.data)
        //   app.userInfo = Object.assign(app.userInfo, res.data);
        //   //更新用户信息
        //   this.setData({
        //     // userPhoto: app.userInfo.userPhoto,
        //     nickName: res.data.nickName,
        //     // logged: true
        //   })
        // })
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})