---
title: "useState"
description: "useState 的用法"
date: 2022-10-18 21:33:41
keywords: [程式語言, JavaScript, React, JSX, Hooks, useState]
tags: ["筆記", "React"]
slug: react-use-state
---

用原生 JS 寫 todo list 大概會有什麼步驟呢？

1. 可能有 input, button, ul 這些標籤
2. 監聽 button 的 click、submit 或 input 的 change 的事件
3. 事件觸發後把 input 的內容存起來
4. 產生一串 HTML 字串並塞入剛剛 input 的內容
5. 將剛剛產生的字串賦值到 ul 的 innerHTML

步驟看來不多，但規模擴大到整個網站的功能後，程式碼就會開始變得混亂，  
利用 react、bue 等的框架就可以更簡潔地處理這些事件邏輯。

## state

使用者感覺到「互動」是因為透過自己的行為操作使畫面內容改變了。

背後就是利用程式碼改變 DOM，這代表「互動」可能令某些資料改變，  
例如按下 enter 會跳出搜尋結果，左鍵點擊表格會展開細項等，  
因此畫面需要更新出對應的內容。

資料的變動，就是資料本身「**狀態**」的改變。

我們可以自己決定要觀察什麼資料的「狀態」，  
以剛剛的 todo list 為例，在 input 的值存進陣列後產生新的列表，  
這個陣列就是我們要觀察的資料，陣列的內容被改變了，因此產生新的畫面。

react 的運作大致上是圍繞這樣的狀態變化機制，  
出 bug 的第一步通常也是去追溯是哪個東西的狀態有問題！

---

## 用法

一般專案建好後都會預設把許多元件集合成一包叫做 `<App/>`的元件，  
再用 `root.render` 渲染出來，這個動作通常只會在進入網站後執行一次。

之後畫面內容的更新工作會交給 react 的內建機制來決定，也就是 `useState`，  
原本變數宣告完可以直接存取，現在改為用 `useState` 的方法來管理變數，  
只要任一元件有用到 `useState`，那麼 state 的內容改變了，元件就會重新渲染：

```jsx
const [value, setValue] = useState(0);
```

透過解構語法來宣告要操作的變數，呼叫 `useState` 時要傳入一個值，  
作為 `value` 的初始值，之後跟剛剛在模擬 todo list 的步驟一樣，  
需要監聽某個元素當作觸發點，這邊使用 button 來實作計數器的行為：

```jsx
<button
  type="button"
  onClick={() => setValue((state) => state + 1)}
>
  加1
</button>

<button
  type="button"
  onClick={() => setValue((state) => state - 1)}
>
  減1
</button>
```

注意這邊的 `onClick` 是 react 封裝好的監聽方式，  
而**不是 JS 中的 `addEventListener`** 或是 HTML 的 `onclick`！

`onClick` 或是其他事件，裡面預設是一個 callback，  
和 `addEventListener` 一樣可以拿到 event 參數，  
所以不能直接執行函式 `onClick={setValue(state => state + 1)}`，  
必須透過像上面 button 的範例 callback 的寫法，  
`onClick={() => setValue((state) => state - 1)`才能正確執行 setValue。

---

## 表達式

JSX 中任何跟變數有關的東西都要用大括號包住，內容會是一個表達式，  
大括號主要用來傳遞變數、元件、方法等：

```jsx
<Button
  type="button"
  disabled={isDisabled}
  onClick={() => setValue((state) => state + 1)}
>
  {"加加"}
</Button>
```

如果這樣寫的話 `onClick={setValue(state => state + 1)}`，  
代表元件在渲染的時候已經同時執行大括號裡面的程式碼了，  
剛好執行的又是 **setStateAction**，於是會變成：

1. 元件在第一次渲染時執行了 `setValue`
2. `setValue` 改變了 `value` 所以重新渲染
3. 重新渲染時又執行了 `setValue`

這時畫面會爆炸，console 也會收到 **too many re-renders** 的警告，  
代表不小心寫出無限迴圈了。

所以要注意**函式宣告**與**函式執行**雖然都可以算是表達式，但代表的意義是不同的，  
因此在大括號裡面傳遞方法時，要特別留意我們的寫法與 setStateAction 的關聯，  
對此概念有認知後，就比較不會寫出這類的 bug。

---

## setStateAction

透過 `useState` 宣告出來的 setXXX 被稱作 **setStateAction**，  
在 React 裡面只能透過 setStateAction 改變 state 變數。

setStateAction 除了像這樣 `setValue(0)` 給一個純值之外，  
也會像上面的範例一樣，用 callback 的方式傳入值，  
callback 預設的參數會是當下的 state：

```jsx
setValue((state) => {
  console.log(state);

  return state - 1;
});
```

假如載入畫面後沒有任何操作，這時 `value` 應該是初始值 0，  
在 `onClick` 事件裡面執行 setStateAction 時用 callback 的方式取出 state，  
再用 `console.log` 印出來看，確實是 0 沒錯！

當要依據前一次狀態來做計算時，  
通常建議使用 callback 來處理 setStateAction 的邏輯：

```jsx
// 傳純值
function badAddValue() {
  setValue(value + 1);
  setValue(value + 1);
  setValue(value + 1);
  // value 最後是 1
}

// 傳 callback
function goodAddValue() {
  setValue((prev) => prev + 1);
  setValue((prev) => prev + 1);
  setValue((prev) => prev + 1);
  // value 最後是 3
}
```

`badAddValue` 中 `value` 在下次渲染時會是 1 而不是 3，  
這是因為它取出的 `value` 還是前一次渲染時的初始值 0，  
等於只是連續執行了 3 次並且用 `0 + 1` 改變 `value` 而已。

`goodAddValue` 會得到 3 是因為 setStateAction 的 callback 在下次渲染之前，  
會依序執行，每次執行都會更新 state，所以取到的也是新的 state。

setStateAction 本身是非同步的 callback，在上面範例連續執行時雖然沒問題，  
但要精準控制執行順序和執行次數時，還是會用`useEffect` 確保流程是正確的。

---

## 參考資料

- [走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)
