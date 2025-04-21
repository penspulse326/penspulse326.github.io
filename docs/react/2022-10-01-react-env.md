---
title: "環境架構"
description: "React 的基本架構"
date: 2022-10-01 10:43:40
keywords: [程式語言, JavaScript, React, JSX]
tags: ["筆記", "React"]
slug: react-env
---

目前純 react 的環境可以直接使用 Vite 建立。
`create-react-app` 雖然停止維護了，但還是有機率碰到，  
差別在於建構工具是 Webpack。
不建議官方推薦的 `create-next-app`，  
這會建出一個 Next 專案......~~可能是 Meta 跟 Vercel 狼狽為奸的成果。~~

## SPA

原本做網頁時，只要右鍵新增資料夾，再新增 HTML, CSS, JS 檔後就大致建好環境了。

React 的專案資料夾裡會有一個 `index.html`、JS 檔和一些設定檔，  
檔案架構很不一樣，這是因為前端框架大多是 **SPA**，  
頁面會在不重新整理的狀況下改變畫面內容，  
網址看起來有改變，但實際上程式碼還在是在同一個 HTML 檔上運作，  
背後的原理也是操作 DOM 改變`index.html`，但不是跳轉到另一支 HTML 檔。

---

## createRoot

`index.html` 裡面只有一個 id 為 root 的 div，這是**程式碼的進入點**，  
React 將會抓取這個 DOM 元素，並且灌入其他 DOM，類似 `innerHTML` 改變畫面的方式：

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render("要產生的東西");
```

選取到 `id="root"` 的元素後，呼叫 `createRoot` 並傳入剛剛選取到的 div，  
回傳結果會存到變數 root。

呼叫 `root.render` 時傳入的參數內容就會顯示在`<div id="root"></div>`裡面。

---

## JSX

`createRoot` 通常只會在網頁開啟的時候執行一次，  
剛剛示範 render 的參數是傳入字串 `'要產生的東西'`，  
不過一般會傳入**React Element**。

它是一種特殊物件，最後會被轉換成 DOM 顯示在畫面上：

```jsx
const sectionElement = React.createElement(
  "section", // HTML 標籤名稱
  { id: "sectionId" }, // 標籤屬性
  childrenElement // 內層子元素，如果有多個就會一直逗號串下去
);

root.render(sectionElement);
```

這種定義方式看上去是很難好好編寫出整頁的內容結構的，  
所以 JSX 就被發明出來了，看起來很像 HTML，  
實際上是把這串像 HTML 的東西轉換成上面 `createElement` 的過程：

```jsx
const jsxElement = <h1>這就是 JSX！</h1>;

root.render(jsxElement);
```

看起來比寫一堆物件，還要同時聯想它實際上顯示的樣子友善多了吧！

瀏覽器只能解析原生 JavaScript，所以需要透過 Babel 這類的工具轉換 JSX 語法，  
Vite 等建構工具都已經處理好轉換的設定了。

---

## component

除了 HTML 標籤，JSX 也允許客製標籤元素，被稱作**元件**（component）。  
元件是透過函式宣告產生的，**函式名稱的開頭必須是大寫**，才會被 React 視作元件：

```jsx
function Component() {
  return <span>這就是元件！</span>;
}
```

元件可以由我們自行組合 HTML 的結構再回傳出來，  
要注意**這些標籤不能是同一層的數個標籤，必須包在一個標籤裡面**！

回想剛剛 `createRoot` 和 `createElement` 的過程，  
會發現產生 section 元素時，我們是把內層元素串在`children` 這個 key 上的，  
也就是 `createElement` 創造出來的元件會被轉換成一個元素包住多個內層元素：

```html
<section>
  <!-- 參數裡面帶到的子元素會被塞在這 -->
  <section></section>
</section>
```

所以如上面範例，Component 回傳了一組 span 標籤，  
但回傳 2 組同層的標籤就不符合語法。

不需要 div 的話用空標籤或是 `<Fragment>` 也是合法的，  
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

function FragmentComponent() {
  return (
    <Fragment>
      <span>這就是元件！</span>
      <span>這就是元件！</span>
    </Fragment>
  );
}
```

定義完元件之後，放到 `root.render` 時就可以寫成標籤，  
元件的內容就可以在畫面上看到：

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Component />);
```

---

## props

元件是透過 function 宣告建立的，所以能定義參數，  
被 React 解析成元件的函式都會自帶一個參數 `props`。

JSX 和 HTML 標籤一樣是都是標籤結構，可以包住文字、其他標籤或元件，  
被包住的東西可以在 `props` 裡面用 `children` 取出來：

```jsx
function Component(props) {
  return <div>{props.children}</div>; // <div>我是被包住的文字</div>
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Component>我是被包住的文字</Component>);
```

如上面範例，在閉合標籤裡面的`'我是被包住的文字'`可以透過 `props.children` 取出，  
並渲染在 div 裡面。

自定義其他屬性也能傳入任何東西，到子層再透過 props 取出來，  
在 JSX 裡面就像是寫 HTML 那樣，用屬性名稱和大括號就能傳入變數：

```jsx
function Component(props) {
  return (
    <div>
      {/* 我是被包住的文字 */}
      {props.children}
      {/* obj 的 name */}
      {props.obj.name}
      {/* <div>我是 div</div> */}
      {props.element}
      {/* 屬性 text 的文字 */}
      {props.text}
    </div>
  );
}

const obj = { name: "obj 的 name" };
const element = <div>我是 div</div>;
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Component text="屬性 text 的文字" obj={obj} element={element}>
    我是被包住的文字
  </Component>
);
```

Component 標籤寫上 `text`、`obj`、`element` 屬性後，  
在 Component 的定義裡面可以自行決定怎麼使用這些屬性。

---

## coding style

雖然範例都很簡短，不過有蠻多撰寫慣例要遵守，  
像是 `onClick` 的內容最好可以拉出來宣告，才不致於讓 JSX 的內容變得很冗長，  
與互動事件有關的函式，命名也會以 handle 開頭，表示要處理特定事件，  
例如 `handleClick`, `handleChange`, `handleFocus` 等：

```jsx
function handleClickAddBtn() {
  // 要做的事...
}

return (
  <button type="button" onClick={handleClickAddBtn}>
    加 1
  </button>
);
```

有傳入屬性時也會建議把 props 解構：

```jsx
function Component({ name, id, time }) {
  //...
}
```

---

## 參考資料

- [JSX 根本就不是在 JavaScript 中寫 HTML](https://ithelp.ithome.com.tw/articles/10296066)
