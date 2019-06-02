// 01_set
/* 
ES6提供了新的数据结构Set。类似于数组，但是成员的值是唯一的，没有重复的值。Set本身是一个构造函数，用来生成Set数据结构。========================================================
*/
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i); // 2 3 5 4
}
// 上面代码通过add()方法向Set结构加入成员，Set结构不会添加重复的值。

// Set函数可以接受一个数组(或具有iterable接口的其他数据结构)作为参数，用来初始化。
const set = new Set([1, 2, 3, 4, 4]);
console.log([...set]); // [1, 2, 3, 4]

const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size); // 5

const set = new Set(document.querySelectorAll("div"));
set.size; // 56

// 类似于
const set = new Set();
document.querySelectorAll("div").forEach(div => set.add(div));
set.size; // 56
// 上面代码中，例一和例二都是Set函数接受数组作为参数，例三是接受类似数组的对象作为参数。

// set可用于数组去重和字符串去重：
[...new Set(array)];
[...new Set("ababbc")].join(""); // "abc"

// 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫"Same-value-zero equality"，它类似于精确相等运算符(===)，区别在于NaN等于自身，而精确相等运算符认为NaN不等于自身。
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set; // Set {NaN}
// 上面代码向Set实例添加了两个NaN，但只能加入一个，这说明在Set内部，两个NaN是相等的。

// 注意：两个对象总是不相等的
let set = new Set();
set.add({});
set.size; // 1
set.add({});
set.size; // 2

/* 
Set实例的属性和方法：===================================================
*/

/* 
Set结构的实例有以下属性：
Set.prototype.constructor: 构造函数，默认就是Set函数
Set.prototype.size: 返回Set实例的成员总数

Set实例的方法分为两大类：操作方法(用于操作数据)和遍历方法(用于遍历成员)。
下面是4个操作方法：
add(value): 添加某个值，返回Set结构本身
delete(value): 删除某个值，返回一个布尔值，表示删除是否成功
has(value): 返回一个布尔值，表示该值是否是Set的成员
clear(): 清除所有成员，没有返回值
*/
let s = new Set();
s.add(1)
  .add(2)
  .add(2);
s.size; // 2
s.has(1); // true
s.has(2); // true
s.has(3); // false
s.delete(2);
s.has(2); // false
s.clear();
s.size; // 0

// Array.from方法可以将Set结构转为数组
const items = new Set([1, 2, 3, 4, 5]); // Set(5) {1, 2, 3, 4, 5}
const array = Array.from(items); // [1, 2, 3, 4, 5]

// 数据去重的另一种方法：
Array.from(new Set([1, 2, 3, 4, 1])); // [1, 2, 3, 4]

/* 
下面是4个遍历方法，可以用于遍历成员：
keys(): 返回键名的遍历器
values(): 返回键值的遍历器
entries(): 返回键值对的遍历器
forEach(): 使用回调函数遍历每个成员
需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用。
keys、values、entries方法返回的都是遍历器对象。由于Set结构没有键名，只有键值(或者说键名和键值是同一个值)，所以keys方法和values方法的行为完全一致。
*/

let set = new Set(["red", "green", "blue"]);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
// 上面代码中，entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。

let set = new Set(["red", "green", "blue"]);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue

// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + " : " + value));
// 1 : 1
// 4 : 4
// 9 : 9
// 上面代码说明，forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。
// 另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

// set 遍历的应用：
// 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。

let set = new Set(["red", "green", "blue"]);
let arr = [...set];
// ['red', 'green', 'blue']
// 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。

let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]
// 而且，数组的map和filter方法也可以间接用于 Set 了。

let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => x % 2 == 0));
// 返回Set结构：{2, 4}

// 因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

// 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。

// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
