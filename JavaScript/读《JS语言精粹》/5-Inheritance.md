## 继承（Inheritance）



### 伪类（Pseudoclassical）


JavaScript不直接让对象从其他对象继承，反而插入了一个多余的间接层：通过构造器函数产生对象。

当一个函数对象被创建时，Function 构造器产生的函数对象会运行类似这样的一些代码：

    this.prototype = {constructor: this};

新函数对象被赋予一个 prototype 属性，其值是**一个包含 constructor 属性且这个属性值为该新函数**的对象。

这个 prototype 对象存放继承特性的地方。

当采用构造器调用模式，即用 new 前缀去调用一个函数时，函数执行的方式会被修改。

1. 如果 new 运算符是一个方法而不是一个运算符，会像这样执行：

```js
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Function.method('new', function() {
  // 创建一个新对象，它继承自构造器函数的原型对象。
  var that = Object.create(this.prototype);

  // 调用构造器函数，绑定 this 到新对象上。
  var other = this.apply(that, arguments);

  // 如果他的返回值不是一个对象，就返回该新对象。
  return (typeof other === 'object' && other) || that;
})
```

2. 可以定义一个构造器并扩充他的原型：
```js
var Mammal = function (name) {
  this.name = name;
}

Mammal.prototype.getName = function () {
  return this.name;
}

Mammal.prototype.says = function () {
  return this.saying || '';
}
```

3. 现在可以构造一个实例：
```js
var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.getName();
```

4. 再可以构造另一个伪类来继承Mammal，这是通过定义他的 constructor 函数并替换它的 prototype 为一个 Mammal 的实例来实现的：

```js
var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
}

// 替换Cat.prototype 为一个新的Mammal实例
Cat.prototype = new Mammal();

// 扩充新原型对象，增加log 和 getName方法。
Cat.prototype.log = function() {
  return 'log'
}

Cat.prototype.getName = function () {
  return this.says() + ' ' + this.name;
}

var myCat = new Cat('Tom');
myCat.says(); // 'meow'
myCat.log(); // 'log'
myCat.getName(); // 'meow Tom'
```

5. 可以隐藏一些不好的细节，通过使用method方法来定义一个inherits方法实现：
   ```js
   Function.method('inherits', function (Parent) {
      this.prototype = new Parent();
      return this;
   });
   ```

6. inherits和method方法都返回this，这样就允许我们可以采用级联的形式编程。现在可以只用一行语句构造Cat对象：
   ```js
   var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
   }
   .inherits(Mammal)
   .method('log', function() {
    return 'log';
   })
   .method('getName', function() {
    return this.says() + ' ' + this.name;
   })
   ```

通过隐藏那些无谓的prototype操作细节，但没有私有环境，所有属性都是公开的。且无法访问 super （父类）的方法。

**当调用构造器时未加上 new 前缀，那么this将不会被绑定到一个新对象上。this将被绑定到全局对象上。**



### 对象说明符（Object Specifiers）

使用对象形式定义构造器参数，如：
```js
var myObject = new CustomFunction({
  name: 'Tom',
  age: 18,
  city: 'Chengdu'
  // ...
});
```
现在多个参数可以按任何顺序排列。



### 原型

基于原型的继承相比基于类的继承在概念上更为简单：一个新对象可以继承一个旧对象的属性。

一旦有了一个想要的对象，就可以使用 object.create 方法构造出更多的实例来。这是一种"差异化继承"。通过定制一个新的对象，我们指明他与所基于的基本对象的区别。

```js
var obj = {name: 'Tom', say(){return this.name;}};
var obj2 = Object.create(obj);
obj2.name = 'Simon';
obj2.say = function() {
  return this.name + ' ye!';
}
```

### 函数化

1. 创建一个新对象。
   1. 可以构造一个对象字面量，
   2. 或者可以和 new 前缀连用去调用一个构造器函数，
   3. 或者可以使用 Object.create 方法去构造一个已经存在的对象的实例，
   4. 或者可以调用任意一个会返回一个对象的函数。

2. 有选择地定义私有实例变量和方法。这些就是函数中通过var语句定义的普通变量。

3. 给这个新对象扩充方法。这些方法拥有特权去访问参数，以及在第2步通过var语句定义的变量。

4. 返回那个新对象。

函数化构造器的伪代码：
```js
var constructor = function (spec, my) {
  var that, 其他的私有实例变量;
  my = my || {};

  把共享的变量和函数添加到my中

  that = 一个新对象

  添加给 that 的特权方法

  return that
}
```
spec对象包含构造器需要构造一个新实例的所有信息。
spec的内容可能会被复制到私有变量中，或者被其他函数改变，或者方法可以在需要的时候访问spec的信息。（一个简化方式是替换spec为一个单一的值。当构造对象过程中并不需要整个spec对象的时候，这是有用的。）
my对象是一个继承类中的构造器提供秘密共享的容器。my对象可以选择性地使用。如果没有传入一个my对象，那么会创建一个my对象。
接下里，声明该对象私有的实例变量和方法。通过简单声明变量即可。构造器的变量和内部函数就变成了该实例的私有成员。内容部函数可以访问spec、my、that，以及其他私有变量。
再下来，给my对象添加共享的秘密成员。`my.member = value;`。现在，我们构造一个新对象并把他赋值给 that。
接下来，我们扩充that，加入组成改对象接口的特权方法。我们可以分配一个新函数成为that的成员方法。或者更安全地先把函数定义为私有方法，然后把他们分配给that。
```js
var methodical = function() {
  //...
}
that.methodicalName = methodical;
```
分两步定义的好处是，不会怕实例被破坏或篡改，甚至被替换。methodical还是不变的私有变量，不会受影响。

函数化模式还提供了一个处理父类方法的方法。构造一个 superior 方法。他取得一个方法名并返回调用那个方法的函数。该函数调用原来的方法。尽量属性已经变化了。
```js
// super
Object.method('superior', function(name) {
  var that = this, method = that[name];
  return function() {
    return method.apply(that, arguments);
  }
})
```

如果对象的所有状态都是私有的，那么该对象就成为一个”仿伪类“对象。该对象的属性可以被替换或删除，但该对象的完整性不会收到损害。如果我用函数化的样式创建一个对象，并且该对象的所有方法都不使用this或that。那么该对象就是持久性的。一个持久性对象就是一个简单功能函数的集合。



### 部件

事件注册
```js
var eventuality = function(that) {
  var registry = {};

  that.run = function(event) {
    var array, func. handler, i, type = typeof event === 'string' ? event : event.type;
    if (registry.hasOwnProperty(event)) {
      array = registry[event];
      for(i = 0; i < array.length; i+= 1) {
        handler = array[i];

        func = handler.method;
        if(typeof func === 'string') {
          func = this[func];
        }

        func.apply(this, handler.parameters || [event])；
      }
    }
    return this;
  }

  that.on = function(type, method, parameters) {
    var handler = {
      method: method,
      parameters: parameters
    }
    if(registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
  }

  return that;
}
```
可以再任何单独的对象上调用eventuality，授予事件处理方法。也可以赶在that被返回前在一个构造器函数中调用它。

用这种方式，一个构造函数可以从一套部件中把对象组装处理。

如果我们想要 eventuality 访问该对象的私有状态，可以把私有成员集my传递给它。