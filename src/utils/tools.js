/**
 * 判断元素的数据类型，弥补系统内置的typeof的不足
 * @param {All} val 被判断的元素
 * @return {String} 返回元素的数据类型
 */
const typeOf = val => {
  const res = {
    '[object Array]': 'Array',
    '[object Object]': 'Object',
    '[object Number]': 'object Number',
    '[object String]': 'object String',
    '[object Boolean]': 'object Boolean',
    '[object Date]': 'object Boolean',
    '[object RegExp]': 'object Boolean'
  };
  if (val === undefined) {
    return '请传参数';
  }
  var type = typeof (val);
  var toStr = Object.prototype.toString;
  if (val === null) {
    return 'null';
  } else if (type === 'object') {
    var ret = toStr.call(val);
    return res[ret];
  } else {
    return type;
  }
};
 
 /**
  * 获取url的参数
  * @param {String}} key 参数名
  * @return {String} 参数值
  */
const getUrlParam = key => {
  return decodeURIComponent((new RegExp('[?|&]'+ key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,""])[1].replace(/\+/g, '%20')) || null;
};
 
/**
  * 防抖函数
  * @params {Function} 要执行的函数
  * @params {Number} 延迟执行毫秒数
  * @return {Function}
  */
 function debounce (fn, delayTime) {
  let timer = null;
  return function () {
    var _this = this;

    timer && clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(_this, arguments);
    }, delayTime)
  }
}
 
 /**
  * 节流函数
  * @params {Function} fn 要执行的函数
  * @params {Number} waitTime 间隔执行的时间
  * @return {Function}
  */
 function throttle (fn, waitTime) {
  var preTime = 0;
  return function() {
    var _this = this;
    var nowTime = new Date().getTime();

    if (nowTime - preTime >= waitTime) {
      fn.apply(_this, arguments);
      preTime = nowTime;
    }
  }
}
 
export {
  typeOf,
  getUrlParam,
  debounce,
  throttle
}