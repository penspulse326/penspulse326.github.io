---
title: "[筆記] JavaScript 的宣告與型別問題"
date: 2023-08-30 13:54:38
tags:
  - JavaScript
  - 程式語言
categories: 程式學習
---

早期的 JavaScript 只有 var 這個宣告方式，加上語言是弱型別的緣故，
變數內容的變化經常會讓其他語言的學習者在開始學習 JavaScript 時產生許多問號 XD
不過只要記住一些細微的差異就沒問題了，畢竟大部分的問題都會從 console 報錯提示得到解答！

<!-- more -->

## 老人特權：var

作為早期的宣告方式，var 相比 let、const 有一些特權：

1. var 宣告的變數可以重複宣告不會報錯
2. var 的作用域以函式區隔而非區塊（大括號）

關於 1. 真的是見鬼了吧...沒錯，只有 var 可以做這種事，let 與 const 都會被報錯提示擋下來

關於 2. 在透過迴圈示範後會比較清楚：

```JS
function add() {
    let a = 0;

    for(var i = 0; i < 3 ; i++) {
        setTimeout(() => {
            a += i;
        },100)
    }

    setTimeout(() => console.log(a) ,1000)
}

add(); // 印出的 a 是 9
```

是不是覺得見鬼了呢...a 應該要是 0 + 1 + 2 = 3 吧？
在這個迴圈裡面如果沒有使用 setTimeout 的話，確實 a 最後是 3，
因為每次迭代的同時當下的 i 已經與 a 完成運算並賦值給 a。
但在有 setTimeout 這類非同步的函式影響後，裡面的程式碼會依照設定的時間在佇列排好執行順序。

用 var 宣告的 i 此時就已經完成迴圈的迭代了，離開迴圈時 i 為 3，
再執行佇列排定的三個 setTimeout 裡面的 a += i 就會變成 9。

用 let 宣告 i 的話就可以跑出預期中的 3，就是因為 var 與其他宣告方式的作用域不同，
**對 var i 而言它的作用域是 add 這個函式且是函式內的變數，而不是這個迴圈，**
所以在迴圈結束後是可以用 console 查看到 i 的值。

![var 迭代](https://drive.google.com/uc?export=view&id=1Tu1BBCpXOFDepha81CThqcx7IkPL6icH)

但對 let 而言，它只存活在一個迭代，迭代就是一個由大括號包起來的作用域，
所以 setTimeout 要回來找 i 的時候只會找到留在那一次迭代裡 i 的值，
當然迴圈結束後也不會找到 i，會報錯 is not difined。

因為使用 var 經常會因為作用域的問題造成污染、取錯值等等，
現今大多使用 let 與 const 來明確定義變數作用的區間了！

大括號除了函式與迴圈，也包含 if 等等的條件判斷，
因此你可以想像在這些判斷區間裡面如果用 var 宣告東西可能會出大事的原因了。

---

## 不能不說：const

const 在宣告之後就必須賦值，否則會報錯，而且宣告後不能重新賦值（更改內容），一樣也會報錯。
但 var 與 let 是可以宣告但不賦值，此時讀到的內容是 undefined。

---

## 型別果汁機：不同型別互尬

string 的 + 是拼接的意思，因此 number、null、undefined、NaN 都會被當成 string，
變成"null"、"undefined"、"NaN" 再被拼接～

減乘除只能做用在 number，因此有 string 或其他型別互相運算，會強制把大家轉為 number 再運算，
如果 string 內容是中英文等等而不是數字，就無法被轉換成 number 型別，會顯示 NaN，運算結果也是 NaN。

特別注意 null 常被當成變數宣告時可以賦予的空值，但在數字運算上會被當作 0，
但是 undefined 是無法做任何運算的，會被當成 NaN。

（可以用 Number() 看看任何值被轉成 number 時會變成什麼）

所以規則大略可以整理成：

- string 加 任何東西 = string
- string 減乘除 任何東西 = 減乘除會把兩邊運算元強制轉為 number，不能轉成數字的東西會變成 NaN
- null 運算時當作 0
- undefined 運算時當作 NaN

---

## 型別大爆炸：特別案例

最後關於原始型別有一些特別的情況要注意：

1. NaN === NaN 是 false
2. typeof null 是 object

關於 1. 是因為 JavaScript 的規範上 NaN 不等於任何東西，也包含它自己，
所以某些情況要驗證是否為 NaN 時就沒辦法直接用 boolean 判斷來得到 true or false，
只能透過 isNaN() 或 Number.isNaN() 這兩個函式來檢查！

```JS
console.log(NaN === NaN); // false
console.log(isNaN(NaN));  // true
```

關於 2.據說是 JavaScript 開發初期留下的 bug，
因此如今進行改動將會造成生態浩劫（？）
所以 typeof null === "object" 也就成為絕無僅有的例外了！
