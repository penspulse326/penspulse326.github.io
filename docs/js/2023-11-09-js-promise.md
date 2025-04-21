---
title: "Promise"
description: "Promise 與 async 的基本概念"
date: 2023-11-09 12:43:08
keywords: [JavaScript, 程式語言, Promise, AJAX, async, 非同步]
tags: ["筆記", "JavaScript"]
slug: js-promise
---

先前我們在非同步網路請求有提到 Promise 物件，  
這是在網路請求中會拿到的回傳值，我們可以用後綴 then 或 catch 來解析值，  
那麼實際上它是怎麼運作的？

## 宣告物件

我們只能透過 then / catch 取值是因為 Promise 的格式被固定住了，  
它設計的目標就是不能讓我們隨便取值。

在建立 Promise 物件時，是透過 class 物件的方式去新增出實體的，  
所以需要給它一個參數當作初始值，它規定我們要給的參數會是一個函式。  
並且這個函式又包含兩個參數：

- 第一個參數為 resolve，為判定成功時會執行的動作。
- 第二個參數為 reject，為判定失敗時會執行的動作。

這兩個參數也是函式，可以傳純值或是表達式（就是要跑出一個值給它用使用就對了），  
所以寫起來會像是 resolve("成功")，代表 Promise 判定為成功時會回傳 "成功" 這個字串。

聽起來很抽象吧，我們可以搭配程式碼重現上面講的步驟：

```js
const p = new Promise((resolve, reject) => {
  resolve("成功");
  reject("失敗");
});

p.then((res) => console.log(res)).catch((err) => console.log(err));

// 只會印出"成功"
```

為什麼只會印出成功呢？！

原因是我們沒有給出任何判斷的方式，所以最先被寫入的 resolve("成功") 就會直接執行，  
反過來說我們先寫 reject("失敗") 一樣也不會印出成功，類似 early return 的概念。

因此通常我們在建立 Promise 物件的時候會另外呼叫函式或透過**函式表達式**，  
建立出一個空間進行判斷，再回傳建立好的 Promise 物件～

重新改寫一下剛剛的程式，回傳一個值判斷該數字是不是正數：

```js
const numPromise = (value) =>
  new Promise((resolve, reject) => {
    if (typeof value === "number" && value > 0) {
      resolve("正數");
    }
    reject("負數或不合法的值");
  });

numPromise(3)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

numPromise(-1)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

numPromise("你好")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// "正數"
// "負數或不合法的值"
// "負數或不合法的值"
```

現在我們可以判斷變數來決定要 resolve 還是 reject 了！

---

## 狀態變化

如果我們直接使用 console.log 去查看 Promise 物件的值，  
有可能會出現三種狀態：

```
- Promise { pending }
- Promise { fulfilled }
- Promise { rejected }
```

pending 在直接 console.log 查看網路請求的結果時，  
通常最容易得到這個結果，它代表 Promise 物件的內部還沒有進行任何 resolve 或 reject 的行為。

fulfilled 代表請求成功，rejected 當然就代表請求失敗了～

我們直接查看剛剛的 Promise：

```js
console.log(numPromise(3)); // Promise {<fulfilled>: '正數'}
console.log(numPromise("你好")); // Promise {<rejected>: '負數或不合法的值'}
```

稍微改寫一下，加上 setTimeout 讓 Promise 內部的行為延遲處理：

```js
const numPromise = (value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof value === "number" && value > 0) {
        resolve("正數");
      } else {
        reject("負數或不合法的值");
      }
    }, 300);
  });

console.log(numPromise(3)); // Promise {<pending>}
```

這時候就會出現 pending 狀態了～  
所以一如往常，我們必須去 then 或 catch 裡面取得結果。

---

## async / await

非同步函式 async 聽起來好像很艱深，其實它就是 then / catch 的變體哦！  
原本我們在進行網路請求時，存取結果都必須在 then / catch 裡面，  
有時候結構上不是那麼好閱讀，這時候用 async / await 改寫，  
就是很不錯的選擇，因為它的結構提高了閱讀性，  
看到 async 的人也能馬上去判斷這個函式有可能是處理在網路請求。

唯一要注意的是，async / await 是作用在 Promise 物件的語法，  
所以對一般函式是沒有用的，並不會有等待效果～

**async 會前綴在函式定義最前面，表示該函式的回傳值會變成一個 Promise 物件，**  
**而 await 必須在 async 函式下才能執行，await 就等同於 then 的作用，**  
只是取值的方式會變得不太一樣！

我們再改寫剛剛的程式碼，這時錯誤捕捉就要改 try / catch 的方式：

```js
// 這個函式不變
const numPromise = (value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof value === "number" && value > 0) {
        resolve("正數");
      } else {
        reject("負數或不合法的值");
      }
    }, 300);
  });

// 新增一個 async 函式來取代 then 取值
async function getPromiseResult(num) {
  try {
    const result = await numPromise(num);
    console.log("請求成功", result);
  } catch (err) {
    console.log("請求錯誤", err);
  }
}

getPromiseResult(3); // 請求成功 正數
getPromiseResult("你好"); // 請求失敗 負數或不合法的值
//
```

現在我們改用非同步函式 getPromiseResult 來呼叫 numPromise，  
並且透過 await 來取值，resolve 與 reject 的結果都能正確捕捉到了！

有時候我們發起網路請求後不需要進行取值，  
但仍然需要等待它執行完成才進行下面的程式時，  
這時直接加上 await 就可以，而不用另外宣告變數來儲存值。

```js
async function deleteItem() {
  try {
    // 不需要取值時就不用宣告變數儲存
    await axios.delete(url, config);
    renderList();
  } catch (err) {
    console.error(err);
  }
}
```

---

## 參考資料

- [你今天 Promise 了嗎？](https://5xruby.tw/posts/promise)
- [Promise 物件的建立](https://eyesofkids.gitbooks.io/javascript-start-es6-promise/content/contents/ch4_basic_usage.html)
- [JavaScript 核心觀念(80)](https://israynotarray.com/javascript/20220513/3060050230/)
