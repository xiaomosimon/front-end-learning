## 函数（Functions）

1. 函数包含一组语句，是JavaScript的基础模块单元，用于代码复用，信息隐藏和组合调用。
   
2. 函数用于指定对象的行为。所谓编程，就是将一组需求分解成一组函数与数据结构的技能。



### 函数对象

#### 注意点

1. 函数就是对象。
   1. 对象是“名/值”对的集合并拥有一个连到原型对象的隐藏连接。
   2. 对象字面量产生的对象连接到 Object.prototype。
   3. 函数对象连接到 Function.prototype（该原型对象本身连接到 Object.prototype）。
   4. 每个函数的创建时会附加两个隐藏属性：**函数的上下文** 和 **实现函数行为的代码**。

2. 每个函数对象在创建时配有一个 prototype 属性。其值是一个拥有constructor属性且这个属性值即为该函数的对象。

3. 函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其它函数,函数也可以返回函数。而且函数是对象，所以函数可以拥有方法。
   
4. 函数不同是自己可以被调用。



### 函数字面量

#### 注意点

1. 函数对象通过函数字面量来创建：
   ```js
   // 创建一个名为add的变量，并用来把两个数字相加的函数赋值给它
   var add = function (a,b) {
    return a + b;
   };
   ```

2. 函数字面量包括4个部分：
   1. 保留字function。
   2. 函数名。
      1. 可以被省略。
      2. 函数可以用其名字做递归调用。
      3. 也能被调用器和开发工具来识别函数。
      4. 如果没有函数名，则被称为匿名函数。
   3. 包围在圆括号中的一组参数。
      1. 多个参数用逗号隔开。
      2. 这些参数的名称将定义为函数中的变量。
      3. 不像普通变量将被初始化为undefined，而是**在该函数被调用时初始化为实际提供的参数的值**。
      4. 包围在花括号中的一组语句。这些语句是函数的主体，其在函数被调用时执行。

3. 函数字面量可以出现在任何允许表达式出现的地方。
4. 函数也可以被定义在调函数中。
5. 一个内部函数除了可以访问自己的参数和变量，同时也能自由访问把其嵌套在其中的父函数的参数和变量。
6. 通过函数字面量创建的函数对象包含一个连到外部上下文的链接。这被称为闭包。



### 调用

#### 注意点

1. 调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。
   
2. 除了声明时定义的形式参数，每个函数还接收两个附加的参数：this和arguments。
   1. 参数this在面向对象编程中非常重要，它的值取决于度熬夜的模式。在JavaScript中一共有4种调用模式： 
      1. 方法调用
      2. 函数调用
      3. 构造器调用
      4. apply调用

3. 调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号。
   1. 圆括号内可包含零个或多个用逗号隔开的表达式。
   2. 每个表达式产生一个参数值。
   3. 每个参数值被赋予函数声明时定义的形式参数名。
   4. 当时实际参数（arguments）的个数与形式参数（parameters）的个数不匹配时，不会导致运行时错误。
   5. 如果实际参数值过多了，超出的参数值会被忽略。
   6. 如果实际参数值少了，缺失的值会被替换为 undefined。
   7. 对参数值不会进行类型检查，任何类型的值都可以被传递给任何参数。

#### 方法调用模式

1. 当一个函数被保存为对象的一个属性时，我们称其为一个`方法`。
   
2. 当一个方法被调用时，this被绑定到该对象。
   
3. 如果调用表达式包含一个提取属性的动作（即包含一个 . 点表达式或 [subscript] 下标表达式），那么它就是被当做一个方法来调用。
   ```js
   var obj = {
      value: 0,
      increment(val) {
         this.value = this.value + val;
      }
   }
   obj.increment(1);
   obj.value === 1;
   obj.increment(2);
   obj.value === 3;
   ```
   
4. 方法可以使用this访问自己所属的对象。所以能从对象中取值或对象进行修改。
   
5. **this到对象的绑定发生在调用的时候。**
   
6. 通过this可取得它们所属对象的上下文的方法称为`公共方法（public method）`。

#### 函数调用模式

1. 当一个函数并非一个对象的属性时，那么他就是被当做一个函数的来调用的。 `var sum = add(3, 4);`。**此模式调用函数时，this被绑定到全局对象。**这是一个语言设计错误。
   
