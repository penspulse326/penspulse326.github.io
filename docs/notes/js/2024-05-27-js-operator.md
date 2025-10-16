---
title: '運算子'
description: '運算子的觀念'
date: 2024-05-27 17:23:00
keywords: [JavaScript, 程式語言, operator, 運算子]
tags: ['筆記', 'JavaScript']
slug: js-operator
---

舉凡加減乘除、賦值、比較、++、-- 等等這些符號都被稱為**運算子**，  
要被拿來運算的值則被稱作**運算元**，這些運算規則是有優先順序的，  
所以我們寫程式時可以很自然地寫出符合數學規則的四則運算，詳細的規則可參考 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_precedence)。

因為是在**進行運算**，運算子理所當然是在執行階段才會運作的，  
包含 = 這個賦值運算子也是，這也是之前說到的「賦值不會提升」的原因哦。

## 運算順序

要被運算子拿來運算的材料被稱為**運算元**。  
由上面的 MDN 文件可以知道，各運算子摻在一起的時候，會有**優先性（Precedence）** 的規則，  
而運算子本身是依照**相依性（Associativity）**決定是從左邊開始還是右邊開始運算。

不過由右至左的運算子並不多！大部分都是跟一元運算或與賦值有關，所以不用硬記。

:::note
運算子在執行時也是一個表達式，表示運算的結果，  
如 `=` 賦值會回傳右邊的運算元，`delete` 會回傳 `true/false` 等等，  
用 Chrome 的 console 直接執行這些運算，也可以看到回傳值。
:::

---

## ++ 與 --

這兩個運算子比較特別的是會直接改變運算元本身的內容：

```js
let a = 1;
a++;

console.log(a); // 2
```

前綴與後綴的差異也很大！  
前綴可以想像是「先運算再讀取」，後綴則是反過來：

```js
let a = 1;
let b = 100;

console.log(a++); // 1
console.log(++a); // 3
console.log(a++ * b); // 300
console.log(++a * b); // 500
```

---

## 連續運算

某些運算子在連續運算時會產生一些預期外的結果，所以通常不建議這麼做，舉例：

### 1. 連續比較

```js
console.log(3 > 2 > 1); // false
```

`3 > 2` 會回傳 true，所以後面接著運算時變成 `true > 1`，運算結果就變成 false 了。  
原因在於運算子是表達式，所以產生的回傳值會直接影響連續運算的結果，  
要小心用數學算式的直覺去撰寫判斷式時容易發生錯誤。

### 2. 連續賦值

```js
let a = 1;
let b = (a = 2);

console.log(a, b); // 2 2
```

賦值運算會回傳右邊的運算元內容，因此 `a = 2` 會回傳 2，  
這個值也就接著被賦予到 b 了。

### 3. typeof

```js
console.log(typeof typeof 123); // string
```

typeof 運算子會回傳字串，字串的內容是該型別的英文命名，  
因此 `typeof 123` 回傳了一個字串 `'number'`，而 `typeof` 後面接一個字串就是 `'string'`。

---

## 參考資料

- [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
- 無痛提升 JavaScript 面試力 / 卡斯伯
  （避免導購嫌疑，故不付上任何連結，請自行搜尋本書資訊～）
