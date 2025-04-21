---
title: "物件方法"
description: "JavaScript 中的物件方法"
date: 2023-09-14 16:30:24
keywords: [JavaScript, 程式語言, 物件, 物件方法]
tags: ["筆記", "JavaScript"]
slug: js-object-method
---

物件沒有索引編號，所以沒辦法使用 for 來依賴索引值做一些內容操作，  
不過還是可以進行遍歷。

## for in

和陣列一樣可以利用 for in 語法抓出物件的 key 值，  
但只能抓出 key 值，for of 就不能抓出物件的 value 了（會報錯）：

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

for (const value in obj) {
  console.log(key);
}
```

---

## 內建方法 Object

物件可以透過 Object 原型的內建方法來遍歷內容，  
同時也會回傳一個陣列，所以可以用變數去存結果。

`Object.keys`、`Object.values` 從名稱就看得出來，這是會產生 key 與 value 的方法：

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.keys(obj)); // [a, b, c]
console.log(Object.values(obj)); // [1, 2, 3]
```

`Object.entries` 也會產生陣列，陣列的內容則是一個小的陣列，  
看起來會很像一個數對，代表的是一組 key 與 value：

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]
```

因為這些方法會產生陣列，所以陣列方法就可以串在後面使用：

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.entries(obj).filter((item) => item[1] > 1));
// [['b', 2], ['c', 3]]
```

注意 entries 的陣列內容是一個小陣列的集合體，  
因此 map、filter 等方法，callback 的參數拿到的 item 就是小陣列，  
要再上索引才能拿到值， 或是可以直接解構成可讀的寫法：

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.entries(obj).filter(([key, value]) => value > 1));
```

這些方法在操縱大量的 DOM 事件也經常會用到～所以可以說是必學的！

---

## 參考資料

- [JavaScript 容易混淆的遍歷方法](https://awdr74100.github.io/2019-11-28-javascript-traverse/?fbclid=IwAR3VGGfIhJgNuf-RWvokMQeoedHFGt5rOI0j9l-9D3B9oQSFn8A66MWvH-4)
