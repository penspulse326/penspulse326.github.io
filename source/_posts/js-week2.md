---
title: "[筆記] JavaScript 的條件判斷"
date: 2023-09-01 09:59:29
tags:
  - JavaScript
  - 程式語言
categories: 程式學習
---

條件判斷有 if-else、switch、三元運算、短路等等...
各自有特別之處與使用時機，以下是大略整理。

<!-- more -->

## 如果有一天我切換到從前：if / switch

大部分都會探討到兩者的可讀性，但其實還是要看當下要判別的 case 們做決定！
尤其是要注意條件判斷寫在哪的問題。

if-else 是依照判斷式的成立與否決定要不要執行，
也就是説判斷完最後會得到 true / false。

```JS
if(/*這裡通常會是 boolean 值*/){
    // true 或 false 的做這裡的事
}
```

當然這也經常用在判定某些變數、物件存不存在，
此時就會在判斷式裡面直接寫上變數名稱，因為某些特定的值是會直接判定 false 的。

- undefined
- 0
- ""
- null
- NaN

這些在 if 裡面都被視為 false，
如果不是這些值，就是為 true。

如下面範例，可以判斷伺服器是否有傳回來的訊息。

```JS
const message = getServerData();

if(message){
    // 有訊息時就做這邊的事
} else {
    // 訊息有可能不存在，會是 undefined、null 等等的值
    // 因此會判定為 false 然後做這邊的事
}
```

而 switch 容易被誤解的地方，是**它的 case 判斷和 if 不一樣**，

```JS
let wallet = 1000;

switch(wallet) {
    case (wallet > 100) :
        console.log('因為錢就是我快樂的泉源');
        break;
    case (wallet > 100) :
        console.log('給我一瓶酒再給我一支菸');
        break;
    default:
        console.log('把愛勇氣希望都賣了能換來多少錢');
}

// 會印出 '把愛勇氣希望都賣了能換來多少錢'
```

直覺上好像會認為 wallet > 100 是成立的，
為何最後印出的是 default case 呢？！
**在 switch 裡面並不會像 if 一樣自動把傳入的值轉為 true or false 來比較**，
而是拿傳入的值和 case 的值比較。

因此在 wallet > 100 這個 case 雖然得到 true，
但 true !== 500 （wallet 的 500）。
要使這個判斷成功的話只要把 switch(wallet) 改成 switch(true)即可。

因為判斷方法的不同，所以自然產生使用時機的差異。

if 在需要同時判斷多個條件或變數範圍，或是有一些明確的特定條件可以利用 early return 跳脫判斷時，
用 if-else 可能會是比較好讀的！

switch 則在型別和 case 都知道、或是有非常多同類型的 case 需要列舉判斷的時候，
會比較好讀，也可以避免太多的巢狀結構。

---

## 五元朝氣、三元運算

抱歉講了個武俠爛梗...

三元運算可以濃縮在只有 true or false 的情況下，
if-else 的一些寫法。

而三元運算的判斷也和 if-else 一樣，
某些值會被直接判定為 false。

```JS

function getData(){
    //...
}

// 三元運算的寫法
let result1 = getData ? "有資料" : "沒資料";
console.log(result);

// if else 的寫法
let result2 = null;
if(getData) {
    result = "有資料";
} else {
    result = "沒資料";
}
```

雖然三元運算會回傳值，但在不需要接收回傳值的情況下，
也可以像 if-else 一樣寫一些程式碼進去讓它執行，
不過如果要執行的東西比較多的話，就要包成函式去執行，不然還是用 if-else 區隔出一個空間來撰寫吧，
不要犧牲可讀性折磨未來的自己（和別人）XD。

```JS
let message = "";

message ? console.log("有訊息") : console.log("沒訊息")

// 空字串判定為 false 因此會印出 "沒訊息"
```

---

## 短路就是走捷徑

以前的理化課應該都會教到電路短路的問題，
在程式碼裡面其實也可以利用邏輯判斷的方式簡單快速地生成想要的值！

在 OR 運算裡成立的那一邊（有值的那一邊）就會成為最後的回傳值，
但如果兩邊都成立，就會先回傳前面的那個值。
下面範例是假設執行 getData() 會得到一個陣列資料，
如果沒有 get 到資料就賦予一個空陣列給 data。

```JS
let data = getData() || [];

// 假設 getData 會回傳陣列或 null
// 用 || 可以進行判斷後再賦予值
```

而在 AND 運算裡必須要兩邊成立才會回傳值，回傳的是後面的值。
若不成立的話會回傳第一個不成立的值，如果是 null 就會回傳 null，
undefined 回傳 undefined 等等，以此列推。

```JS
const nullData = null;
let state = nullData && "有東西";

// state 的值是 null
```

當然短路和三元運算值一樣，也可以寫入一些可執行的程式碼或函式。

最後要注意如果同時有 AND 與 OR 的比較，AND 會優先執行！

---

### 參考資料

- [IF ELSE 與 SWITCH CASE 的比較](https://jameshsu0407.github.io/blog/20211023_if-else_switch-case/)
- [三元運算子（Ternary Operator）和布林值混用的簡化方法](https://medium.com/@yuhsienyeh/%E4%B8%89%E5%85%83%E9%81%8B%E7%AE%97%E5%AD%90-ternary-operator-%E5%92%8C%E5%B8%83%E6%9E%97%E5%80%BC%E6%B7%B7%E7%94%A8%E7%9A%84%E7%B0%A1%E5%8C%96%E6%96%B9%E6%B3%95-6bb70375fd65)
- [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
