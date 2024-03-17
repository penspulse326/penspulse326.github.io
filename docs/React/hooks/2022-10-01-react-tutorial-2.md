---
title: "環境架構"
description: "React 的基本架構"
date: 2022-10-01 10:43:40
keywords: [程式語言, JavaScript, React, JSX]
slug: react-tutorial-2
---

這篇會先在 CodePen 環境上使用 React，後續再說明一般如何建構 React 程式。

## 建立 Codepen 環境

開啟一個新的 Pen 之後：

1. 點擊右上角 Setting
2. 左側點選 **JS**
3. JavaScript Preprocessor 改為 Bable
4. Add External Scripts/Pens 搜尋到 **react** 與 **react-dom**
5. 一定要先加入 react 才能加入 react-dom
6. 是在最下面的 Add Packages 找到這兩個套件，以 import 的方式引入也沒問題。

要先載入 React 才能載入 React-DOM，  
這是因為 **React** 本身是核心，**React-DOM** 是基於這個核心的函式庫，  
看到 DOM 就知道它是用來操縱網頁元素的。  
（React 另有專門寫手機 App 用的 React Native，它要載入的就不是 **React-DOM** 了）

## 基本架構與 JSX

<iframe height="300" width="100%" scrolling="no" title="React 教學 - 基本架構" src="https://codepen.io/shin9626/embed/XWYKprY?default-tab=js%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shin9626/pen/XWYKprY">
  React 教學 - 基本架構</a> by SHIN (<a href="https://codepen.io/shin9626">@shin9626</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br/>
接下來都會以上面範例來解說～

### 產生畫面

```jsx
// 抓到 id = "root" 的元素
const root = createRoot(document.querySelector("#root"));
root.render("要產生的東西");
```

React 產生畫面的方式是透過 **render** 這個函式！  
就如同一般 JS 的套件，它也需要綁定到某個元素上才能執行，  
所以我們要先呼叫函式 createRoot 並代入選取到的元素再賦值給變數 root。

這時呼叫 root.render() 後就會把函式 render 裡面的參數，  
顯示在`<div id="root"></div>`這個元素裡面囉！

---

### JSX

render 的參數除了純值，傳入 HTML 標籤或元件也是合法的語法，  
不過最主要還是會傳入**元件**！

React 主要以 JSX 的方式來撰寫程式碼，因此剛接觸時看起來會有點違反過去所學的寫法！

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<h1>這就是 JSX！</h1>);
```

如上面的程式碼，直接寫入 HTML 標籤而不用包裝成字串就可以直接產生在畫面上。  
背後的原理其實跟原生 JS 要把標籤渲染到畫面上是差不多的，  
只是 JSX 因為有 bable 轉譯器幫忙（前面建立 CodePen 環境時有設置），  
所以可以直接寫標籤！

---

### 產生元件

除了 HTML 標籤，JSX 也允許我們自訂標籤，  
這是 React 接受的語法～我們自訂的標籤也被稱作**元件**（component）！

在 React 裡面元件是透過函式宣告產生的，**要注意函式名稱的開頭必須是大寫！**

```jsx
function Component() {
  return <span>這就是元件！</span>;
}
```

return 可以傳一堆 HTML 的標籤，這些標籤都可以被渲染到畫面上，  
要注意的是**這些標籤不能是同一層的幾組標籤**，  
如上面範例回傳了一組 span 標籤，但回傳兩組或以上是不合法的，  
需要一組標籤當作外容器，不需要 div 的話用空標籤也是合法的，  
空標籤不會成為 DOM 節點，也不會出現在畫面上：

```jsx
function Component() {
  return (
    <>
      <span>這就是元件！</span>
      <span>這就是元件！</span>
    </>
  );
}
```

宣告完元件之後，放到 root.render 時就可以用標籤的符號裡面寫上剛剛的函式名稱，  
這個自定義標籤的內容就可以在畫面上看到囉！

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Component></Component>);
// 用函式呼叫的方式 root.render(Component()); 給出回傳值
// 這樣也是合法的，但一般都用標籤
```

---

### 參數傳遞

input、img 這些 HTML 標籤本身沒有開閉合的格式，  
但在 JSX 裡面要寫成要加上閉合符號在後面：`<input />`，  
否則會編譯失敗，而自定義的元件標籤也可以這麼寫～  
不過在元件化的開發裡面，元件往往是層層包住的，被包住的東西是可以透過參數的方式取得的！

```jsx
function Component(props) {
  return <div>{props.children}</div>;
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Component>我是被包住的文字</Component>);
```

被 React 解析為元件的函式，預設會帶入一個 props 參數，  
假如我們在閉合標籤裡面寫入別的文字或元件，可以在函式定義裡面用 props.children 拿出來使用，  
在 JSX 裡面會用一對**大括號把 JS 的變數或程式碼框住**，  
來告訴它要把大括號裡面的值也渲染上畫面上，如上面的程式碼。

---

### 自定義屬性

標籤可以自定義，標籤的屬性也可以，並且這些屬性還能搭配大括號傳遞變數！  
經過上面幾個範例之後，我們知道 HTML 標籤在 JSX 可以被解析，所以存在變數裡面傳過去也是可以的。

```jsx
const obj = { name: "obj 的 name" };
const element = <div> 變數 element </div>;

function Component(props) {
  return (
    <div>
      {props.children}
      {props.obj.name}
      {props.element}
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <Component text="屬性 text 的文字" obj={obj} element={element}>
    我是被包住的文字
  </Component>
);
```

傳遞過去的自訂屬性，一樣可以用 props 抓出來，如上面的示範。  
要注意的是，JSX 並不是真的在寫 HTML，所以很多在 HTML 標籤上不合法的屬性，  
在實際渲染時也不會被看到，如 `data-id` 這是 HTML 支援的屬性名稱，  
但剛剛定義的 obj, element 則不是，所以在開發工具上也不會看到這些屬性名稱。

---

## 補充說明：

參數名稱、標籤屬性這些都是可以自由命名的，  
但有些命名慣例和語意化最好要遵守，比如說元件的參數會命名成 props，  
處理點擊行為的函式命名為 handleClick 等等...諸如此類，  
之前在讀書會裡面有看過其他初學者好像很容易因為這樣想破頭，無法往下了解整個流程，  
如果試著去改改看的話會發現程式其實還是能動的，參數名稱本來就是可以更改的，  
不要被命名迷惑，但是命名也不能亂寫 XD

---

## 參考資料

- [(舊) React 官方教學](https://zh-hant.reactjs.org/docs/hello-world.html)

這是 React 比較久以前的文檔，不過因為有中文而且教學詳盡，  
加上基本語法沒有多大改變，初期學習還是可以參考。
