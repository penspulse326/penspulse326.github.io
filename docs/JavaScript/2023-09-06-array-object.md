---
title: "陣列與物件"
description: "JavaScript 的物件與陣列"
date: 2023-09-06 10:19:47
keywords: [JavaScript, 程式語言, 陣列, 物件]
---

前面筆記了一些變數與邏輯判斷的特性後，這篇就要來記錄一下陣列跟物件了。

## JS 的根源：物件

前面提到 number、string、null 等等，這些東西都分類為**「原始型別」**（primitive type），  
它們的內容通常是純值。

而 object、array 這些則分類為**「物件型別」**（object type），  
它們比較像是容器，裡面可以包含不一樣類型的資料型態。

但要注意的是：

- typeof 123 是 number
- typeof "123" 是 string
- typeof {} 是 object
- typeof [] 是......object

沒錯，原始型別中 NaN 是 number，這看來像是個例外，但實際上是底層的規範。

「陣列」的型別是 object，這同樣也是一種底層規範，  
所以要檢查是不是陣列也需要其他方法：

```js
let arr = [];

console.log(Array.isArray(arr)); // true
```

這邊就要提到特別的觀念：**在 JS 裡面所有東西都是物件**。

所有型別都是透過原型鍊製造出來的，原型鍊的底層是一個基本物件，  
裡面封裝了這個型別應該要有的方法～（之後再補充原型鍊的概念）  
只是要記得，規範上陣列的型別也是物件。

---

## 我依然是你的物件：參照問題

原始型別的變數在拷貝時，只會拷貝到值而已，這種情況稱為 call by value。

```js
let a = 1;
let b = a;

a = 2;
console.log(b); // 1
```

但是物件型別在拷貝時，是根據**記憶體位址進行拷貝**的，  
原因就在於原始型別和物件在宣告時，都會佔用記憶體空間，  
但原始型別指向的是純值，但**物件指向的會是記憶體位址**，而不管裡面的值和內容。

```JS
let arr1 = [];
let arr2 = arr1;

arr1.push(1);
arr1.push(2);

console.log(arr2); // [1, 2];
```

由上面的程式碼可以看到，雖然 arr2 拷貝了 arr1，  
但是對 arr1 新增了資料後，印出 arr2 的值居然也發生改變了！  
因為陣列是一種物件，而它們指向的是記憶體位址而不是值，  
所以拷貝過去的也是記憶體位址，代表它們最後都指向同一個陣列，  
這種情況就稱為 call by reference。

也因此，在進行比對時，物件並不等於物件，因為它們比對的並不是值或內容，  
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

## 轉型的我從此飄流：深淺拷貝問題

知道 call by reference 的狀況後，就產生了一個問題：

**「我到底應該怎麼複製它的值而且形成一個獨立的物件？」**

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
假如物件或陣列的內容比較複雜，又再包上另一層的物件，  
這時第二層以後的東西還是會指向原本的記憶體空間，  
所以即使使用 ES6 的方法，嚴格來說也還是在淺拷貝的範圍。

要達成**深拷貝（deep copy）**的方法只有一種：

```js
let arr1 = [{ a: 1 }, { b: 2 }];
let arr2 = JSON.parse(JSON.stringify(arr1));

arr1[1].b = 0;
console.log(arr2); // [{ a : 1 },{ b : 2}]
```

就是這麼土砲...只能透過 **JSON 字串轉換**的方式把原本的內容強制轉型成字串，  
再還原成物件的格式，形成一個新的記憶體空間！

另外要注意的是這個 JSON 字串轉換的方法在物件內容較龐大的時候，也是會有效能問題的！  
如果有使用特定函式庫或套件的話，裡面也會有深拷貝方法可以生成獨立物件。

---

### 參考資料

- [所有東西都是物件(或純值)](https://israynotarray.com/jsweirdworld/20190521/1329212743/)
- [JS 原力覺醒 Day9 - 原始型別與物件型別](https://ithelp.ithome.com.tw/articles/10220005)
- [關於 JS 中的淺拷貝(shallow copy)以及深拷貝(deep copy)](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)
