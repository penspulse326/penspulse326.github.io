---
title: "閉包"
description: "閉包的觀念"
date: 2024-06-02 14:13:00
keywords: [JavaScript, 程式語言, closure, 閉包, lexical scope, 靜態作用域]
tags: ["筆記", "JavaScript"]
slug: js-closure
---

閉包（Closure）算是面試必考題吧？  
當初聽到這個概念的時候也是一頭霧水，  
它運用的機制其實不多也不難，只是要先一一理解這些機制，  
才會對閉包的運作順序慢慢了解。

## 靜態作用域

靜態作用域（Lexical Scope）是指程式碼在撰寫時就決定好作用位置，  
不論是函式定義或是變數宣告，都是由我們擺放的位置決定它們的作用範圍，  
在執行時會依照規則取值：

```js
let a = 0;

function fn() {
  let b = "我是在 fn 裡面的 b";
  console.log(a); // 0
  console.log(b); // '我是在 fn 裡面的 b'
}

fn();
```

`fn` 執行時裡面取到的 a 是在外面宣告好的，因為在「**撰寫**」時就已經確定 a 是外層，  
`fn` 函式定義則是創造了一個內層的作用域，內層宣告的 b 則沒有任何手段可以從外層拿到它。

看起來沒什麼問題，所以我們可以得知「**內層可以取外層，外層不能取內層**」。  
有了這個結論，我們就不會被下面的範例誤導了：

```js
let message = "Hi 這是外層捏";

function fn1() {
  console.log(message);
}

function fn2() {
  let message = "Hi 這是內層歐";
  fn1();
}

fn2();
```

執行 `fn2` 時會印出外層的 message，因為對於 `fn1` 來說，  
它的外層並不是執行階段呼叫它的 `fn2`，  
所以查找 `message` 時一定是往定義它的外層去找！

因此把 `fn2` 內部宣告的 message 註解掉會發現對執行結果沒什麼影響。  
如果要把 `fn2` 的 message 帶過去，只要改寫 `fn1` 可以帶入的參數即可：

```js
function fn1(message) {
  console.log(message);
}

function fn2() {
  let message = "Hi 這是內層歐";
  fn1(message);
}

fn2();
```

這也是為什麼初學函式時都會強調盡量定義參數，用帶入參數的方式取值，  
因為在不知道靜態作用域的概念時很容易取錯值。

---

## 變數的生命週期

寫過 C 或 C++ 的話一定會記得初學者的夢魘：**指標變數**。  
指標變數是用來指定某個記憶體位置的，所以在 C 和 C++ 可以自行決定清空記憶體的時機點。

高階語言通常不提供操作記憶體的方式，因此變數不再被使用時就會被自動回收記憶體，  
如函式執行結束後，裡面宣告的變數也會跟著說再見。

---

## 閉包的結構

我們知道函式結束後裡面的變數會被回收掉，  
但是閉包可以保留裡面的變數狀態！

閉包是一個**函式**，並且也會回傳一個**函式**：

```js
function closureFn() {
  return function () {
    console.log("我是回傳的函式");
  };
}

const showClosure = closureFn();
showClosure(); // '我是回傳的函式'
```

這樣看起來好像多此一舉，回傳一個函式時還要用一個變數去接它才能執行？  
關鍵是上面提到的靜態作用域和生命週期，我們改寫一下：

```js
const closureFn = function () {
  let a = 0;
  return function () {
    a++;
    console.log(a);
  };
};

const showClosure = closureFn();
showClosure(); // 1
showClosure(); // 2
showClosure(); // 3
```

每次呼叫都可以更新 a 的值，代表 a 的狀態有被保留下來，  
這是因為函式表達式 `const showClosure = closureFn()` 製造了一個函式作用域，  
它回傳的函式裡面參考了 a 的值，所以 a 並不會在 `closureFn()` 結束後被回收。

閉包的寫法實際上也運用在很多地方，如經典的 debounce & throttle，前端框架的元件等等...。

---

## 參考資料

- [Lexical Scope](https://ithelp.ithome.com.tw/articles/10194745)
- [你懂 JavaScript 嗎？#11 語彙範疇](https://www.cythilya.tw/2018/10/18/lexical-scope/)
