## 语法



### 空白（WhiteSpace）

#### 注意点

1. 空白可能表现为被格式化的字符或注释的形式，也用于分割字符序列来表达一个正确的表达式。

#### 注释
1. // 行注释
2. /* */ 块注释

块注释内可能存在正则表达式字面量，这样不安全如：
```js
/*
  var rm_a = /a*/.match(s);
*/
```
**所以建议使用行注释**



### 标识符（Names）

#### 注意点

1. 标识符被用于语句、变量、参数、属性名、运算符和标记。

2. 标识符由一个字母开头，其后可选择性地加上一个或多个字母、数字或下划线。标识符不能使用以下这些保留字：

abstract
boolean break byte
case catch char class const continue
debugger default delete do double
else final finally float for function
goto
if implements import in instanceof int interface
long
native new null
package private protected public
return 
short static super switch synchronized
this throw throws transient true try typeof
var volatile void
while with

3. 不包括一些本应该被保留而没有保留的字，如undefined、NaN和Infinity。JavaScript不允许使用保留字来命名变量或参数。

4. JavaScript也不允许在对象字面量中，或者用点运算符提取对象属性时，使用保留字作为对象属性名。



### 数字（Numbers）

#### 注意点

1. 表示为64位浮点数，和java的double数字类型一样。和其他区别是没有分离出整数类型，所以1和1.0的值相同。避免了短整型的溢出问题。

2. 数字存在指数部分，则这个字面量等于e之前的数字与10的e之后数字的次方相乘。则`1e2 === 1 * (10^2) === 100`。

3. 负数可以用前置减号运算符（-）加数字构成。

4. NaN是一个**数值**，标识一个不能产生正常结果的运算结果。**NaN不等于任何值，包括自己**。可以用函数isNaN检测NaN。

5. Infinity表示所有大于1.79769313486231570e+308的值。

6. 数字拥有方法，JavaScript有个一个Math对象，包含了一套作用于数字的方法。例如`Math.floor(number)`方法，把一个数字向下取整。



### 字符串（Strings）

#### 注意点

1. 字符串字面量可以包在一对单引号或双引号中，可以包含零个或多个字符。

2. JavaScript在被创建的时候，Unicode是一个16位的字符集，所以JavaScript中的所有字符都是16位的。

3. JavaScript没有字符类型。要标识一个字符，只需创建仅含一个字符的字符串即可。

4. 字符有一个length的属性值,可获取字符的长度。

5. **字符串是不可变的**。一旦创建，就无法改变。但可以通过加号运算符（+）链接其他字符串来创建一个新字符串。

6. 两个包含着完全相同的字符且字符顺序也相同的字符被认为是相同的字符串。如： `'a' + 'c' + 'b' === 'acb'`。

7.字符串也拥有方法，例如：`'cat'.toUpperCase() === 'CAT'`;


#### \ (反斜线符号) 是转义字符。

1. 转义字符用来把正常情况下不被允许的字符插入到字符串中，比如反斜线、引号和控制字符。 

\" 双引号符号
\' 单引号符号
\\ 反斜线符号
\/ 斜线符号
\b 退格
\f 换页
\n 换行
\r 回车
\t Tab
\u加4个数字 约定用来指定数字字符编码



### 语句（Statements）

#### 注意点

1. 一个编译单元包含一组可执行的语句。在web浏览器中，每个`<script>`标签提供一个被编译且立即执行的编译单元。因为缺少**连接器**，JavaScript会把其全抛到一个**公共的全局名字空间**中。

2. 当 var 语句被用在函数内部时，其定义的是这个**函数的私有变量**。

3. switch、while、for和do语句允许有一个可选的前置标签（label），它配合break语句来使用。

4. 语句通常按照从上到下的顺序执行。JavaScript可以通过`条件语句（if和switch）`、`循环语句（while、for和do）`、`强制跳转语句（break、return和throw）`和`函数调用`来改变执行顺序。

5. 代码块是放在`{}`中的一组语句。JavaScript中的**代码块不会创建新的作用域**，因此变量应该被定义在函数的头部，而不是代码块中。



#### if语句

1. if语句根据**表达式的值为真**时执行跟在其后的代码块，否则执行可选的else分支。
2. 值被当做假（falsy）：false，null，undefined，空字符串（''），数字（0），数字（NaN）。其他所有的值都被当做真，包括true，字符串“false”，以及所有对象。



#### switch语句

1. switch语句执行一个多路分支。把表达式的值和所有指定的case条件进行匹配。当找到一个精确的匹配时（当前case从句使用了break语句），执行匹配的case从句中的语句。如果没有任何匹配，则有default则执行default语句，没有则完成了本次执行。

2. 一个case从句包含一个或多个case表达式。case表达式不一定必须是常量。如果case从句需要结束，需要在后跟随一个强制跳转语句。可以用break语句退出switch语句。

#### while语句
1. while语句执行一个简单的循环。如果表达式值为假，就终止循环。但表达式为真时则执行代码块。


#### for语句

for语句是一个结构复杂的循环语句。有两种形式:

##### 常见形式

由3个可选从句控制：初始从句（initialization）、条件从句（condition）和增量从句（increment）。

1. 语句执行顺序：
   1. 首先执行condition，其作用通常是初始化循环变量。
   2. 接着计算condition的值。典型情况是根据一个完成条件检测循环变量。
      1. 如果condition被省略掉，则假定返回的条件是真。
      2. 如果condition的值为假，那么循环将终止。
   3. 否则执行increment，接着循环会重复执行condition。