2. 解决方式：
   1. 如果该方法定义一个变量并给它赋值为this，那么内部函数就可以通过那个变量访问到this。按照约定，可以命为_this或that。
   ```js
   obj.double = function() {
      var that = this;

      var helper = function() {
         that.value = add(that.value, that.value);
      };

      helper(); // 函数形式调用
   };

   // 方法形式调用
   obj.double(); 
   obj.value === 6;
   ```
   2. 箭头函数
   ```js
   obj.double = function() {
      var helper = () => {
         // this 指向对象obj
         this.value = add(this.value, this.value);
      };

      helper(); // 函数形式调用
   };

   // 方法形式调用
   obj.double(); 
   obj.value === 6;
   ```
   
#### 构造器调用模式

1. 原型继承：在一个函数前面带上 new 来调用，那么隐式将会创建一个连接到该函数的 prototype 成员的新对象，同时this会被绑定到新对象上。

2. new 前缀也会改变return 语句的行为。
   ```js
   // 创建一个名为People的构造器函数。他构造一个带有name属性的对象。
   var People = function(name) {
      this.name = name;
   }

   People.prototype.getName = function() {
      return this.name;
   }

   // 给People的所有实例提供一个名为getName的公共方法。
   var tom = new People('Tom');

   // 构建一个People实例
   tom.getName() === 'Tom';
   ```

3. 一个函数，如果创建的目的就是希望结合new前缀来调用，那么就被称为`构造器函数`。
   
4. 按照约定，他们以首字母大写格式命名的变量里。

#### apply调用模式

1. JavaScript是一门函数式的面向对象编程语言，所以函数可以拥有方法。

2. apply方法构建一个参数数组传递调用函数。
   1. 且允许选择this的值。
   2. apply方式有2个参数：
      1. 绑定给this的值。
      2. 参数数组。
   ```js
   var array = [1, 2];
   var sum = add.apply(null, array); // 7
   // 构造一个包含name成员的对象

   var obj = {
      name: 'world'
   }

   // obj并没有继承自 People.prototype，但可以在obj上调用getName方法，尽管obj并没有一个名为getName方法。

   var name = People.prototype.getName.apply(obj); // 'world'
   ```



### 参数

#### 注意点

1. arguments类数组：
   1. 函数可以通过此参数访问所有它被调用时传递给他的参数列表。
   2. **包括那些没有被分配给函数声明时定义的形式参数的多余参数**。
   3. 这可以编写一个无须指定参数个数的函数。

2. arguments不是真正的数组，虽然拥有一个length的属性，但是并没有任何数组的方法。



### 返回

#### 注意点

1. 当一个函数被调用时，正常情况下从第一个语句开始执行，并在遇到关闭函数体的 } 的结束。然后函数把控制权还给调用该函数的程序。

2. return语句可用来使函数提前返回。当return被执行时，函数立即返回而不在执行当前函数余下的语句。

3. 一个函数总会有返回值，没有指定则为 undefined 。

4. 如果函数调用时在前面加上了 new 前缀，且返回值不是一个对象，则返回 this（该新对象）。



### 异常

#### 注意点

1. 异常是干扰程序的正常流程的不寻常（但并非完全是出乎意料）的事故。当发生则应该抛出一个异常。

2. throw语句会中断函数的执行。他应该抛出一个exception对象，该对象包含一个用来识别异常类型的name属性和一个描述性的message属性。也可以添加其他属性。
   ```js
   throw {
      name: 'TypeError',
      message: 'this. is a type error'
   }
   ```

3. 该 exception 对象被传递到一个try语句的catch从句里，如果在try代码块内抛出异常，控制权就会跳转到他的 catch 从句。

4. 一个try语句只会有一个捕获所有异常的catch语句。

5. 处理异常取决异常的类型，那么异常处理器必须检查异常对象的name属性来确定异常类型。



### 扩充类型的功能

#### 注意点

1. JavaScript可以给语言的基本类型扩充功能。给Object.prototype添加方法，可以让该方法对所有对象都可用。这样的方式对函数、数组、字符串、数字、正则表达式和布尔值都适合用。

2. 基本类型的原型是公用结构，所以在类型混用要务必小心。一个保险的方法就是只在确定没有该方法时才添加他。



### 递归

#### 注意点

1. 递归函数是直接或间接地调用自身的一种函数。
   
