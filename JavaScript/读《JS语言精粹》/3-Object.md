## 对象

1. JavaScript简单数据类型：number, string, boolean, undefined, null, （es6新增symbol和bigint）。

2. 其他的值都是对象，比如对象，数组，函数，正则表达式。
   
3. 数字、字符串和布尔值虽然拥有方法，但其实不可变的。
   
4. JavaScript的对象是**可变的键控集合（keyed collections)**。
   
5. 对象是**属性的容器**，每个属性都有名和值：
   1. 属性名可以是包括空字符串在内的任意字符串或Symbol。
   2. 属性值可以是除undefined值之外的值

6. JavaScript里的对象是无类型（class-free）的。
   
7. 对新属性的名和值没有限制。对象适合用于汇集和管理数据。
   
8. 对象可以包含其他对象，所以可以容易地标识成树状或图形结构。
   
9.  JavaScript包含一种**原型链**的特效，**允许对象继承另一个对象的属性**。正确使用能减少对象初始化时的时间和内存。



### 对象字面量

#### 注意点

1. 创建新对象值的表示法。一个对象字面量是包围在一个对花括号中的零或多个“名/值”对。对象字面量可以出现在任何允许表达式出现的地方。
```js
var empty_obj = {};

var obj = {
  "first-name": "simon",
  last_name: "wa"
}
```
2. 属性名是一个合法的JavaScript标识符且不是保留字，则并不强制要求用引号括住属性名。所以用引号扩住“first-name”是必需的。但last_name则是可选的。

3. 属性值可以从包含另外一个对象字面量的任意表达式中获得。对象是可嵌套的。



### 检索

#### 注意点

1. 检索对象包含的值，可以使用`[]`后缀中括住一个字符串表达式的方式。
   
2. 如果字符串表达式是一个字符串字面量，而且是一个合法的JavaScript标识符且不是保留字，那么可以用 `.` 表示法代替。优先使用 `.` 表示法，因为更紧凑且可读性更好。
   
3. 如果尝试检索一个不存在的成员属性的值，则会返回undefined。
   
4. || 运算符可以用来填充默认值:
   ```js
   var middle = obj["middle-name"] || "empty";
   var age = obj.age || 14;
   ```

5. 尝试从 undefined 的成员属性中取值将会导致 TypeError 异常。 可以通过 && 运算符来避免错误。
   ```js
   obj.enjoy; // undefined
   obj.enjoy.food; // throw "TypeError"
   obj.enjoy && obj.enjoy.food; // undefined
   ```



### 更新

#### 注意点

1. 对象的值可以通过赋值语句来更新。如果属性名存在于对象里，那么这个属性的值就会被替换，如果未拥有这个属性名，则会扩充这个属性。
   
2. 当对象或值不可写（writable为false）时，更新操作会失败。



### 引用

#### 注意点

1. **对象通过引用来传递。他们永远不会被复制。**
   ```js
   var obj = {nickname: 'simon'};
   var a = obj;
   a.nickname = 'xiao';
   var b = obj.nickname; // 'xiao' ,因为a和obj指向同一个对象的引用，所以nickname为‘xiao’

   var a = {},b = {}, c= {}; // abc每个都引用一个不同的空对象。
   a = b = c = {}; // abc都引用同一个空对象。所以操作abc任意一个都会被影响另外2个
   ```



### 原型

#### 注意点

1. 每个对象都连接到一个原型对象，并且可以从中继承属性。
2. 所有通过`对象字面量`创建的对象都连接到`Object.prototype`，他是JavaScript中的标配对象。
3. 当创建一个新对象时，可以选择某个对象作为其的原型，我们给Object创建一个create方法：
   ```js
   if (typeof Object.create !== 'function') {
      Object.create = function (o) {
        var Fn = function () {}
        Fn.prototype = o;
        return new Fn();
      }
   }
   var another_obj = Object.create(obj);
   ```
   1. 原型连接在更新时是不起作用的。当我们对某个对象做出改变时，不会触及该对象的原型。
   2. 原型连接只有在检索值的时候才被用到。
      1. 如果尝试去获取对象的某个不存在的属性值，那么JavaScript就会尝试从原型对象中获取属性值。
      2. 如果原型对象也没有该属性，那么再从他的原型中寻找。
      3. 依次查询，直到该过程最后到达`Object.prototype`。
      4. 如果想要的属性完全不存在于原型链中，那么结果就是undefined值。
      5. 这个过程称为**委托**.
4. 原型关系是一种动态的关系。如果添加一个新属性到原型中，则立即对所有基于该原型创建的对象可见。
   ```js
   obj.name = 'simon';
   another_obj.name;  // 'simon'
   ```



### 反射

#### 注意点

1. 检查对象并确定对象有什么属性，需要试着去检索该属性并验证取得的值。
   1. typeof操作符可确定属性的类型：
   ```js
   typeof obj.age  // 'number';
   typeof obj.name  // 'string';
   typeof obj.list // 'object';
   typeof obj.notExitValue  // 'undefined';
   ```
   2. 原型链中的任何属性都会产生值：
   ```js
   typeof obj.toString // 'function'
   typeof obj.constructor // 'function'
   ```
2. 两种方法去处理掉不需要的属性。
   1. 第一个是让程序做检测并丢弃值为函数的属性。
   2. 第二个是使用`hasOwnProperty`方法。
      1. 如果对象拥有独有的属性，将返回true。
      2. 此方法不会检查原型链。
      ```js
      another_obj.hasOwnProperty('name') // false
      another_obj.hasOwnProperty('constructor') // false
      ```



### 枚举

#### 注意点

1. for in 语句可以用来遍历一个对象中所有属性名。该枚举过程将会列出所有的属性，包括函数和不关心的原型中属性，所以有必要过滤掉不想要的值。最为常用的过滤是hasOwnProperty方法，以及使用 typeof 来排除函数:
   ```js
   for (var i in another_obj) {
    if (typeof another_obj[i] !== 'function') {
      console.log(i, another_obj[i]);
    }
   }
   ```
2. 属性名出现顺序不确定的，所以要确保属性以特定顺序出现，最好是完全避免使用 for in 语句，而是创建一个数组，在其中定义正确的顺序包含属性名:
   ```js
   var prototypes = ['first-name', 'last_name']
   for (var i; i < prototypes.length; i += 1) {
      console.log(i, prototypes[i]);
   }
   ```
   通过 for 而不是 for in ，可以得到想要的可排序的属性，不用担心可能发掘出原型链的属性。



### 删除

#### 注意点

1. delete 运算符可以用来删除对象属性。如果对象包含属性，那么该属性就会被移除。不会触及原型链中的任何对象。
   
2. 删除对象属性可能会让来自原型链中的属性透显出来。
   
3. 删除不存在的属性不会报错。



### 减少全局变量污染

#### 注意点

1. JavaScript可以随意定义全局变量来容纳所有应用资源。但全局变量削弱了程序的灵活性，应该避免使用。
2. 最小化使用全局变量的方法之一是为应用只创建一个唯一的全局变量 `var randomName = {};`。
3. 该变量此时就成了应用容器：
   ```js
   randomName.view = {
    view1: '123123',
    view2: '3123123'
   };
   randomName.state = {
    state1: '123123',
    state2: 123123,
    state3: [1,2,3],
   }
   ```
4. 只要把全局性的资源都纳入一个名称空间直辖，这样程序与其他应用程序、组件或类库之间发生冲突的可能性就会显著降低，且程序会变得更容易阅读。
5. 因为明显的是randomName.view指向的是顶层结构。