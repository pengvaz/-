// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    pageSize: 10,
    pageIndex: 0,
    catId: 1,
    // 2.1 用于记录是否还有更多的数据
    hasMore: true
  },
  // 自定义一个函数,用来加载数据
  loadMore: function() {
    // 2.2 如果没有更多数据，就直接返回
    if (!this.data.hasMore) return;
    wx.request({
      url: "https://locally.uieee.com/categories/" + this.data.catId + "/shops",
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      success: (res) => {
        console.log(res);
        var newList = this.data.shopList.concat(res.data)
        // 2.3 获取数据的总数
        var count = parseInt(res.header['X-Total-Count']);
        // 2.4 通过比较加载的数据数量是否小于总数从而判断是否还有更多得数据
        var flag = this.data.pageSize * this.data.pageIndex < count;
        this.setData({
          shopList: newList,
          hasMore: flag,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }
    this.setData({
      catId: options.cat
    })
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("已經下拉了")
    // 3.1 把数据重置
    this.setData({
      shopList: [],
      pageIndex: 0,
      hasMore: true
    })
    // 3.2 重新请求数据
    this.loadMore();
    // 3.3 停止下拉，否则手机端一直存在
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("下拉触底了")
    this.loadMore();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})