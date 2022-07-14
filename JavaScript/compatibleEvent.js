// 事件传播顺序：捕获阶段->目标阶段->冒泡阶段

// target.addEventListener(type, listener, options); 
// options : { capture: boolean, once: boolean, passive: boolean, signal: boolean }
// capture: true为捕获阶段传播到该eventTarget时触发, false为冒泡阶段传播到该eventTarget时触发
// once: true为listener触发一次调用后自动移除
// passive: true为listener不能调用preventDefault

// target.addEventListener(type, listener, useCapture); 
// useCapture 默认为false，冒泡； true为捕获

// event.target 事件的目标元素
// event.currentTarget 事件的监听元素

// event.stopPropagation 阻止事件传播（冒泡和捕获）
// e.preventDefault 阻止元素默认动作，但事件传播依然执行 例如：元素  a  button(type=submit)
// e.stopImmediatePropagation 阻止监听元素后再添加的事件 以及 事件传播

// 事件委托

class compatibleEvent {
  constructor(el) {
    this.$el = el;
  }

  addEvent(type, handler) {
    if (this.$el.addEventListener) {
      this.$el.addEventListener(type, handler, false);
    } else if (this.$el.attachEvent) {
      this.$el.attachEvent("on" + type, handler);
    } else {
      this.$el["on" + type] = handler;
    }
  }

  removeEvent(type, handler) {
    if (this.$el.removeEventListener) {
      this.$el.removeEventListener(type, handler);
    } else if (this.$el.attachEvent) {
      this.$el.detachEvent("on" + type, handler);
    } else {
      this.$el["on" + type] = null;
    }
  }
}

function _stopPropagation(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true; // ie 不支持事件驳货，这里只有取消冒泡
  }
}

function _preventDefault(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    this.returnValue = false; // ie 设置为false阻止默认操作
  }
}
