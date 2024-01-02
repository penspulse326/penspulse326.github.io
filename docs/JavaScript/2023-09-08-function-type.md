---
title: "函式類型"
description: "JavaScript 的函式類型"
date: 2023-09-08 13:51:24
keywords: [JavaScript, 程式語言, 函式]
slug: function-types
---

JS 的函式也有各種花式玩法...諸如 HOC、閉包、IIFE 等等，  
這篇會記錄一些初階函式的使用概念。

其實在 JS 裡面所有東西都是物件，它們都是由**原型鏈**的方式製作出型別系統，  
而原型鏈是基於**基本物件**產生的，function 也不例外！  
只是用 `typeof` 顯示出來的是 "function"，但使用 `instanceof` 就可以比對出來，  
function 在底層的設計上也是一種物件，只是是一種比較特別的物件（？）。

## 箭頭函式

箭頭函式（arrow function）習慣之後可以用來取代一般的函式宣告，  
有很多方法需要在函式參數裡面再帶入函式（callback）需要被呼叫，  
這時用箭頭函式看起來比較簡便！

但語法上有幾點要注意：

- 參數只有 1 個時可以不寫括號，沒參數或 2 個以上的參數就一定要寫
- 箭頭後面可以直接丟要 return 的東西
- 如果要 return 物件不能直接寫大括號，會被當成函式作用域，要用小括號包好
- 箭頭函式可以賦值給一個變數，用該變數來重複呼叫函式
- 用賦值宣告的函式所指向的記憶體通常不會改變，所以語意上要用 const 宣告

```js
const sayHi = () => {
  console.log("Hi");
};

sayHi();
// 箭頭函式可以賦值給變數再用變數呼叫

const list = [1, 2, 3, 4];
const newList = list.map((item) => ++item);
// 只有一個參數時可以不寫小括號
// newList 為 [2, 3, 4, 5]

const newObjList = list.map((item) => {
  value: ++item;
});
// 如果要回傳物件，這樣寫是不行的，大括號被當成函式作用域而不是物件
// newObjList 為 [undefined, undefined, undefined, undefined]

const objList = list.map((item) => {
  return { value: ++item };
});
// objList 為 [{ value: 2}, { value: 3},{ value: 4},{ value: 5}]
```

上面範例可以看到一些箭頭函式的語法概念，  
包含常用的陣列方法裡面會接的 callback function 都可用箭頭函式改寫。

註：範例裡面的 ++ 都是寫在變數前面是因為前綴後綴的問題，  
return 是直接讀取值後拿走的，所以要用 ++ 運算的話要用前綴，  
否則只會帶到原本的值，而不會進行 ++ 運算。

---

## 不具名的函式

沒有名字的函式也被稱作**匿名函式**，一般初學到陣列方法、非同步函式時，  
會呼叫到一種裡面包有 callback function 的方法，這些 function 通常是沒有名字的，  
這就是一種匿名函式：

```js
const list = [5, 6, 7, 8];

list.forEach(function (item, index) {
  console.log(`index: ${index}, value: ${item}`);
});
```

這個 forEach 迭代的結構看起來跟上一個範例似曾相似...  
沒錯，如果不把箭頭函式賦值在變數上的話，它也是一種匿名函式，  
所以這邊的 callback 也是能改寫成箭頭函式的。

---

## IIFE

不管是傳統函式、匿名函式、箭頭函式，它們都可以在被宣告時立即執行，  
稱作 **IIFE (Immediately Invoked Function Expression)**。

語法就是將函式定義的部分整個用小括號包起來，再接一個小括號：

```js
(function sayHi() {
  console.log("Hi");
})();
// 宣告完就會直接印出 Hi

(() => console.log("Hi"))();
// 這裡我不需要任何 return 的值所以箭頭後面直接接上 console.log()
```

---

## 函式流浪指南

在 JS 裡面，程式碼會根據作用域還有資料類型發動**提升（Hoisting）**，  
其中函式宣告的優先級別是最高的，所以有時會看到程式碼的寫法是先呼叫了某個函式，  
然後才在下面的內容找到函式的宣告。

但是被賦予匿名函式的變數就不能這樣做，因為變數宣告與函式宣告的優先級別不同：

```js
console.log(add(1, 2)); // 函式可以在宣告前就取用

function add(a, b) {
  return a + b;
}

console.log(twoSum(1, 2)); // 會報錯

const twoSum = (a, b) => {
  return a + b;
};
```

第一種傳統函式的宣告也稱為**函式陳述式**，  
第二種將匿名函式賦值給變數則稱為**函式表達式**。

要注意的是提升只會提升**宣告行為**而不會提升**賦值行為**，  
因此像函式表達式這種寫法，只會當成變數的提升。

變數被提升時，其內容是 **undefined**，它的值會在程式開始執行時才賦予，  
因此向第二種函式表達式的情況，先執行後宣告的寫法，  
實際上是在向 undefined 要求執行函式，自然就會報錯了～.

---

## 參考資料

- [JavaScript 面試考什麼！卡斯伯新書發表會～](https://www.youtube.com/live/XIJQNzUyeX8?app=desktop&feature=share)
- [重新認識 JavaScript: Day 10 函式 Functions 的基本概念](https://ithelp.ithome.com.tw/articles/10191549)
- [JS 原力覺醒 Day07 - 陳述式 表達式](https://ithelp.ithome.com.tw/articles/10218937)
