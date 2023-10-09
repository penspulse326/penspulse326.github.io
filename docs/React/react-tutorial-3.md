---
title: "[筆記] 初學者眼中的 React (3)：Hooks 三小強"
date: 2022-10-18 21:33:41
tags:
  - React
  - 程式語言
  - 學習心得
categories: 程式學習
---

接下來要示範 React 最常用的三個 Hooks：

- useState
- useEffect
- useRef
  <!-- more -->
  <br/>

---

## State 就是一切：useState

從上一篇文章可以知道，React 會將我們寫好的 component 在指定的地方 render 出來
那麼畫面上的資料如果更動了，是誰讓它重新顯示的？

是 **_useState_**！

範例程式：
<iframe height="300" width="100%" scrolling="no" title="React 教學 - 基礎 Hook" src="https://codepen.io/shin9626/embed/MWqQBLb?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shin9626/pen/MWqQBLb">
  React 教學 - 基礎 Hook</a> by SHIN (<a href="https://codepen.io/shin9626">@shin9626</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

透過解構的語法宣告出我們要操作的變數
傳入 useState 會作為 value 的初始值可以是任何值

```JS
// React 官方規定的寫法
const [value, setValue] = useState(0);
```

使用 button 來控制計數器的行為（其他元素也可以）
這邊的 onClick 是 React 內建的監聽事件，而**_不是 JS 中的 addEventListener_**！
onClick 裡面要用 callback 的方式去執行 setValue
setValue 可以直接寫新的值，但如果需要取出原本的值，則必須用 callback 的方式取出來
監聽事件的細節比較多，可以慢慢品嘗（笑）

```JS
// onClick 的 callback 也和 addEventListener 一樣是可以取出 event 這個參數的
// 取出來的參數也一樣是被冒泡捕捉到的元素
<button onClick={() => setValue((state) => state + 1)}>加1</button>
<button onClick={() => setValue((state) => state - 1)}>減1</button>
```

---

<br/>

## 默默做事不想被看到：useRef

現在我們知道只要透過 setValue 去更改值，畫面就會更新
那麼如果有些變數不需要顯示在畫面上，或是不想要因為它的改變而重新 render
則需要 useRef 這個 hook

和 useState 一樣可以給定任何值當作初始值
但直接存取 ref 並不會得到值，必須用 ref.current

```JS
const ref = useRef(0);
ref.current++;
console.log(ref.current); // 1
```

---

<br/>

## 我 OK 您先請：useEffect

useEffect 會在第一次 render 完之後執行裡面的內容
不加入任何參數的話，每次 render 完都會再執行一遍
加入空陣列，則只會在第一次 render 時執行
陣列裡加入任何變數，代表只在該變數有變動時才執行
（亂加的話會無限執行，請細細品嘗）

常見的用法是利用它可以在特定條件執行的特性，用來 fetch 資料

```JS
// 不加入任何參數就會在每次 render 都執行
useEffect(()=>{
  console.log('看到這行代表又 render 了一次')
});

// 只會執行一次
useEffect(()=>{
  console.log('你只會在畫面第一次完時看到這行字')
},[]);

// 在不加入參數的狀態，放進 setValue 的行為
// 或是監聽錯誤的參數，就會進入無限迴圈然後爆掉
useEffect(()=>{
  setValue((state)=>state+1)
  console.log('看到這行字代表你的記憶體很快就要爆了')
},[value]);
```

---

本文的範例是參考 **_走歪的工程師 James_** 所示範的：
**_一個範例讓你搞懂 useState, useRef, useEffect_**

你可以在範例中了解到 React 基本的週期變化
由 useState 控制的值在**_重新 render 之前都不會真正改變_**
我們按按鈕只是控制它改變的時間點，真正的值會在 re-render 後顯示出來
利用這個特點，我們可以用 useRef + useEffect 去取得改變之前的值
因此在你每次按完按鈕後，可以看到加加減減之前的數值！

---

### 　參考資料

[走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)
