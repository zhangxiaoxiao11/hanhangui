//quanbu.js
//获取应用实例
const app = getApp()
//初始化数据库
wx.cloud.init()
const db = wx.cloud.database();
Page({
  data: {
    msg: "预览",
    msg1: "请分类",
    msg2: "——————————————————————————————————————————————————————",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  insert: function() {
    db.collection("shangpin").add({
      data: {
        name: "xx"
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  update:function(){
    db.collection("shangpin").doc("2b4144565e7a260600026bcf23be3c62").update({
      data:{
        name:"zz"
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  search:function(){
    db.collection("shangpin").where({
      name:"zz"
    }).get().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  delete: function () {
    db.collection("shangpin").doc("2b4144565e7a260600026bcf23be3c62").remove({
      data: {
        name: "zz"
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})