2. 递归：把一个问题分解为一组相似的子问题，每一个都用一个寻常解去解决。一般来说，一个递归函数调用自身去解决他的子问题。



### 作用域

#### 注意点

1. 作用域控制变量与参数的可见性与生命周期。
   
2. 减少了名称冲突，并且提供了自动内存管理。
   
3. JavaScript有函数作用域：定义在函数中的参数和变量在函数外部是不可见的，而在一个函数内部任何位置定义的变量，在该函数内部任何地方都可见。
   
4. 最好规避方式是在函数体的顶部声明函数中可能用到的所有变量。



### 闭包

**函数可以访问他被创建时所处的上下文，被称为闭包。**



### 回调

#### 注意点

假定有一个序列，由用户交互行为触发，向服务器发送请求，最终显示服务器的响应。

1. 问题在于网络上的同步请求会导致客户端进入假死状态。如果网络传输或服务器很慢，响应会非常慢。
   
2. 更好的方式是发起异步请求，提供一个当服务器的响应到达时随即触发的回调函数。异步函数立即返回，这样客户端就不会被阻塞。


### 模块

#### 注意点

1. 可以使用函数制造模块。`模块是一个提供接口却隐藏状态与实现的函数或对象。`
   
2. 可以通过函数产生模块，来摈弃全局变量的使用。
   
3. 模块模式利用了函数作用域和闭包来创建被绑定对象与私有成员的管理。在下面例子中，只有fn方法有权访问字符实体表达这个数据对象。
   ```js
   var fn = (function() {
      var enum = {a: 1, b: 2}
      return function (key) {
         return enum[key];
      }
   }())
   ```

4. 模块模式的一般形式是：
   1. 一个定义了私有变量和函数的函数；
   2. 利用闭包创建可以访问私有变量和函数的特权函数；
   3. 最后返回这个特权函数，或者把他们保存到一个可访问的地方。
   4. 使用模块模式可以摈弃全局变量的使用。对于应用程序封装，或者构造其他单例对象，模块模式非常有效。

5. 模块模式通常结合单例模式（Singleton Pattern）使用。JavaScript的单例就是用对象字面量表示法创建的对象，对象的属性值可以是数值或函数，并且属性值在该对象的生命周期中不会发生变化。通常作为工具为程序其他部分提供功能支持。

### 级联

#### 注意点

1. 有一些方法没有返回值。一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。

2. 如果让这些方法返回this而不是undefined，就可以启用级联。类似jquery。



### 柯里化

#### 注意点

1. 柯里化允许把函数与传递给它的参数相结合，产生出一个新的函数。
   ```js
   var newAdd = add.curry(1); 
   newAdd(6) === 7;

   Function.prototype.method = function (name, func) {
     this.prototype[name] = func;
     return this;
   };

   Function.method('curry', function() {
      var slice = Array.prototype.slice;
      var args = slice.apply(arguments), that = this; // arguments不是数组，没有数组方法，slice让其拥有数组方法的常规数组
      return function() {
         return that.apply(null, args.concat(slice.apply(arguments)));
      };
   });
   ```
   curry方法通过创建一个保存着原始函数和要被套用的参数的闭包来工作。



### 记忆

#### 注意点

1. 函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。这种优化被称为记忆。

2. Fibonacci数列
   ```js
   var fibonacci = (function() {
      var memo = [0, 1]; // 存储结果，隐藏在闭包中
      var fib = function(n) {
         var result = memo[n];
         if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
         }
         return result;
      }
      return fib;
   })()
   for(var i = 0; i <= n; i++) {
      fibonacci(i); // 0 1 2 3 5 8 13 21 34 55
   }
   ```

3. 构造带记忆功能的函数
   ```js
   var memory = function (memo, formula) {
      var recur = function (n) {
         var result = memo[n];
         if (typeof result === 'number') {
            result = formula(recur, n);
            memo[n] = result;
         }
         return result;
      };
      return recur;
   } 
   // 使用memory函数来定义fibonacci函数
   var fibonacci = memory([0, 1], function (recur, n) {
      return recur(n - 1) + recur(n -2);
   });
   // 也可产生一个可记忆的阶乘函数
   var factorial = memory([1, 1], function (recur, n) {
      return n * recur(n - 1);
   });
   ```