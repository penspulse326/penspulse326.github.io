---
title: "迴圈與陣列方法（我常用的）"
description: "JavaScript 中的陣列方法"
date: 2023-09-14 16:16:24
keywords: [JavaScript, 程式語言, 迴圈, 陣列, 陣列方法]
slug: array-method
---

遍歷指的是從頭走訪到尾的意思，在陣列或物件中也表示從第一項依序跑到最後一項的行為。  
迴圈和遍歷是相關的概念，除了常見的 for、while 之外，JS 的陣列與物件也有專屬的類似迴圈的方式，  
一樣都能將重複的程式碼封裝起來。

## for 家族

### 原始的 for

for 是許多語言都有的迴圈語法，所以不限於陣列做使用，只要是單一重複的工作都可以利用 for 完成，  
注意迴圈的終止條件，不要寫錯造成無限迴圈。

```js
let numStr = "0";

for (let i = 1; i < 10; i++) {
  numStr += i;
}

console.log(numStr); // "0123456789"
```

---

### for in / for of

這兩個方法是 for 的親戚，差別就在於不需要寫條件式，  
for in 可以抓出索引值，而 for of 可以抓出 value。

```js
const arr = ["a", "b", "c", "d"];

for (const index in arr) {
  console.log(`索引 ${index}`);
}

for (const value of arr) {
  console.log(`值 ${value}`);
}
```

---

### forEach

forEach 則必須接在陣列後面才能做使用，  
而 forEach 本身是沒有條件式的，它會在訪問所有的元素後終止。

forEach 的 callback 可以帶入三個參數：元素本身（必填）、元素的索引（選填）、元素的整個陣列（選填）。

```js
let numArray = [1, 2, 3, 4];

numArray.forEach((item, index, arr) => {
  console.log("目前元素索引:", index);
  console.log("目前元素內容:", item);
  console.log("目前陣列:", arr);
});
```

---

要特別注意 JS 中有類似陣列的資料結構，**稱作 array-like objects**，  
它們雖然不是陣列，但通常也可以透過 forEach 進行遍歷，  
像是操作 DOM 元素時可能會得到的 NodeList、HTMLElement 等等。
陣列有很多內建方法，不常用的話蠻容易混淆的，  
但是只要記住兩個重點後，之後想查閱時就會快很多：

- 這個方法有沒有回傳值？回傳值是什麼？
- 這個方法會不會更改到原本的陣列？

這篇要介紹的三個常用方法也包含這兩個特性！

## 進階陣列方法

### map（有回傳值/不會改變陣列）

map 的 callback 和 forEach 一樣，可以帶入三個參數，  
但是 map 會回傳一個新的陣列，所以要保留結果的話要另外宣告變數來儲存。

```js
const arr1 = [1, 2, 3];

const arr2 = arr1.map((item) => ++item);

console.log(arr2); // [2, 3, 4]
```

callback 裡面也可以寫入一些程式碼而不是像範例這樣直接回傳值，  
只要確定好最後 return 的東西是要放到新陣列的就可以了。

要注意的是之前提到過的拷貝問題，諸如上面提到的 forEach，  
或是這次要介紹的 map、filter 等等，一樣**只能做到第一層的獨立**，  
如果是包含陣列或物件之類的內容，在 map 的 callback 裡面抓出來後，  
仍然是指向原本陣列的，所以修改新陣列也會同時改到原本的陣列。（淺拷貝）

```js
const arr1 = [{ value: 1 }, { value: 2 }, { value: 3 }];

const arr2 = arr1.map((item) => ++item.value);

console.log(arr2); // [{value: 2}, {value: 3}, {value: 4}]
console.log(arr1); // [{value: 2}, {value: 3}, {value: 4}]
```

---

### filter（有回傳值/不會改變陣列）

filter 類似 map，但 callback 是在**回傳值上寫入條件判斷式**，
符合條件的元素會被留下來，最後整合出篩選過的新陣列。

```js
const arr1 = [1, 2, 3, 4];

const arr2 = arr1.filter((item) => item > 2);

console.log(arr2); // [ 3, 4 ]
```

當然要在 callback 裡面順便做事，語法上也是可以的，
只是要記得最後 return 一個條件判斷式，才能進行篩選。

---

### sort（無回傳值/會改變陣列）

sort 是一個很精妙的方法...我也不是很熟悉它的條件式 XD
要特別注意的是，它會**更動原來的陣列**。

sort 的 callback 會有兩個參數，通常寫成 a, b 或 x, y，
代表陣列中相鄰的兩個元素（n 與 n +1）。

而回傳值則代表之後的排序行為，
回傳值是負數時 a 與 b 不會交換，
回傳值是正數時 a 與 b 交換位置。
經過多次的當兩兩比較後都不會交換位置時，sort 就結束並完成排序。

依照這個特性，可以利用**純值的比較**寫出簡潔的語法，
所以有時候 sort 的 callback 看起來還蠻抽象的...
但其實就是和回傳值有關係！

```js
const arr1 = [4, 1, 3, 2, -5];

arr1.sort((a, b) => a - b);
// 表示 a（前項） 如果比較大就往後移

console.log(arr1); // [ -5, 1, 2, 3, 4 ]
```

秉持**正數交換**的原則來看上面的範例，
callback 的回傳值為 a - b，
表示 a 比 b 還要大時會交換位置，
因此經過多次的兩兩比較後，數值較大的元素會被往後排形成升冪排序。

稍微改變回傳值的寫法就能變成降冪排序了！

```js
const arr1 = [4, 1, 3, 2, -5];

arr1.sort((a, b) => b - a);
// 表示 b（後項）如果比較大就往前移（因為正數交換原則）

console.log(arr1); // [ 4, 3, 2, 1, -5 ]
```

只要掌握交換的原則就可以設計出一些純值計算的條件達成想要的排序效果了。

```js
const objArray = [
  { name: "Cindy", money: 300 },
  { name: "Bob", money: 100 },
  { name: "Ann", money: 600 },
];

objArray.sort((a, b) => a.money - b.money);
// money 越多就往後排

console.log(objArray); // 順序變成 Bob, Cindy, Ann

objArray.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
// 利用 charCode 來照字首排序

console.log(objArray); // 順序變成 Ann, Bob, Cindy,
```

---

## 參考資料

- [JavaScript Array 陣列操作方法大全 ( 含 ES6 )](https://www.oxxostudio.tw/articles/201908/js-array.html?fbclid=IwAR12g-n-YcR7KG-dgXWme9xcKCdXlBNthFFeptHjfLjK_UBEBR7WysgX9Oo#array_map)
- [JS 將陣列 Array 重新排列的 sort()](https://ithelp.ithome.com.tw/articles/10225733?fbclid=IwAR0sMRAy_sHRlwo-7pDA9xzhzSSaLPIOwzu2Luo8LQJ1xx5vB3eRExR82AU)
