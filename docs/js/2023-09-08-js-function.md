---
title: "函式類型"
description: "JavaScript 的函式類型"
date: 2023-09-08 13:51:24
keywords: [JavaScript, 程式語言, 函式]
tags: ["筆記", "JavaScript"]
slug: js-function
---

有句話說「在 JS 裡面所有東西都是物件」，  
意思是所有型別都由**原型鏈**的方式製作出來的，而原型鏈是基於**基本物件**產生的。

function 在底層也是一個物件，只是用 `typeof` 顯示出來的是 `'function'`，  
但使用 `instanceof` 就可以知道，function 實際上也是一種物件。

## 箭頭函式

可以取代一般的函式宣告，在寫 callback 的時候會明顯比較簡潔，  
但語法上有幾點要注意：

- 參數只有 1 個時可以不寫括號，沒參數或 2 個以上的參數就一定要寫
- 箭頭後面可以直接丟要 return 的東西
- 要 return 物件不能直接寫大括號，會被當成函式作用域，要用小括號包好

```js
const sayHi = () => {
  console.log("Hi");
};

sayHi(); // 箭頭函式和傳統函式一樣可以賦值給變數再呼叫，變數名稱就是函式名稱

const list = [1, 2, 3, 4];
const newList = list.map((item) => ++item);
// 只有一個參數時可以不寫小括號
// newList 為 [2, 3, 4, 5]

const newObjList = list.map((item) => {
  value: ++item;
});
// newObjList 為 [undefined, undefined, undefined, undefined]
// 如果要回傳物件，這樣寫是不行的，大括號被當成函式作用域而不是物件
// 必須改成這樣 list.map(item => ({ value: ++item }))
```

上面範例可以看到箭頭函式的語法概念，  
包含常用的陣列方法裡面的 callback 都可用箭頭函式改寫。

:::warning
範例裡面的 ++ 都是寫在變數前面是因為前綴後綴的問題，  
return 是直接讀取值後拿走的，所以要用 ++ 運算的話要用前綴，  
否則只會帶到原本的值，而不會進行 ++ 運算。  
:::

---

## 匿名函式

沒有名字的函式也被稱作**匿名函式**，  
如陣列方法都需要在帶參數的地方定義一個 callback function，  
這些 function 不用寫函式名稱，因為在沒有用外部的變數存下來的情況下，  
匿名函式是不會被再次呼叫的：

```js
const list = [5, 6, 7, 8];

// 這裡的 callback 用關鍵字 function 或用箭頭函式都合法
list.forEach(function (item, index) {
  console.log(`index: ${index}, value: ${item}`);
});
```

---

## IIFE

不管是傳統函式、匿名函式、箭頭函式，它們都可以在被宣告後立即執行，  
稱作 **IIFE (Immediately Invoked Function Expression)**。

語法就是將函式定義的部分整個用小括號包起來，再接一個小括號：

```js
(function sayHi() {
  console.log("Hi");
})();
// 宣告完就會直接印出 Hi

(() => console.log("Hi"))();
```

---

## 函式流浪指南

程式碼會在執行之前進行**提升（Hoisting）**。

其中**函式宣告的提升優先度是最高的**，  
所以有時會看到程式碼的寫法是先呼叫了某個函式，往下找才會看到函式的宣告。

但是用 const 宣告的函式就不能這樣做，因為變數宣告與函式宣告的優先級別不同：

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
因此像函式表達式只會當成變數的提升。

變數被提升時，其內容是 **undefined**，它的值會在程式開始執行時，  
讀取到 `=` 這個賦值運算符號後才會有內容，  
因此 const 宣告的函式的問題，是因為我們在賦值之前就執行它，  
它實際上是在向 undefined 要求執行函式，所以就報錯了。

---

## 參考資料

- [JavaScript 面試考什麼！卡斯伯新書發表會～](https://www.youtube.com/live/XIJQNzUyeX8?app=desktop&feature=share)
- [重新認識 JavaScript: Day 10 函式 Functions 的基本概念](https://ithelp.ithome.com.tw/articles/10191549)
- [JS 原力覺醒 Day07 - 陳述式 表達式](https://ithelp.ithome.com.tw/articles/10218937)
