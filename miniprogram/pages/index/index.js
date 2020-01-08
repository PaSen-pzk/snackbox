// miniprogram/pages/index/index.js

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/swiper/photo-1551334787-21e6bd3ab135.jpg',
      '../../images/swiper/photo-1551214012-84f95e060dee.jpg',
      '../../images/swiper/photo-1551446591-142875a901a1.jpg'
    ],
    listData: [],
    current : 'links'
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
    //加载页面数据
    this.getListData();
  },
  //获取页面数据
  getListData() {
    db.collection('users')
    .field({
      userPhoto: true,
      nickName: true,
      links: true
    })
    .orderBy(this.data.current,'desc')
    .get()
    .then(res => {
      // console.log(JSON.stringify(res))
      this.setData({
        listData: res.data,
      })
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
  handleLinks(ev){
    
    console.log(JSON.stringify(ev))
    //获取页面自定义属性的值
    let id = ev.target.dataset.id;
    //修改点赞
    // db.collection('users').doc(id).update({
    //   data: {
    //     links : 5
    //   }
    // }).then(res => {
      
    // });
    //使用云函数
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: 'users',
        doc: id,
        data: '{ links: _.inc(1) }'
      }
    }).then(res => {
      // console.log(JSON.stringify(res));
      //更新页面数据
      let updated = res.result.stats.updated;
      if(updated) {
        let cloneListData = [...this.data.listData]
        for(let i=0;i<cloneListData.length;i++) {
          if(cloneListData[i]._id == id){
            cloneListData[i].links++;
          }
        }
        this.setData({
          listData: cloneListData
        })
      }
    })
  },
  //点击tab时切换标签
  handleTab(ev){
    // console.log(ev)
    let current = ev.target.dataset.current;
    if (current == this.data.current){
      return false;
    }
    this.setData({
      current : current
    });
    this.getListData();
  },
  handleDetail(ev){
    // console.log(ev)
    let userId = ev.target.dataset.id;
    //路由跳转
    wx.navigateTo({
      url: '/pages/detail/detail?userId='+userId,
    })
  }
})