// 面向对象
// 封装 继承 多态
// 封装：不考虑内部实现，只考虑功能使用
// 继承：为了复用，从父类继承某些方法和属性，并添加自己的属性
// 多态："不同对象"作用于"同一操作"的"不同结果",实际就是"让某人去做某事"

// 1.普通调用
function CreateObject1(num) {
  const Player = new Object();
  Player.num = num;
  return Player;
}
const a1 = CreateObject1(1);
const a2 = CreateObject1(2);

// 2.构造函数
// this挂载的属性和对象，都是指向当前对象的。
// 在实例化的时候，通过this添加的属性或者方法就会在内存中 复制一份，造成一定程度上的浪费
// 相当于CreateObject2.num 和 CreateObject2.getNum 被创建了2次
function CreateObject2(num) {
  this.num = num;
  this.getNum = function () {};
}
const a12 = new CreateObject2(1);
const a22 = new CreateObject2(2);

// 3.原型
// getNum只在内存存了一份
function CreateObject3(num) {
  this.num = num;
}

CreateObject3.prototype.getNum = function () {};

const a13 = new CreateObject3(1);
const a23 = new CreateObject3(2);

// 4.静态属性 需要通过构造函数访问的
function CreateObject4(num) {
  this.num = num;
  if (!CreateObject4.total) {
    CreateObject4.total = 10;
  }
  ++CreateObject4.total;
}
const a14 = new CreateObject4(1);
// a14.total // error
const a24 = new CreateObject4(2);

// 5. new的实现 关键字
//  a. child继承自Parent.prototype的新对象
//  b. child.__proto__ = Parent.prototype
//  c. this指向：Parent无返回时或返回基本类型时，this指向child；Parent返回对象时，指向对象；
function CreateObject5(num) {
  this.num = num;
}

CreateObject5.prototype.getNum = function () {};

function NewCore() {
  const obj = {};
  const Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  const result = Constructor.apply(obj, Array.prototype.slice.call(arguments));
  return typeof result === "object" ? result : obj;
}

const a15 = NewCore(CreateObject5, 1);
const a25 = NewCore(CreateObject5, 2);

// 继承
// 6. 原型链继承
// 就是把new Parent放到了Child.prototype上
// 取值查询就是c1.xxx -> Child.prototype.xxx(其实就是Parent的实例p.xxx) -> Parent.prototype.xxx
// 弊端：a.如果有属性是引⽤类型的，⼀旦某个实例修改了这个属性，所有实例都会受到影响
//      b.创建 Child 实例的时候，不能传参
function Parent() {
  this.list = ["a", "b"];
  this.name = "原型链继承";
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child() {
  this.name = "继承";
}

Child.prototype = new Parent();
// 因为constructor属性是包含在prototype⾥的，上⾯重新赋值了prototype，所以会导致Child的
// constructor指向[Function: Parent]，有的时候使⽤c1.constructor判断类型的时候就会出问题
// 为了保证类型正确，我们需要将Child.prototype.constructor 指向他原本的构造函数Child
Child.prototype.constructor = Child;

const c1 = new Child();
const c2 = new Child();
c1.getName();
c1.list.push("c1");
console.log(c2);

// 7. 构造函数继承
// 保证了传参和属性修改实例受影响的情况
// 就是通过call调用Parent转化this指向为Child，让Child获得Parent的属性和方法
// 弊端：属性或者⽅法想被继承的话，只能在构造函数中定义。⽽如果⽅法在构造函数内定义了，
//      那么每次创建实例都会创建⼀遍⽅法，多占⼀块内存。
function Parent2(list, name) {
  this.list = list;
  this.name = name;
}

function Child2(num, list, name) {
  Parent2.call(this, list, name);
  this.num = num;
}

const c11 = new Child2(11, ["11", "111"], "c11");
const c21 = new Child2(22, ["21", "211"], "c21");

// 8. 组合继承
// 就是组合原型链继承和构造函数继承
// 弊端：调用了2次构造函数，做了重复的操作
function Parent3(list, name) {
  this.list = list;
  this.name = name;
}

Parent3.prototype.getName = function () {
  console.log(this.name);
};

function Child3(num, list, name) {
  Parent3.call(this, list, name);
  this.num = num;
}

Child3.prototype = new Parent3();
Child3.prototype.constructor = Child3;

const c12 = new Child3(13, ["12", "122"], "c12");
const c22 = new Child3(23, ["22", "222"], "c22");

// 9. 寄生组合继承
function Parent4(list, name) {
  this.list = list;
  this.name = name;
}

Parent4.prototype.getName = function () {
  console.log(this.name);
};

function Child4(num, list, name) {
  Parent4.call(this, list, name);
  this.num = num;
}

// 相当于c.xx -> C.prototype.xx(其实就是Fn的实例.xx) -> (Fn.prototype = Parent.prototype).xx
// 间接调用
// 1 Object.create的polyfill
function Fn() {}
Fn.prototype = Parent4.prototype;
Child4.prototype = new Fn();

// 2
// Child4.prototype = Object.create(Parent4.prototype);

Child4.prototype.constructor = Child4;

const c13 = new Child4(13, ["13", "133"], "c13");
const c23 = new Child4(23, ["23", "233"], "c23");

// 10. Object.create
function ObjectCreate(proto) {
  if (typeof proto !== "object") {
    throw new TypeError("is not object");
  }
  function F() {}
  F.prototype = proto;
  return new F();
}

// 11. Object.getPrototypeOf
// 获取内部[[Prototype]]属性的值
// Object.getPrototypeOf(Object) 不是 Object.prototype
// Object.getPrototypeOf(Object) 是把 Object这一构造函数看作对象，返回的当然是函数对象的原型，
// 也就是 Function.prototype。
const obj = new Object();
Object.prototype === Object.getPrototypeOf(obj); // true
Object.prototype === Object.getPrototypeOf({}); // true
