---
title: "[筆記] JavaScript 的遍歷"
date: 2023-09-14 16:16:24
tags:
  - JavaScript
  - 程式語言
  - 函式
categories: 程式學習
---

迴圈和遍歷是相關的概念，除了常見的 for、while 之外，
JS 的陣列與物件也有專屬的類似迴圈的方式，
一樣都能將重複的程式碼封裝起來。

<!-- more -->

## for 家族

### 原始的 for

for 是許多語言都有的迴圈語法，所以不限於陣列或哪種形式的做使用，
只要是單一重複的工作都可以利用 for 完成，
只要注意迴圈的終止條件就不要寫錯造成無限迴圈。

```JS

let numStr = "0";

for(let i = 1; i < 10 ; i++) {
    numStr += i;
}

console.log(numStr); // "0123456789"
```

### for in / for of

這兩個方法是 for 的親戚，差別就在於不需要寫條件式，
in 可以抓出索引值，而 of 可以抓出 value。

```JS
const arr = ["a", "b", "c", "d"];

for(const index in arr) {
  console.log(`索引 ${index}`);
}

for(const value of arr) {
  console.log(`值 ${value}`);
}
```

---

### forEach

forEach 則必須接在陣列後面才能做使用，
而 forEach 本身是沒有條件式的，它會在訪問所有的元素後終止。

forEach 的 callback 可以帶入三個參數：元素本身（必填）、元素的索引（選填）、元素的整個陣列（選填）。

```JS
let numArray = [1, 2, 3, 4];

numArray.forEach((item, index, arr)=>{
    console.log("目前元素索引:",index);
    console.log("目前元素內容:",item);
    console.log("目前陣列:",arr);
})
```

要特別注意 JS 中有類似陣列的資料結構，**稱作 array-like objects**，
它們雖然不是陣列，但通常也可以透過 forEach 進行遍歷，
像是操作 DOM 元素時可能會得到的 NodeList、HTMLElement 等等。

---

## 進階陣列方法：map / filter / sort

陣列有很多內建方法，不常用的話蠻容易混淆的，
但是只要記住兩個重點後，之後在查閱想要用到方法時就會快很多：

- 這個方法有沒有回傳值？回傳值是什麼？
- 這個方法會不會更改到原本的陣列？

這篇要介紹的三個常用方法也包含這兩個特性！

---

### map

（這邊的 map 不是資料結構中的 map 而是陣列方法 map）

map 的 callback 和 forEach 一樣，可以帶入三個參數，
但是 map 會回傳一個新的陣列，所以要保留結果的話要另外宣告變數來儲存。

```JS
const arr1 = [ 1, 2, 3 ];

const arr2 = arr1.map((item) => ++item);

console.log(arr2); // [2, 3, 4]
```

callback 裡面也可以寫入一些程式碼做事而不是像範例這樣直接回傳值，
只要確定好最後 return 的東西是要放到新陣列的就可以了。

要注意的是之前提到過的拷貝問題，諸如上面提到的 forEach，
或是這次要介紹的 map、filter 等等，一樣只能做到第一層的獨立，
如果是包含陣列或物件之類的內容，在 map 的 callback 裡面抓出來後，
仍然是指向原本陣列的，所以修改新陣列也會同時改到原本的陣列。（淺拷貝）

```JS
const arr1 = [{value: 1}, {value: 2}, {value: 3}];

const arr2 = arr1.map((item) => ++item.value);

console.log(arr2); // [{value: 2}, {value: 3}, {value: 4}]
console.log(arr1); // [{value: 2}, {value: 3}, {value: 4}]
```

---

### filter

filter 的 callback 是回**傳值上寫入條件判斷式**，
符合條件的元素會被留下來，最後整合出篩選過的新陣列。

```JS
const arr1 = [1, 2, 3, 4];

const arr2 = arr1.filter((item) => item > 2);

console.log(arr2); // [ 3, 4 ]

```

當然要在 callback 裡面順便做事，語法上也是可以的，
只是要記得最後 return 條件判斷式，才能進行篩選。

---

### sort

sort 是一個很精妙的方法...我也不是很熟悉它的條件式 XD
要特別注意的是，它會**更動原來的陣列**。

sort 的 callback 會有兩個參數，通常寫成 a, b 或 x, y，
代表陣列中相鄰的兩個元素（n 與 n +1）。

而回傳值則代表之後的排序行為，
回傳值是負數時 a 與 b 不會交換，
回傳值是正數時 a 與 b 交換位置。
經過多次的當兩兩比較後都不會交換位置時，sort 就完成排序。

依照這個特性，可以利用**純值的比較**寫出簡潔的語法，
所以有時候 sort 的 callback 看起來還蠻抽象的...
但其實就是和回傳值有關係！

```JS
const arr1 = [4, 1, 3, 2 , -5];

arr1.sort((a, b) => a - b);
// 表示 a（前項） 如果比較大就往後移

console.log(arr1); // [ -5, 1, 2, 3, 4 ]

```

秉持**正數交換**的原則來看上面的範例，
callback 的回傳值為 a - b，
表示 a 比 b 還要大時會交換位置，
因此經過多次的兩兩比較後，數值較大的元素會被往後排形成升冪排序。

稍微改變回傳值的寫法就能變成降冪排序了！

```JS
const arr1 = [4, 1, 3, 2 , -5];

arr1.sort((a, b) => b - a);
// 表示 b（後項）如果比較大就往前移（因為正數交換原則）

console.log(arr1); // [ 4, 3, 2, 1, -5 ]
```

只要掌握交換的原則就可以設計出一些純值計算的條件達成想要的排序效果了。

```JS
const objArray = [
  {name: "Cindy", money: 300},
  {name: "Bob", money: 100},
  {name: "Ann", money: 600},
]

objArray.sort((a, b) => a.money - b.money)
// money 越多就往後排

console.log(objArray); // 順序變成 Bob, Cindy, Ann

objArray.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
// 利用 charCode 來照字首排序

console.log(objArray); // 順序變成 Ann, Bob, Cindy,
```

---

## 物件的遍歷

物件沒有陣列的特性，所以上面提到的 for 與 forEach，
沒辦法直接套用在物件身上。

不過物件還是有很多遍歷的方式，可以抓出所有的 key 與 value。

### 沒有回傳值的 for in

上面提到 for 的親戚，可以利用 for in 語法來抓出物件的 key 值，
但也只能抓出 key 值，for of 就不能抓出物件的 value 了（會報錯）。

```JS
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

for(const value if obj) {
  console.log(key);
}
```

### 有回傳值的內建方法 Object

物件可以透過內建方法來遍歷內容，
同時它們也會回傳一個陣列，所以可以宣告變數去儲存結果。

Object.keys、Object.values 就不用多說了吧！
名符其實，看得出來這是會產生所有 key 與 value 的方法，
參數是要遍歷的物件。

```JS
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

console.log(Object.keys(obj)); // [a, b, c]
console.log(Object.values(obj));  // [1, 2, 3]
```

Object.entries 也會產生陣列，
陣列的內容則是一個小的陣列，包含一組 key 與 value。

```JS
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]
```

因為透過 Object 內建方法會產生陣列，
這時 forEach 之類的陣列方法就可以使用在它們身上了。

```JS
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

console.log(Object.entries(obj).filter(item => item[1] > 1));
```

注意 entries 產生的陣列內容是小陣列，因此 filter 這類的方法，
callback 的參數 item 就是小陣列，要加上索引才能拿到值，
或是可以直接用陣列解構成可讀的寫法：

```JS
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

console.log(Object.entries(obj).filter(([key, value]) => value > 1));
```
