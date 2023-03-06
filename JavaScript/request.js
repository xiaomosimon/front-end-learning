var packageRequest = (function (global) {
  return function (options, callback) {
    var method = options.method || 'GET';
    var path = options.path || '';
    var xmlhttp;
    //1.创建 XMLHttpRequest 对象
    if (global.XMLHttpRequest) {
      //IE7,IE8,FireFox,其它
      xmlhttp = new XMLHttpRequest();
      if (xmlhttp.overrideMimeType) {
        //针对某些特定版本的mozillar浏览器的BUG进行修正
        xmlhttp.overrideMimeType('text/xml');
      }
    } else if (global.ActiveXObject) {
      //IE6,IE5.5,IE5
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (xmlhttp == undefined || xmlhttp == null) {
      alert('当前浏览器不支持创建XMLHttpRequest对象,请更换浏览器！');
      return;
    }

    xmlhttp.onreadystatechange = function readystatechange() {
      //5.判断和服务器端的交互是否完成,还要判断服务端的是否正确返回了数据
      // status 200 表示和服务端的交互已经完成
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //表示服务器的响应代码是200,正确的返回数据
        callback(xmlhttp.responseText);
      }
    };

    method = method.toUpperCase();

    if (method === 'GET') {
      //3.设置和服务端交互的相应参数
      xmlhttp.open('Get', path, true);
    } else if (method === 'POST') {
      //3.设置和服务端交互的相应参数
      xmlhttp.open('Post', path, true);

      //Post方式需要增加的代码
      var headerKey = options.headerKey || false;
      if (headerKey) {
        xmlhttp.setRequestHeader(headerKey, options.headerValue);
      }
    }
    //4.设置向服务器发送数据,启动和服务端的交互
    xmlhttp.send();
  };
})(window || global);
