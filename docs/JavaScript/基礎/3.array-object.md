---
title: "陣列與物件"
description: "JavaScript 的物件與陣列"
date: 2023-09-06 10:19:47
keywords: [JavaScript, 程式語言, 陣列, 物件]
slug: array-and-object
---

## 物件型別

前面提到 number、string、null 等等，這些東西都分類為「**原始型別**」（primitive type），  
它們的內容通常是純值。

而 object、array 這些則分類為**「物件型別」**（object type），  
它們比較像是容器，裡面可以包含不一樣類型的資料型態。

但要注意的是：

- typeof {} 是 object
- typeof [] 是......object

「陣列」的型別是 object，這也是一種底層規範，  
所以要檢查是不是陣列也需要其他方法：

```js
let arr = [];

console.log(Array.isArray(arr)); // true
```

---

## 參照問題

原始型別的變數在拷貝時，只會拷貝到值而已，所以函式在帶入這些變數時，  
實際上只是把這些值複製一份到函式裡面使用，這種情況稱為 call by value：

```js
let a = 1;
let b = a;

a = 2;
console.log(b); // 1
```

但是物件型別的變數在傳遞時，是**把記憶體位址拷貝過去**，  
存原始型別變數指向的是一個值，而**存物件的變數指向的會是記憶體位址**，  
不是裡面的內容（類似 C 的指標變數）：

```JS
let arr1 = [];
let arr2 = arr1;

arr1.push(1);
arr1.push(2);

console.log(arr2); // [1, 2];
```

由上面範例可以看到，雖然 arr2 拷貝了 arr1，
但是對 arr1 新增了資料後，印出 arr2 的值居然也發生改變了！

因為陣列是一種物件，它們指向的是記憶體位址而不是值，
所以拷貝過去的也是記憶體位址，代表它們最後都指向同一個陣列，
這種情況就稱為 **call by reference**。

因此在進行比對時，物件並不等於物件，因為它們比對的並不是值或內容，
而是記憶體位址，所以不管是寬鬆或嚴格的比較，結果皆為 false。

```js
let arr1 = [];
let arr2 = [];

console.log(arr1 == arr2); // false

let obj1 = {};
let obj2 = {};

console.log(obj1 == obj2); // false
```

---

## 深淺拷貝問題

知道 call by reference 的狀況後，就產生了一個問題：  
「**我到底應該怎麼複製它的值而且形成一個獨立的物件**？」

這種透過 call by reference 形成的拷貝也叫做**淺拷貝（shallow copy）**。  
想要形成一個獨立的物件，就只能透過一些特別的賦值方式！

如果使用 ES6 的展開運算子，是不是就算是重新賦值了呢？

```js
let arr1 = [1, 2];
let arr2 = [...arr1];

arr1.push(3);

console.log(arr2); // [1, 2]
```

看起來似乎沒問題，arr2 的值並沒有被 arr1 的行為影響，  
但這只限在第一層而已！

```js
let arr1 = [{ a: 1 }];
let arr2 = [...arr1];

arr1[0].a = 2;
console.log(arr2); // [{ a : 2 }]
```

花惹發？？？沒錯，展開運算子只能重新分配第一層的記憶體空間而已，  
假如物件或陣列的內容比較複雜，裡面又是另一層的物件，  
這時第二層以後的東西還是會指向原本的記憶體空間，  
所以即使使用展開運算，嚴格來說也還是淺拷貝。

原生的 JS 要達成**深拷貝（deep copy）**的方法只有一種：

```js
let arr1 = [{ a: 1 }, { b: 2 }];
let arr2 = JSON.parse(JSON.stringify(arr1));

arr1[1].b = 0;

console.log(arr2); // [{ a : 1 },{ b : 2}]
```

就是這麼土砲...只能透過 **JSON 字串轉換**的方式把原本的內容強制轉型成字串，
再還原成物件的格式，形成一個新的記憶體空間。

---

## 參考資料

- [所有東西都是物件(或純值)](https://israynotarray.com/jsweirdworld/20190521/1329212743/)
- [JS 原力覺醒 Day9 - 原始型別與物件型別](https://ithelp.ithome.com.tw/articles/10220005)
- [關於 JS 中的淺拷貝(shallow copy)以及深拷貝(deep copy)](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)
