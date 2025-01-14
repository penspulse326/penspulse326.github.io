---
title: "環境架構"
description: "React 的基本架構"
date: 2022-10-01 10:43:40
keywords: [程式語言, JavaScript, React, JSX]
slug: react-env
---

Vite 直接建好 React 的環境就好，別相信 react.dev 的鬼話去裝 `create-next-app`（？

## SPA 的環境

React 專案資料夾裡會有一個 index.html 和一些設定檔，跟初學時做網頁的結構很不一樣，  
原本只要右鍵新增資料夾，再新增 html 檔後載入 css、js 檔，這樣就大致建好環境了。

這是因為前端框架大多是 **SPA** 的架構，頁面可以在不重整（閃爍）的狀況下改變內容，  
雖然網址看起來有改變，實際上程式碼還在是在同一個 html 檔案上運作，  
而這個內容置換的過程是透過 JavaScript 操作 DOM 改變`index.html`的內容。

---

## createRoot

`index.html` 裡面只有一個 div，id 為 "root"，這是**程式碼的進入點**，  
React 將會抓取這個 DOM 元素，並且灌入其他 DOM，就如同直接使用 innerHTML 改變畫面：

```jsx
const root = React.createRoot(document.querySelector("#root"));
root.render("要產生的東西");
```

產生畫面的方式是透過 **render** 這個函式，選取到 `id="root"` 的 div 元素後，  
呼叫 `React.createRoot` 並傳入剛剛選取到的 div 存到變數 root，  
再呼叫 `root.render` 後就會把參數內容顯示在`<div id="root"></div>`裡面了。

---

## JSX

createRoot 一般來說只會在網頁開啟的時候執行一次，  
剛剛示範 render 的參數可以雖然傳入字串，  
不過主要還是會傳入**React Element**，它是一種特別的物件，  
最後會被轉換成 DOM 顯示在畫面上：

```jsx
const sectionElement = React.createElement(
  "section", // HTML 標籤名稱
  { id: "section" }, // 標籤屬性
  childrenElement // 子元素，如果有多個就會一直逗號串下去
);

root.render(inputElement);
```

整頁的元素不可能只有這樣，這種定義方式看上去也很難繼續編寫出整頁的內容結構，  
所以 JSX 就被發明出來了，看起來很像 HTML，實際上就是把這串像 HTML 的程式碼，  
轉換成上面 createElement 的過程：

```jsx
const jsxElement = <h1>這就是 JSX！</h1>;

root.render(jsxElement);
```

看起來比寫一堆物件，還要同時聯想它實際上渲染的樣子友善多了吧！

JSX 本身並不是瀏覽器接受的原生 JavaScript 程式碼，  
所以需要透過 babel 這類的工具作轉換，  
一般 `create-react-app` 或 Vite 等建構工具都已經處理好 babel 的轉換了。

---

## Component

除了 HTML 標籤，JSX 也允許客製標籤元素，被稱作**元件**（component）。  
元件是透過函式宣告產生的，**函式名稱的開頭必須是大寫**，才會被 React 視作元件：

```jsx
function Component() {
  return <span>這就是元件！</span>;
}
```

元件可以由我們自行組合 HTML 的結構 return 渲染出來，  
要注意**這些標籤不能是同一層的幾組標籤**！

回想剛剛 **createRoot** 和 **createElement** 的過程，  
會發現產生 section 元素時，我們是把子元素串在參數上的，  
也就是說它的語法會被轉換成一個父元素再組合多個子元素：

```html
<section>
  <!-- 參數裡面帶到的子元素會被塞在這 -->
  <section></section>
</section>
```

所以如上面範例，Component 回傳了一組 span 標籤，但回傳兩組或以上就不符合語法，  
需要一組標籤當作父元素，不需要 div 的話用空標籤或是 `<Fragment>` 也是合法的，  
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

定義完元件之後，放到 root.render 時就可以用標籤的方式，  
自定義標籤的內容就可以在畫面上看到：

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Component></Component>);
```

---

## Props

元件是透過 function 宣告建立的，那麼當然可以傳入參數，  
被 React 解析成元件的函式都會自帶一個參數 `props`。

自訂標籤和 HTML 標籤一樣是都是標籤結構，  
所以裡面可以包住文字、其他標籤或元件，  
被包住的東西可以在 `props` 裡面用 `children` 取出來：

```jsx
function Component(props) {
  return <div>{props.children}</div>;
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Component>我是被包住的文字</Component>);
```

如上面範例，在閉合標籤裡面的 '**我是被包住的文字**' 就可以透過 `props.children` 取出，  
並渲染在 div 裡面，但在定義 Component 時如果沒有把 `props.children` 寫進 return 裡面，  
就代表僅僅只是在 `<Component>我是被包住的文字</Component>` 這邊傳入字串，  
但是不會渲染出來。

---

## Property

在前面 createElement 的示範裡面，有用物件的方式定義 id 這個屬性，  
要自定義其他屬性也是可以的，也能傳入任何東西，這些屬性透過 props 取出來，
在 JSX 裡面的寫法就會像是寫 HTML 那樣，用屬性名稱和大括號就能傳入變數：

```jsx
const obj = { name: "obj 的 name" };
const element = <div>我是 div</div>;

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

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <Component text="屬性 text 的文字" obj={obj} element={element}>
    我是被包住的文字
  </Component>
);
```

Component 標籤寫上 text、obj、element 三個屬性後，  
在 Component 元件的定義裡面可以自行決定怎麼使用這些屬性。

---

## Codin Style

雖然上面的範例都很簡短，不過其實有蠻多撰寫的慣例要遵守，  
像是 onClick 的內容最好可以拉出來宣告，才不致於讓 JSX 的內容變得很冗長，  
通常與互動事件有關的函式，命名也會以 handle 開頭，表示要處理特定事件，  
例如 handleClick、handleChange、handleFocus 等：

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

傳入的屬性也會建議直接把 props 解構：

```jsx
function Component({ name, id, time }) {
  //...
}
```

## 總結

- SPA 可以在不重整頁面的情況下把整頁的內容置換掉
- JSX 是透過類似 HTML 標籤的方式組織畫面的語法
- createRoot 只會執行一次，通常會先載入 `<App />` 這個元件
- 元件是透過 function 宣告定義出來的，可以互相組合與傳遞參數
- 留意程式碼的撰寫方式

---

## 參考資料

- [JSX 根本就不是在 JavaScript 中寫 HTML](https://ithelp.ithome.com.tw/articles/10296066)
