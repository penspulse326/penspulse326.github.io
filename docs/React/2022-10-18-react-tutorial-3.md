---
title: "[筆記] React 基礎 Hooks"
description: "React 的 Hooks"
date: 2022-10-18 21:33:41
keywords: [程式語言, JavaScript, React, JSX, Hooks]
slug: react-tutorial-3
---

接下來要示範 React 最常用的三個 Hooks，後續會再補充一些詳細觀念：

- useState
- useEffect
- useRef

在開始之前，可以試著回想看看，用原生 JS 寫 todo-list，  
大概會有什麼步驟呢？

1. 可能會有 input、button、ul 三個標籤
2. 監聽 button 點擊事件（或按下 Enter 事件）
3. 點擊後把 input 的內容抓出來存到一個陣列
4. 利用陣列方法產生一串 HTML 字串
5. 把剛剛產生的字串賦值到 ul 的 innerHTML

這些步驟看起來沒有很複雜對吧？
但是一般網站規模不會只有 todo-list 這麼一塊地方需要寫邏輯，  
而且頁面更多，所以要呈現的資料也會更複雜，這時原生 JS 的程式碼就會開始變得混亂，  
利用 React、Vue 等等的前端框架就可以更簡潔地處理這些畫面渲染的邏輯。

## 中心思想：State

讓使用者感覺到有「互動」，是因為畫面上的東西改變了，  
原因來自於我們剛剛透過 innerHTML 賦值的行為，  
那麼我們又是如何決定什麼時候要改變畫面的？

是「**狀態**」，也就是所有 React 教學都會強調的！  

具體來說我們可以自己決定是以「誰的狀態」為主，  
以剛剛的 todo-list 為例，我們是在 input 的值存進陣列後重新渲染畫面的，  
所以這個陣列變數就是我們要觀察的**狀態**，  
因為狀態改變（陣列的內容改變）所以就渲染新的畫面。

React 大致上是圍繞這個概念～
所以出 bug 的第一步通常也是去追溯是哪個東西的狀態有問題！  

---

## 範例程式

<iframe height="300" width="100%" scrolling="no" title="React 教學 - 基礎 Hook" src="https://codepen.io/shin9626/embed/MWqQBLb?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shin9626/pen/MWqQBLb">
  React 教學 - 基礎 Hook</a> by SHIN (<a href="https://codepen.io/shin9626">@shin9626</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br/>
<br/>

本文的範例是參考 **_走歪的工程師 James_** 所示範的：**_一個範例讓你搞懂 useState, useRef, useEffect_**

---

## The First Hook：useState

從上一篇筆記寫到 React 會將我們寫好的 component，  
在指定的地方用 render 函式出來，不過通常 render 函式是初始化網頁時做的事，  
主要把我們寫好的許多元件做成一包叫做 `<App />`渲染出來，所以 render 函式也只會執行一次，  
接下來重新渲染畫面的工作都會交給 React 的內建函式來決定，也就是所謂的 hooks！   
~~（不要問我為什麼一定要叫做 `<App />`）~~  

接下來都會以上面的範例為主來解說～  
原本我們用來儲存變數的方法，現在要改為用 useState 的方法來管理變數：

```jsx
// React 官方規定的寫法
const [value, setValue] = useState(0);
```

透過解構的語法宣告出我們要操作的變數，  
呼叫 useState 時需要傳入一個值作為 value 的初始值。

然後就跟剛剛在做 todo-list 時一樣，我們需要監聽某個元素當作觸發點，  
這邊使用 button 來實作計數器的行為。  
（其他元素也可以~~爽就好~~，但我喜歡用 button）

```jsx
<button onClick={() => setValue((state) => state + 1)}>加1</button>
<button onClick={() => setValue((state) => state - 1)}>減1</button>
// onClick 的 callback 也和 addEventListener 一樣是可以取出 event 這個參數的
```

要特別注意這邊的 onClick 是 React 封裝好的監聽事件，而**_不是 JS 中的 addEventListener_**！

onClick 裡面要用 callback 的方式去執行 setValue 或是其他函式，  
原因是因為直接執行函式會產生兩個問題：

1. 沒辦法捕捉 e.target，它跟 addEventListener 還是依靠 callback 預設的參數來捕捉 DOM 的，  
所以一般會希望寫成`onClick={(e) => handleClick(e)}`，這樣也能把 e 傳下去。
2. 函式會在重新渲染時就馬上執行，而不是等到 click 事件觸發後。

而 setValue 可以直接寫新的值，如 `setValue(123)`，  
但如果需要取出原本的值加以計算，則必須用 callback 的方式取出來，
如`setValue(prev => prev * 2)`。

---

## 不想被看到：useRef

現在我們知道只要透過 setValue 去更改值，畫面就會更新，  
那麼如果有些變數不需要顯示在畫面上，或是不想要因為它的改變而觸發重新 render，  
則需要 useRef 這個 hook：

```jsx
const ref = useRef(0);
ref.current++;
console.log(ref.current); // 1
```

和 useState 一樣可以給定任何值當作初始值，  
但直接存取 ref 並不會得到值，必須用 ref.current。  

useRef 還有一個非常重要的功能，就是**綁定 DOM**，  
因為配合某些套件使用時，可能會遇到**重新建立元件而不是重新渲染**的狀況，  
這時候如果直接用 querySelector 指向 DOM 元素做一些設定，  
在重新建立元件後，剛剛取到的 DOM 的狀態就不會保留，  
這時候就會需要利用 ref 去綁定指定位置的元素：`<div ref={ref}></div>`。  

雖然有點抽象，但要記得在 React 裡面盡量不要直接操作 DOM，  
如果有必要就使用 ref。

---

## 等等再做：useEffect

useEffect 會在 render 完之後執行裡面的內容。  

useEffect 的第二個參數是可選的，稱為 dependency，  
不加入任何參數的話，每次 render 完都會再執行一遍，  
加入空陣列，則只會在第一次 render 時執行，  
陣列裡加入任何變數，代表只在該變數有變動時才執行。

亂加 dependency 會造成無窮迴圈，比如：

```jsx
useEffect(() => {
  console.log("看到這行代表又 render 了一次");
});
// 不加入任何參數就會在每次 render 都執行

useEffect(() => {
  console.log("你只會在畫面第一次完時看到這行字");
}, []);
// 只會執行一次

useEffect(() => {
  setValue((state) => state + 1);
  console.log("看到這行字代表你的記憶體很快就要爆了");
}, [value]);

// 在不加入參數的狀態，放進 setValue 的行為
// 或是監聽錯誤的參數，就會進入無限迴圈然後爆掉
```

上面的範例是讓 value 作為 dependency，只要有改變就執行 callback，  
而 callback 的內容又因為執行了 setValue，所以會再重新渲染一次並得到一個新的 value，  
因為 value 改變了所以又觸發一次 callback......就爆掉了！

常見的用法是利用它可以在特定條件執行的特性，進行網路請求 fetch 資料，  
比如初始化時元件先渲染出來，useEffect 此時可以設定要發出網路請求，  
並且在收到 response 後，利用 setXXX 更新資料並重新渲染，  
重新渲染後畫面也可以把剛剛網路請求拿到的資料顯示再畫面上了。

```jsx
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(result => setData(result.data)) // 在成功拿到資料後存到本地端
      .catch(err => console.error(err));
  }, [])
  // 初始化只會執行一次，所以 dependency 用空陣列
```

---

### 參考資料

- [走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)
- [使用 ref 操作 DOM](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs)