2. condition可以放到语句前面（顺序），两种写法是恒等的。
3. increment可以放在代码块的本次循环的结束处，两种写法是恒等的。

##### 另外形式：for in语句

1. 其会枚举一个对象的所有属性名（或键名）。在每次循环中，object的下一个属性名（字符串、数字或Symbol）被赋值给variable。

2. 通常需要检测`object.hasOwnProperty(variable)`来确定这个属性名是该对象的成员，还是来自于原型链。
```js
for(var key in obj) {
  if (obj.hasOwnProperty(key)) {
    // ...
  }
}
```
因为obj可能继承了别的对象，使用`for in语句`会拿到别的对象定义的成员。（获取对象成员，会在当前对象成员查找，没有就去原型链上去找）

#### do while语句

1. 类似while语句，区别是其在代码块执行之后而不是之前检测表达式的值。意味着代码库至少要执行一次。

#### try catch语句

1. try语句执行一个代码块，并捕获该代码块抛出的任何异常。catch从句定义一个新的变量variable来接收抛出的异常对象。
2. throw语句抛出一个异常。
   1. 如果throw语句在一个try代码块中，那么控制流会跳转到catch从句中。
   2. 如果throw语句在函数中，则该函数调用被放弃，控制流跳转到调用该函数的try语句的catch从句中。
   3. throw语句中的表达式通常是一个对象字面量，包含一个name属性和一个message属性。异常不获取可以用其做些什么。

#### return 语句

1. return语句会导致从函数中提前返回。其也可以指定要被返回的值。如果没有指定返回表达式，那么返回值是`undefined`。
2. JavaScript**不允许在return关键字和表达式之间换行**。


#### break 语句

1. break语句会使程序退出一个循环语句或switch语句。可以指定一个可选的标签，则退出的就是带该标签的语句。
2. JavaScript**不允许在break关键字和标签之间换行**。

#### 表达式（expression）语句

1. 一个表达式语句可以给一个或多个变量或成员赋值，或调用一个方法，或从对象中删除一个属性。
2. 等号运算符（=）用于赋值，不要把其和恒等运算符（===）或强制等于运算符（==）混淆。
3. 加等运算符（+=）可以用于加法运算或链接字符串（虽然如此简洁，但建议还是书写为`a = a + b;`，而不是`a += b`）。



### 表达式（Expressions）

#### 注意点
1. 最简单的标识是字面量值（比如字符串或数字）、变量、内置的值（true，false，null，undefined，NaN和Infinity）;
   
2. 以new开头的调用表达式；
   
3. 以delete开头的属性提取表达式；
   
4. 包在圆括号中的表达式；
   
5. 以一个前置运算符作为前导的表达式；

6. 或者表达式后面着：
   - 一个中置运算法与另一个表达式； 
   - 三元运算符，形式如： `exp1 ? exp2 : exp3;`。其有3个运算数：
     - 如果第1个运算数值为真，产生第2个运算数的值。
     - 但如果第1个运算数为假，则产生第3个运算数的值。
   - 一个函数调用；
   - 一个属性提取表达式。

7. 运算符优先级，越上面优先级越高。
   ```js
   // . [] ()                     提取属性与调用函数
   // delete new typeof + - !     一元运算符
   // * / %                       乘法、除法、求余
   // + -                         加法/连接、除法
   // >= <= > <                   不等式运算符
   // === !==                     等式运算分
   // &&                          逻辑与
   // ||                          逻辑或
   // ?:                          三元
   ```
   1. **圆括号可以忽略优先级排序，优先处理括号内表达式**
      ```js
      2 + 3 * 5 === 17;
      (2 + 3) * 5 === 25;
      ```  
   2. `typeof运算符`
   3.  产生的值有‘number’、‘string’、‘boolean’、‘undefined’、‘function’和‘object’。
   4.  如果运算数是一个数组或null，那么结果是‘object’。
   5.  如果 `!` 的运算数的值为真，那么产生false，否则产生true。
   6.  运算符可以进行加法运算或字符串连接。**如果为加法运算，需确保2个运算数都是数字，不然会转化为字符串相加，最后得到一个字符串。**
   7.  **除法运算符（/ ）可能会产生非整数结构，即使2个运算符都是整数**
   8.  and运算符（&&）在`其前运算数`的值为假，则产生`其前运算数的值`，否则产生`后运算数的值`。
   9.  or运算符（||）在`其前运算数`的值为真，则产生`其前运算数的值`，否则产生`后运算数的值`。
   10. 函数调用引发函数的执行。函数调用运算符是跟随在函数名后面的一对圆括号。圆括号中可能包含传递给这函数的参数。形式如：`fn(arg);`。
   11. 一个属性取表达式用于指定一个对象或数组的属性或元素。



### 字面量（Literals）

#### 注意点

1. 对象字面量是一种可以方便地按指定规格创建新对象的表示法，形式如：`var obj = { name: 'foo' };`。
   1. 属性名可以是标识符或字符串或Symbol值。这些名字被当做`字面量名`而不是`变量名`对待，所以对象的属性名再编译时才能知道。
   2. 属性值就是表达式。

2. 数组字面量是一种可以方便地按指定规格创建新数组的表示法，形式如：`var array = [1, 2, '3'];`。



### 函数（Functions）

#### 注意点

1. 函数字面量定义了函数值。
2. 可以有一个可选的名字，用于递归调用。
3. 也可以知道参数列表，这些参数就像变量一样，在调用时由传递的实际参数（arguments）初始化。
4. 函数的主体包含`变量定义`和`语句`。
