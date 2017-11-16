/** 
 * autor 乔土月半@chuqtu
 * date 2017-11-10
 * init 计算坐标位置
 * startFinger 手势触点的开始-变量设置
 * getAngle 计算角度0-180
 * end  手势触点结束后的操作
 * cross 计算方向
 * isDoubleTap  判断是否双击
 * isDoubleFinger 判断是否多触点结束
 * **/
class Vector{
  constructor(){
    this.x=this.y=null;
    this.delta=null;
    this.last=this.now=null;
    this.preTapPosition = { x: null, y: null };
    this.isDoubleTap=false;
    this.isDoubleFinger=true;
  }
  init(x1,y1,x2,y2){
    this.x = x2 ? x2 - x1 : x1;
    this.y = y2 ? y2 - y1 : y1;
  }
  startFinger(e){
    this.now = Date.now();
    this.delta = this.now - (this.last || this.now);
    this.init(e.touches[0].pageX, e.touches[0].pageY);
    this.last = this.now;
    if (e.touches.length > 1) {
      this.init(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
      let lan = Math.sqrt(this.x * this.x + this.y * this.y);
      this.isDoubleFinger = false;
    }else{
      if (this.preTapPosition.x !==null){
        this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x) < 30 && Math.abs(this.preTapPosition.y - this.y) < 30);
      }
      this.preTapPosition.x = this.x;
      this.preTapPosition.y = this.y;
      this.isDoubleFinger=true;
    }
  }
  singleFinger(t,b,e){
    this.init(e.touches[0].pageX, e.touches[0].pageY);
    if (this.x < b) return;
    if (this.x > t.data.screenWidth - b) return;
    if (t.data.screenHeight - this.y <= b) return;
    if (this.y <= b) return;
    let x = t.data.screenWidth - this.x - b;
    let y = t.data.screenHeight - this.y - b;
    t.setData({
      thingBottom: y,
      thingRight: x,
    });
  }
  doubleFinger(t,e){
    this.init(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
    let distance = 1, lan = Math.sqrt(this.x * this.x + this.y * this.y),angle=0,org=1;
    var self=this;
    if (t.data.lan) {
      distance = lan / t.data.lan;
    }
    if(t.data.tx&&t.data.ty){
      angle = this.getAngle(t.data.tx, t.data.ty);
      org = this.cross(t.data.tx, t.data.ty);
      angle = org * Math.acos(angle) * 180 / Math.PI;
    }    
    let w = t.data.thingWidth, h = t.data.thingHeight,
      x = t.data.thingRight, y = t.data.thingBottom,a=t.data.angle;
    t.setData({
      lan: lan,
      thingWidth: w * distance,
      thingHeight: h * distance,
      thingBottom: y + (1 - distance) * w / 4,
      thingRight: x + (1 - distance) * h / 4,
      tx:self.x,
      ty:self.y,
      angle: a+angle
    });
  }
  getAngle(x,y){
    return (x * this.x + y * this.y) / (Math.sqrt(x * x + y * y) * Math.sqrt(this.x * this.x + this.y * this.y));
  }
  cross(x, y){
    return (x * this.y - this.x * y) > 0 ? 1 : -1;
  }
  end(t){
    this.x=this.y=null;
    this.preTapPosition = { x: null, y: null };
    t.setData({
      tx: null,
      ty: null,
    });
  }
}
export default Vector