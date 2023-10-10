---
title: "函式類型"
description: "JavaScript 的函式類型"
date: 2023-09-08 13:51:24
keywords: [JavaScript, 程式語言, 函式]
---

JavaScript 的函式也有各種花式玩法...諸如 HOC、閉包、IIFE 等等，  
這篇會記錄一些初階函式的使用概念。

this、提升或作用域比較深奧的觀念，就要再做另外一篇筆記了！  
（我也沒有到很精熟所以要花點時間整理 QQ）

之前說到 JS 裡面所有東西都是物件，而 function 也不例外！  
只是型別規範上，用 typeof 顯示出來的是 "function"，  
事實上 function 也還真的就是那麼特別，可以說是一種特別的物件。

## 真想箭到你：箭頭函式

（這樣有暴露我的年齡層嗎...XD）

箭頭函式（arrow function）濃縮了傳統函式的寫法，習慣之後可以用來取代性質簡單的函式宣告，  
尤其是在前端框架的函式庫裡面，常會有很多調動 callback 的寫法，這時用箭頭函式看起來比較簡便！

但語法上有幾點要注意：

- 參數只有 1 個時可以不寫括號，沒參數或 2 個以上的參數就一定要寫
- 箭頭後面可以直接丟要 return 的東西
- 如果要 return 物件不能直接寫大括號，會被當成函式作用域
- 箭頭函式可以賦值給一個變數，用該變數來重複呼叫函式
- 用賦值宣告的函式所指向的記憶體通常不會改變，所以語意上要用 const 宣告

```js
const sayHi = () => {
  console.log("Hi");
};
sayHi();
// 箭頭函式可以像匿名函式一樣賦值給變數再用變數呼叫

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
  return {
    value: ++item,
  };
});

// objList 為 [{ value: 2}, { value: 3},{ value: 4},{ value: 5}]
```

上面範例可以看到一些箭頭函式的語法概念，  
包含常用的陣列方法裡面會接的 callback function 都可用箭頭函式改寫。

註：範例裡面的 ++ 都是寫在變數前面是因為前綴後綴的問題，  
return 是直接把內容載走的，所以要用 ++ 運算的話要用前綴否則只會帶到原本的值。

---

## 不具名的函式

沒有名字的函式也被稱作**匿名函式**，尤其是一般我們初學到陣列方法、非同步問題的時候，  
經常會呼叫到一種裡面包有 callback function 的方法，這些 function 通常是沒有名字的，  
這就是一種匿名函式！

如果要為這些匿名函式重新命名也是 OK 的，  
但要注意這些 callback 都是定義在我們呼叫的方法的作用域裡面，外部無法取用這些函式，  
所以通常用匿名函式去寫 callback，反正也沒有別的地方可以呼叫它。

```js
const list = [5, 6, 7, 8];
list.forEach(function (item, index) {
  console.log(`index: ${index}, value: ${item}`);
});
```

這個 forEach 迭代的結構看起來跟上一個範例似曾相似...  
沒錯，箭頭函式也是一種匿名函式，所以這邊的 callback 也是能改寫成箭頭函式的。

---

## 要，現在就要：IIFE

不管是傳統函式、匿名函式、箭頭函式，它們都可以在被宣告時立即執行，  
稱作 **IIFE (Immediately Invoked Function Expression)**。

語法就是將函式定義的部分整個用小括號包起來，再接一個小括號。

```js
(function sayHi() {
  console.log("Hi");
})();
// 宣告完就會直接印出 Hi

(() => console.log("Hi"))();
// 這裡我不需要任何 return 的值所以箭頭後面直接接上 console.log()
```

那麼某些會調動 callback 的方法，在 callback 後面接小括號變成 IIFE 可以嗎？  
語法上是合法的，只是 callback 本來就會在迭代結束後執行，所以就沒有必要寫了！

---

## 函式流浪指南：提升問題

在 JS 裡面，程式碼會根據作用域還有資料類型發動**提升（Hoisting）**，  
其中函式宣告的優先級別是最高的，所以有時會看到程式碼的寫法是先呼叫了某個函式，  
然後才在下面的內容找到函式的宣告。

但是被賦予匿名函式的變數就不能這樣做，因為變數宣告與函式宣告的優先級別不同！

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
第二種將匿名函式賦值給變數則稱為**函式表達式**，  
要注意的是提升只會提升**宣告行為**而不會提升**賦值行為**，  
因此像函式表達式這種寫法，只會當成變數的提升。

變數被提升時，其內容是 **undefined**，它的值會在程式開始執行時才賦予，  
因此向第二種函式表達式的情況，先執行後宣告的寫法，  
實際上是在向 undefined 要求執行函式，自然就會報錯了～

但這段範例還有一個語法錯誤，這個函式是透過 const 宣告的，  
報錯的訊息是連存取都不行...所以之後再補充一篇詳細的提升與作用域筆記。

---

### 參考資料

- [JavaScript 面試考什麼！卡斯伯新書發表會～](https://www.youtube.com/live/XIJQNzUyeX8?app=desktop&feature=share)
- [重新認識 JavaScript: Day 10 函式 Functions 的基本概念](https://ithelp.ithome.com.tw/articles/10191549)
- [JS 原力覺醒 Day07 - 陳述式 表達式](https://ithelp.ithome.com.tw/articles/10218937)
