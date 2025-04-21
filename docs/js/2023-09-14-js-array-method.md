---
title: "陣列方法"
description: "JavaScript 中的陣列方法"
date: 2023-09-14 16:16:24
keywords: [JavaScript, 迴圈, 陣列, 陣列方法]
tags: ["筆記", "JavaScript"]
slug: js-array-method
---

## for

### 原始的 for

重複的工作都可以用 for 執行，但要注意迴圈的終止條件，  
如果寫錯會造成無限迴圈：

```js
let numStr = "0";

for (let i = 1; i < 10; i++) {
  numStr += i;
}

console.log(numStr); // '0123456789'
```

---

### for in / for of

這兩個方法不用寫終止條件，  
for in 可以抓出索引值，而 for of 可以抓出內容：

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

必須是陣列後面才能做使用，也不用寫終止條件，  
它會在訪問所有的元素後結束。

callback 可以帶入三個參數：

1. 元素本身（必填）
2. 元素索引（選填）
3. 整個陣列（選填）

```js
const numArray = [1, 2, 3, 4];

numArray.forEach((item, index, arr) => {
  console.log("目前元素索引:", index);
  console.log("目前元素內容:", item);
  console.log("目前陣列:", arr);
});
```

JS 中有類似陣列的資料，稱作 **array-like objects**，  
它們雖然不是陣列，但也可以透過 forEach 進行遍歷，  
像是 NodeList、HTMLElement 等等。

---

## 其他陣列方法

陣列方法只要記住兩個重點：

- 這個方法有沒有回傳值？回傳值是什麼？
- 這個方法會不會更改到原本的陣列？

### map（有回傳值/不會改變陣列）

callback 的參數順序和 forEach 一樣，  
map 會回傳一個新的陣列，可以另外宣告變數來儲存它，  
callback 裡面可以執行一些程式碼重新組合陣列的內容：

```js
const arr1 = [1, 2, 3];
const arr2 = arr1.map((item) => {
  const isEven = item % 2 === 0;
  return isEven ? null : item;
});

console.log(arr2); // [1, null, 3]
```

不論是 forEach、 map、filter 或其他陣列方法等等，  
一樣**只能做到第一層的淺拷貝**。

所以包含陣列或物件的內容，在 callback 裡面取出時，  
仍然是指向原本的記憶體位址，所以修改新陣列也會同時改到原本的陣列：

```js
const arr1 = [{ value: 1 }, { value: 2 }, { value: 3 }];
const arr2 = arr1.map((item) => ++item.value);

console.log(arr2); // [{value: 2}, {value: 3}, {value: 4}]
console.log(arr1); // [{value: 2}, {value: 3}, {value: 4}]
```

---

### filter（有回傳值/不會改變陣列）

類似 map，但回傳的陣列內容會是 callback 的**回傳值的判斷式結果**：

```js
const arr1 = [1, 2, 3, 4];
const arr2 = arr1.filter((item) => item > 2);

console.log(arr2); // [ 3, 4 ]
```

符合條件 `item > 2` 的元素會被留下來，最後整合出篩選過的新陣列。

---

### sort（無回傳值/會改變陣列）

callback 會有兩個參數，通常寫成 a, b 或 x, y，  
代表陣列中相鄰的兩個元素（n 與 n +1）。

回傳值代表交換位置的條件，  
負數時 a 與 b 不會交換，正數時 a 與 b 交換。  
經過多次兩兩比較後都不會交換位置時，sort 就會結束。

所以 sort 的 callback 看起來簡短到很抽象...  
但其實和 filter 類似，就是看 return 的判斷式所代表的意思：

```js
const arr1 = [4, 1, 3, 2, -5];

arr1.sort((a, b) => a - b);
// 表示 a（前項） 如果比較大就往後移

console.log(arr1); // [ -5, 1, 2, 3, 4 ]
```

秉持**正數就交換**的原則來看上面的範例，  
callback 的回傳值為 a - b，表示 a 比 b 還要大時會交換位置，  
因此經過多次的兩兩比較後，數值較大的元素會被往後排形成升冪排序。  
稍微改變回傳值的寫法就能變成降冪排序了：

```js
const arr1 = [4, 1, 3, 2, -5];

arr1.sort((a, b) => b - a);
// 表示 b（後項）如果比較大就往前移（正數就交換）

console.log(arr1); // [ 4, 3, 2, 1, -5 ]
```

只要掌握交換的原則就可以設計出計算條件來達成想要的排序效果：

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

### reduce（有回傳值/不會改變陣列）

需要取得累加的值時可以用，最後會回傳遍歷結束的累加結果。

reduce 可以帶 callback 與 initialValue 兩個參數，  
callback 裡面有固定的四個參數，依序是 `prev, curr, index, arr`，  
要注意的是 initialValue 雖然是可選的，  
但是帶不帶入會影響第一次迭代，以及迭代的總次數：

| initialValue | 有帶           | 沒帶           |
| ------------ | -------------- | -------------- |
| prev         | initialValue   | 陣列第一個元素 |
| curr         | 陣列第一個元素 | 陣列第二個元素 |
| index        | 從 0 開始      | 從 1 開始      |

差別在於從陣列的哪個元素開始當起點，沒帶的話遍歷的次數會比有帶的少一次。

```js
const arr = [1, 2, 3, 4];

// 沒帶初始值
const sum1 = arr.reduce((prev, curr, index) => {
  console.log(index); // 從 1 開始
  return prev + curr;
});

console.log(sum1); // 印出 10

// 有帶初始值 0
const sum2 = arr.reduce((prev, curr, index) => {
  console.log(index); // 從 1 開始
  return prev + curr;
}, 0);

console.log(sum2); // 印出 10
```

如果要累加物件中的某個值，這時要留意回傳值的寫法，  
回傳值本身會被當成下一次 prev 的值，所以進行完計算後，  
要再包成物件傳回去，才能讓共通邏輯可以執行：

```js
const arr = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

const sum = arr.reduce((prev, curr, index, arr) => {
  return { value: prev.value + curr.value };
});

console.log(sum); // { value: 10 }
```

---

## 參考資料

- [JavaScript Array 陣列操作方法大全 ( 含 ES6 )](https://www.oxxostudio.tw/articles/201908/js-array.html?fbclid=IwAR12g-n-YcR7KG-dgXWme9xcKCdXlBNthFFeptHjfLjK_UBEBR7WysgX9Oo#array_map)
- [JS 將陣列 Array 重新排列的 sort()](https://ithelp.ithome.com.tw/articles/10225733?fbclid=IwAR0sMRAy_sHRlwo-7pDA9xzhzSSaLPIOwzu2Luo8LQJ1xx5vB3eRExR82AU)
