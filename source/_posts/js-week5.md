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

## for / forEach

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
它們雖然不是陣列，但通常可以透過 forEach 進行遍歷，
像是操作 DOM 元素時可能會得到的 NodeList、HTMLElement 等等。

---

## 進階陣列方法：map / filter / sort

陣列有很多內建方法，不常用的話蠻容易混淆的，
但是只要記住兩個重點後，之後在查閱想要用到方法時就會快很多：

- 這個方法有沒有回傳值？回傳值是什麼？
- 這個方法會不會更改到原本的陣列？

這篇要介紹的三個常用方法也包含這兩個特性！

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

### filter

filter 的 callback 是回傳值上寫入條件判斷式，
符合條件的元素會被留下來，最後整合出篩選過的新陣列。

```JS
const arr1 = [1, 2, 3, 4];

const arr2 = arr1.filter((item) => item > 2);

console.log(arr2); // [ 3, 4 ]

```

當然要在 callback 裡面順便做事，語法上是可以的，
只是要記得最後 return 條件判斷式，才能進行篩選。

### sort

filter 的 callback 是回傳值上寫入條件判斷式，
符合條件的元素會被留下來，最後整合出篩選過的新陣列。

```JS
const arr1 = [1, 2, 3, 4];

const arr2 = arr1.filter((item) => item > 2);

console.log(arr2); // [ 3, 4 ]

```
