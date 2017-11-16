const App = getApp();
Page({
  data: {
    thingWidth:240,
    thingHeight:240,
    thingBottom: 240,
    thingRight: 120,
    screenHeight: 0,
    screenWidth: 0, 
    distance:1,
    flag:true,
    angle:0
  },
  onLoad: function () {
    screen(this);
  },
  thingEndEvent:function(e){
    delay(this)
    App.Vector.end(this);
  },
  thingStartEvent:function(e){
    if (!this.data.flag && !e.touches) return;
    App.Vector.startFinger(e);
    if (e.touches.length > 1) {}else{
      
    }
  },
  thingMoveEvent: function (e) {
    if (!this.data.flag && !e.touches)return;
    if (e.touches.length > 1){
      App.Vector.doubleFinger(this,e);
    }else{
      if (App.Vector.isDoubleFinger)
      App.Vector.singleFinger(this,60,e);
    }
  }, 
  thingScaleEvent:function(){
    
  },
  thingClickEvent: function () {
    console.log('点击了....')
  } ,
  onShareAppMessage: function () {
    return {
      title: 'gif多触点案例',
      path: '/pages/index/index'
    }
  }
})
function delay(t){
  let self=t;
  self.setData({
    flag: false
  });
  setTimeout(function () {
    self.setData({
      flag: true
    });
  }, 500);
}
function screen(t){
  let self = t;
  wx.getSystemInfo({
    success: function (res) {
      self.setData({
        screenHeight: res.windowHeight,
        screenWidth: res.windowWidth,
      });
    }
  }); 
}