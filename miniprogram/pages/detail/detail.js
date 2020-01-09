// miniprogram/pages/detail/detail.js

const db = wx.cloud.database();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    isFriend: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    //获取指定userID的数据
    let userId = options.userId;
    db.collection('users')
    .doc(userId)
    .get()
    .then(res => {
      this.setData({
        detail: res.data,
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  //添加好友操作
  handleAddFriend(){
    let userId = app.userInfo._id;
    if(userId){      //登录 
      let friendId = this.data.detail._id;
      db.collection('messages')
      .where({
        userId: friendId
      })
      .get()
      .then(res => {
        if(res.data.length){  //更新
          wx.cloud.callFunction({
            name: 'update',
            data: {
              collection: 'messages',
              where: {
                userId: friendId
              },
              data: `{list: _.unshift('$app.userInfo._id')}`

            }
          })
        }else{   //添加
          db.collection('messages').add({
            data: {
              userId: friendId,
              list: [userId]
            }
          }).then(res1 => {
            wx.showToast({
              title: '已提交申请',
            })
          })
        }
      })
      
    }else{   //未登录
    //跳转登录界面
    //tabbar页面跳转
      wx.switchTab({
        url: '/pages/profile/profile'
      })

    }
  }
})