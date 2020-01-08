// miniprogram/pages/profile/editProfile/head/head.js

const app = getApp();
const db = wx.cloud.database();
let photo = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: ''
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
      userPhoto: app.userInfo.userPhoto,
    })
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
  //使用微信头像
  bindGetUserInfo(ev){
    wx.showLoading({
      title: '上传中',
    });
    //获取APP中的微信用户信息
    let userInfo = ev.detail.userInfo;
    console.log('微信用户信息'+ JSON.stringify(userInfo))
    this.setData({
      userPhoto: userInfo.avatarUrl,
    });
    //更新数据库
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        userPhoto: this.data.userPhoto,
      }
    }).then( res => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功',
      });
      app.userInfo.userPhoto = this.data.userPhoto;
    }).catch( err => {
      wx.hideLoading();
      wx.showToast({
        title: '上传失败',
        icon: 'loading'
      });
      console.log(err);
    });

  },
  handleImage(){
    //选择图片
    wx.chooseImage({
      count: 1,   //选择一张
      sizeType: ['compressed'],    // ['original', 'compressed']  原图 或者压缩过的
      sourceType: ['album', 'camera'],    //打开本地图库，照相机
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths[0]
        //更新页面图片路径进行预览
        this.setData({
          userPhoto: tempFilePaths,
        })
      }
    });
    this.photo = this.data.userPhoto;
  },
  //自定义头像   //将图片上传到云
  uploadImage(){
    wx.showLoading({
      title: '上传中',
    });
    //问题：小程序中图片是有缓存的
    //解决：添加随机数，时间戳
    let cloudPath = 'userPhotos/' + app.userInfo._openid + Date.now() +".jpg";
    wx.cloud.uploadFile({
      cloudPath, // 上传至云端的路径
      filePath: this.data.userPhoto, // 小程序临时文件路径
    }).then( res => {
      
      console.log('上传成功后：'+JSON.stringify(res))
      let fileID = res.fileID
      //更新数据库
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          userPhoto: fileID
        }
      })
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '上传并更新成功',
      });
      app.userInfo.userPhoto = this.data.userPhoto;
    });
  }
})