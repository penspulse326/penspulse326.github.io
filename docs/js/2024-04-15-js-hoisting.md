---
title: "提升"
description: "提升的觀念"
date: 2024-04-15 11:23:00
keywords: [JavaScript, 程式語言, hoisting, 提升, 表達式, 陳述式]
tags: ["筆記", "JavaScript"]
slug: js-hoisting
---

我們偶而會看到函式先被執行，後面才看到函式本身的定義，  
語法上是沒有錯的，但自己想要這樣寫的時候好像就會出現一點小雷？

## 程式碼的運作順序

JavaScript 雖然是逐行執行的，但在正式執行之前還會經過一些手續，  
分為**創造階段**（creation phase）與**執行階段**（execution phase），  
**提升**（**hoisting**）就是在創造階段發生的。

提升是為變數預留記憶體空間，等到要執行時才賦值。

## 賦值不會提升

我通常以「**賦值不會提升**」來濃縮整個運作順序，反過來說「**宣告是會提升的**」。

提升的順序依序是：

1. 函式宣告（函式陳述式）
2. 引數（arguments）
3. 變數宣告（函式表達式）

函式宣告的優先度最高，  
所以閱讀程式碼時才會看到先執行函式後才看到定義的狀況：

```js
sayHello(); // 先執行

function sayHello() {
  // 這邊才定義
  console.log("Hello!");
}
```

有時這種先執行後宣告的方式會不成功，大部分是因為誤用**函式表達式**：

```js
sayHello();

var sayHello = () => {
  console.log("Hello!");
};
// 這段程式碼會報錯
// 用 var 宣告會得到 sayHello is not a function
// 用 let 或 const 宣告會得到 Uncaught ReferenceError: sayHello is not defined
```

這裡是把函式賦值給變數名稱 sayHello 的**變數宣告**，  
而變數宣告在**創造階段**時還沒有賦值，也就是前面所說的「宣告會提升，賦值不會」，  
此時 sayHello 會是一個內容為 undefined 的變數，當然也就無法執行它了！

---

## TDZ

上面的範例會發現 const 與 let 得到的報錯與 var 不一樣，  
這是因為 ES6 後的新語法有更完善的撰寫規範與報錯提示，  
const 與 let 雖然都會提升，但是撰寫時會**禁止在宣告之前有任何存取的行為**，  
否則將會跳出「xxx is not defined」的報錯。

在變數宣告之前的程式碼會被稱作 TDZ（Temporal Dead Zone）：

```js
console.log(a); // Uncaught ReferenceError: a is not defined

const a = 123; // 到這行宣告之前都是 TDZ
```

---

## 陳述式與表達式

兩者的區別在於程式碼會不會有**回傳值**。

陳述式包含變數、函式定義、if-else、迴圈等等，  
這類程式碼在執行時並不會產生任何回傳值，  
所以你能發現下面這段程式碼，文法和語意都不對：

```js
const result = if(//...) {}; // Uncaught SyntaxError: Unexpected token 'if'
```

表達式有純值、變數、函式執行、正規表達式等等，  
這些程式碼本身在執行時就代表一個值，  
所以可以直接拿來存取：

```js
console.log(123); // 純值
console.log(a); // 變數
console.log(fn()); // 函式執行
console.log(\123\); // 正規表達式
```

函式定義也可以說是**函式陳述式**， 因為只是在定義這個函式的內容，並沒有執行它。
不過**將函式定義用小括號包起來**時就會變成一個表達式：

```js
(function fn() {}); // 在 Chrome 的 console 輸入會得到一個回傳值，印出函式的結構
```

所以函式定義本身是可以拿來賦值到一個變數上，這種方式也稱為**函式表達式**：

```js
const fn = () => {
  // 這裡是不是具名或箭頭函式都可以
  console.log("函式執行");
};

fn();
```

還記得前面說的「賦值不會提升」嗎？這段程式碼在創造階段時只會準備好一個叫做 fn 的變數，  
在執行階段時，如果我們把 `fn()` 移到 const 宣告之前，這時 fn 還沒有任何內容，所以會報錯。  
而用關鍵字 `function` 宣告函式時，創造階段會直接取得函式的結構內容。

---

## 參考資料

- [JavaScript 的執行階段: Execution Context](https://ithelp.ithome.com.tw/articles/10258787)
- [函式陳述句與函式表示式](https://ithelp.ithome.com.tw/articles/10192146)
